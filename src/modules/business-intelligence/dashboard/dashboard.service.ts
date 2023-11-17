import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityManager, wrap } from '@mikro-orm/core'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'
import { MedicalWorker } from '@modules/health/medical-worker/entities/medical-worker.entity'
import { User } from '@modules/identity/user/entities/user.entity'
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { DashboardCategory } from '../dashboard-category/entities/dashboard-category.entity'
import { DashboardDataSource } from '../data-source/entities/data-source.entity'
import { CreateDashboardDto } from './dto/create-dashboard.dto'
import { DashboardFindAllQuery } from './dto/dashboard-filters.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'
import { Dashboard } from './entities/dashboard.entity'

@Injectable()
export class DashboardService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService
  ) {}

  async create(dashboard: CreateDashboardDto): Promise<Dashboard> {
    for (const establishmentId of dashboard.establishmentsWithAccess) {
      const establishment = await this.em.findOne(Establishment, establishmentId)
      if (!establishment) {
        throw new BadRequestException(`Could not find establishment with id ${establishmentId}`)
      }
    }

    const dataSource = await this.em.findOne(DashboardDataSource, dashboard.dataSource)
    if (!dataSource) {
      throw new BadRequestException(`Could not find data source with id ${dashboard.dataSource}`)
    }

    const category = await this.em.findOne(DashboardCategory, dashboard.category)
    if (!category) {
      throw new BadRequestException(`Could not find category with id ${dashboard.category}`)
    }

    const newDashboard = this.em.create(Dashboard, dashboard)
    await this.em.persistAndFlush(newDashboard)

    return newDashboard
  }

  async findOne(id: number) {
    return await this.em.findOne(Dashboard,
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
    } else if (!authenticatedUser) {
      whereQuery = {
        public: true
      }
    }

    if (query.category) {
      whereQuery = { ...whereQuery, category: query.category }
    }

    const [result, total] = await this.em.findAndCount(Dashboard,
      { ...whereQuery, name: new RegExp(query.name, 'i') },
      {
        ...getPaginationOptions(query),
        populate: ['dataSource', 'category']
      }
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedDashboard: UpdateDashboardDto): Promise<Dashboard> {
    const existingDashboard = await this.findOne(id)
    wrap(existingDashboard).assign(updatedDashboard)

    await this.em.persistAndFlush(existingDashboard)
    return existingDashboard
  }

  async remove(id: number): Promise<boolean> {
    const dashboard = await this.findOne(id)
    await this.em.removeAndFlush(dashboard)

    return !!dashboard
  }
}
