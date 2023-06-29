import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { DashboardCategoryService } from '@modules/business-intelligence/dashboard-category/dashboard-category.service'
import { DataSourceService } from '@modules/business-intelligence/data-source/data-source.service'
import { EstablishmentService } from '@modules/health/establishment/services/establishment.service'
import { MedicalWorker } from '@modules/health/medical-worker/entities/medical-worker.entity'
import { User } from '@modules/identity/user/entities/user.entity'
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateDashboardDto } from './dto/create-dashboard.dto'
import { DashboardFindAllQuery } from './dto/dashboard-filters.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'
import { Dashboard } from './entities/dashboard.entity'

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
    private readonly establishmentService: EstablishmentService,
    private readonly dataSourceService: DataSourceService,
    private readonly dashboardCategoryService: DashboardCategoryService,
    private readonly jwtService: JwtService
  ) {}

  async create(dashboard: CreateDashboardDto): Promise<Dashboard> {
    for (const establishmentId of dashboard.establishmentsWithAccess) {
      const establishment = await this.establishmentService.findOne(establishmentId)
      if (!establishment) {
        throw new BadRequestException(`Could not find establishment with id ${establishmentId}`)
      }
    }

    const dataSource = await this.dataSourceService.findOne(dashboard.dataSource)
    if (!dataSource) {
      throw new BadRequestException(`Could not find data source with id ${dashboard.dataSource}`)
    }

    const category = await this.dashboardCategoryService.findOne(dashboard.category)
    if (!category) {
      throw new BadRequestException(`Could not find category with id ${dashboard.category}`)
    }

    const newDashboard = this.dashboardRepository.create(dashboard)
    await this.dashboardRepository.persistAndFlush(newDashboard)

    return newDashboard
  }

  async findOne(id: number) {
    return await this.dashboardRepository.findOne(
      { id },
      { populate: ['dataSource', 'establishmentsWithAccess'] }
    )
  }

  async getEmbedUrl(dashboard: Dashboard, worker: MedicalWorker, workRelationId: number) {
    const workRelation = (await worker.workRelations.matching({ where: { id: workRelationId } }))[0]

    if (!workRelation) {
      throw new ForbiddenException()
    }

    const dataSource = dashboard.dataSource

    const payload = {
      resource: { dashboard: dashboard.metabaseId },
      params: dashboard.establishmentPropertyName
        ? { [dashboard.establishmentPropertyName]: workRelation.establishment.name }
        : {}
    }
    const token = this.jwtService.sign(payload, { secret: dataSource.secret })

    const url =
      dataSource.url + '/embed/dashboard/' + token + '#theme=transparent&bordered=false&titled=true'

    return { url }
  }

  async findAll(
    query: DashboardFindAllQuery,
    authenticatedUser?: User
  ): Promise<PaginationResponse<Dashboard>> {
    let whereQuery = undefined
    if (authenticatedUser && !authenticatedUser.isAdmin) {
      whereQuery = {
        establishmentsWithAccess: {
          workRelations: {
            worker: authenticatedUser.medicalWorker
          }
        }
      }
    }

    if (query.category) {
      whereQuery = { ...whereQuery, category: query.category }
    }

    const [result, total] = await this.dashboardRepository.findAndCount(whereQuery, {
      ...getPaginationOptions(query),
      populate: ['dataSource', 'category']
    })

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedDashboard: UpdateDashboardDto): Promise<Dashboard> {
    const existingDashboard = await this.findOne(id)
    wrap(existingDashboard).assign(updatedDashboard)

    await this.dashboardRepository.persistAndFlush(existingDashboard)
    return existingDashboard
  }

  async remove(id: number): Promise<boolean> {
    const dashboard = await this.findOne(id)
    await this.dashboardRepository.removeAndFlush(dashboard)

    return !!dashboard
  }
}
