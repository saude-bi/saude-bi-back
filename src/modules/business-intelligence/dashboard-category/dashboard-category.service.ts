import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateDashboardCategoryDto } from './dto/create-dashboard-category.dto'
import { UpdateDashboardCategoryDto } from './dto/update-dashboard-category.dto'
import { DashboardCategory } from './entities/dashboard-category.entity'
import { DashboardCategoryFindAllQuery } from './dto/dashboard-category-filter.dto'

@Injectable()
export class DashboardCategoryService {
  constructor(
    @InjectRepository(DashboardCategory)
    private readonly dashboardCategoryRepository: EntityRepository<DashboardCategory>
  ) {}

  async create(dashboardCategory: CreateDashboardCategoryDto): Promise<DashboardCategory> {
    const newDashboardCategory = this.dashboardCategoryRepository.create(dashboardCategory)
    await this.dashboardCategoryRepository.persistAndFlush(newDashboardCategory)

    return newDashboardCategory
  }

  async findOne(id: number): Promise<DashboardCategory> {
    return await this.dashboardCategoryRepository.findOne({ id })
  }

  async findAll(
    query: DashboardCategoryFindAllQuery
  ): Promise<PaginationResponse<DashboardCategory>> {
    const [result, total] = await this.dashboardCategoryRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(
    id: number,
    updatedDashboardCategory: UpdateDashboardCategoryDto
  ): Promise<DashboardCategory> {
    const existingDashboardCategory = await this.findOne(id)
    wrap(existingDashboardCategory).assign(updatedDashboardCategory)

    await this.dashboardCategoryRepository.persistAndFlush(existingDashboardCategory)
    return existingDashboardCategory
  }

  async remove(id: number): Promise<boolean> {
    const dashboardCategory = await this.findOne(id)
    await this.dashboardCategoryRepository.removeAndFlush(dashboardCategory)

    return !!dashboardCategory
  }
}
