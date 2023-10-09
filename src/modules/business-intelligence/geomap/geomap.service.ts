import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { DashboardCategoryService } from '@modules/business-intelligence/dashboard-category/dashboard-category.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateGeomapDto } from './dto/create-geomap.dto'
import { GeomapFindAllQuery } from './dto/geomap-filters.dto'
import { UpdateGeomapDto } from './dto/update-geomap.dto'
import { Geomap } from './entities/geomap.entity'

@Injectable()
export class GeomapService {
  constructor(
    @InjectRepository(Geomap)
    private readonly geomapRepository: EntityRepository<Geomap>,
    private readonly dashboardCategoryService: DashboardCategoryService
  ) {}

  async create(geomap: CreateGeomapDto): Promise<Geomap> {
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

  async findAll(query: GeomapFindAllQuery): Promise<PaginationResponse<Geomap>> {
    const [result, total] = await this.geomapRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      {
        ...getPaginationOptions(query),
        populate: ['category']
      }
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedGeomap: UpdateGeomapDto): Promise<Geomap> {
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
