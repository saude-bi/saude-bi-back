import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityManager, wrap } from '@mikro-orm/core'
import { DashboardCategoryService } from '@modules/business-intelligence/dashboard-category/dashboard-category.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateGeographicMapDto } from './dto/create-geographic-map.dto'
import { UpdateGeographicMapDto } from './dto/update-geographic-map.dto'
import { GeographicMap } from './entities/geographic-map.entity'
import { GeographicMapFindAllQuery } from './dto/geographic-map-filters.dto'
import { Establishment } from '@modules/health/establishment/entities/establishment.entity'
import { GeographicLayer } from '../geographic-layer/entities/geographic-layer.entity'
import { User } from '@modules/identity/user/entities/user.entity'

@Injectable()
export class GeographicMapService {
  constructor(
    private readonly em: EntityManager,
    private readonly dashboardCategoryService: DashboardCategoryService
  ) {}

  async create(geographicMap: CreateGeographicMapDto): Promise<GeographicMap> {
    for (const establishmentId of geographicMap.establishmentsWithAccess) {
      const establishment = await this.em.findOne(Establishment, establishmentId)
      if (!establishment) {
        throw new BadRequestException(`Could not find establishment with id ${establishmentId}`)
      }
    }

    for (const layerId of geographicMap.layers) {
      const layer = await this.em.findOne(GeographicLayer, layerId)
      if (!layer) {
        throw new BadRequestException(`Could not find layer with id ${layerId}`)
      }
    }

    const category = await this.dashboardCategoryService.findOne(geographicMap.category)
    if (!category) {
      throw new BadRequestException(`Could not find category with id ${geographicMap.category}`)
    }

    const newGeographicMap = this.em.create(GeographicMap, geographicMap)
    await this.em.persistAndFlush(newGeographicMap)

    return newGeographicMap
  }

  async findOne(id: number) {
    return await this.em.findOne(GeographicMap, { id }, { populate: ['category'] })
  }

  async findAll(query: GeographicMapFindAllQuery, authenticatedUser?: User): Promise<PaginationResponse<GeographicMap>> {
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

    const [result, total] = await this.em.findAndCount(GeographicMap,
      { ...whereQuery, name: new RegExp(query.name, 'i') },
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

    await this.em.persistAndFlush(existingGeographicMap)
    return existingGeographicMap
  }

  async remove(id: number): Promise<boolean> {
    const geographicMap = await this.findOne(id)
    await this.em.removeAndFlush(geographicMap)

    return !!geographicMap
  }
}
