import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { DashboardCategoryService } from '@modules/business-intelligence/dashboard-category/dashboard-category.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateGeographicDataSourceDto } from './dto/create-geographic-data-source.dto'
import { UpdateGeographicDataSourceDto } from './dto/update-geographic-data-source.dto'
import { GeographicDataSource } from './entities/geographic-data-source.entity'
import { GeographicDataSourceFindAllQuery } from './dto/geographic-data-source-filters.dto'

@Injectable()
export class GeographicDataSourceService {
  constructor(
    @InjectRepository(GeographicDataSource)
    private readonly geomapRepository: EntityRepository<GeographicDataSource>,
    private readonly dashboardCategoryService: DashboardCategoryService
  ) {}

  async create(geomap: CreateGeographicDataSourceDto): Promise<GeographicDataSource> {
    const category = await this.dashboardCategoryService.findOne(geomap.category)

    if (!category) {
      throw new BadRequestException(`Could not find category with id ${geomap.category}`)
    }

    const newGeomap = this.geomapRepository.create(geomap)
    await this.geomapRepository.persistAndFlush(newGeomap)

    return newGeomap
  }

  async findOne(id: number) {
    return await this.geomapRepository.findOne({ id }, { populate: ['category'] })
  }

  async findAll(query: GeographicDataSourceFindAllQuery): Promise<PaginationResponse<GeographicDataSource>> {
    const [result, total] = await this.geomapRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      {
        ...getPaginationOptions(query),
        populate: ['category']
      }
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedGeomap: UpdateGeographicDataSourceDto): Promise<GeographicDataSource> {
    const existingGeomap = await this.findOne(id)
    wrap(existingGeomap).assign(updatedGeomap)

    await this.geomapRepository.persistAndFlush(existingGeomap)
    return existingGeomap
  }

  async remove(id: number): Promise<boolean> {
    const geomap = await this.findOne(id)
    await this.geomapRepository.removeAndFlush(geomap)

    return !!geomap
  }
}
