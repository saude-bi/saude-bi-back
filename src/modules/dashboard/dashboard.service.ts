import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { CategoryService } from '@modules/category/category.service'
import { DataSourceService } from '@modules/data-source/data-source.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateDashboardDto } from './dto/create-dashboard.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'
import { Dashboard } from './entities/dashboard.entity'

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: EntityRepository<Dashboard>,
    private readonly dataSourceService: DataSourceService,
    private readonly categoryService: CategoryService
  ) {}

  async create(dashboard: CreateDashboardDto): Promise<Dashboard> {
    const dataSource = await this.dataSourceService.findOne(dashboard.dataSource)
    if (!dataSource) {
      throw new BadRequestException(`Could not find data source with id ${dashboard.dataSource}`)
    }

    const category = await this.categoryService.findOne(dashboard.category)
    if (!category) {
      throw new BadRequestException(`Could not find category with id ${dashboard.category}`)
    }

    const newDashboard = this.dashboardRepository.create({ ...dashboard, dataSource })
    await this.dashboardRepository.persistAndFlush(newDashboard)

    return newDashboard
  }

  async findOne(id: number): Promise<Dashboard> {
    return await this.dashboardRepository.findOne({ id })
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Dashboard>> {
    const [result, total] = await this.dashboardRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

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
