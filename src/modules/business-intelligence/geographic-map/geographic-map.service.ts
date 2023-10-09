import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { DashboardCategoryService } from '@modules/business-intelligence/dashboard-category/dashboard-category.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateGeographicMapDto } from './dto/create-geographic-map.dto'
import { UpdateGeographicMapDto } from './dto/update-geographic-map.dto'
import { GeographicMap } from './entities/geographic-map.entity'
import { GeographicMapFindAllQuery } from './dto/geographic-map-filters.dto'

@Injectable()
export class GeographicMapService {
  constructor(
    @InjectRepository(GeographicMap)
    private readonly geographicMapRepository: EntityRepository<GeographicMap>,
    private readonly dashboardCategoryService: DashboardCategoryService
  ) {}

  async create(geographicMap: CreateGeographicMapDto): Promise<GeographicMap> {
    const category = await this.dashboardCategoryService.findOne(geographicMap.category)

    if (!category) {
      throw new BadRequestException(`Could not find category with id ${geographicMap.category}`)
    }

    const newGeographicMap = this.geographicMapRepository.create(geographicMap)
    await this.geographicMapRepository.persistAndFlush(newGeographicMap)

    return newGeographicMap
  }

  async findOne(id: number) {
    return await this.geographicMapRepository.findOne({ id }, { populate: ['category'] })
  }

  async findAll(query: GeographicMapFindAllQuery): Promise<PaginationResponse<GeographicMap>> {
    const [result, total] = await this.geographicMapRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      {
        ...getPaginationOptions(query),
        populate: ['category']
      }
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedGeographicMap: UpdateGeographicMapDto): Promise<GeographicMap> {
    const existingGeographicMap = await this.findOne(id)
    wrap(existingGeographicMap).assign(updatedGeographicMap)

    await this.geographicMapRepository.persistAndFlush(existingGeographicMap)
    return existingGeographicMap
  }

  async remove(id: number): Promise<boolean> {
    const geographicMap = await this.findOne(id)
    await this.geographicMapRepository.removeAndFlush(geographicMap)

    return !!geographicMap
  }
}
