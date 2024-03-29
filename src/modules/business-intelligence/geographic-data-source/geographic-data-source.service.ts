import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateGeographicDataSourceDto } from './dto/create-geographic-data-source.dto'
import { UpdateGeographicDataSourceDto } from './dto/update-geographic-data-source.dto'
import { GeographicDataSource } from './entities/geographic-data-source.entity'
import { GeographicDataSourceFindAllQuery } from './dto/geographic-data-source-filters.dto'

@Injectable()
export class GeographicDataSourceService {
  constructor(
    @InjectRepository(GeographicDataSource)
    private readonly geographicDataSourceRepository: EntityRepository<GeographicDataSource>
  ) {}

  async create(geographicDataSource: CreateGeographicDataSourceDto): Promise<GeographicDataSource> {
    const newGeographicDataSource = this.geographicDataSourceRepository.create(geographicDataSource)
    await this.geographicDataSourceRepository.persistAndFlush(newGeographicDataSource)

    return newGeographicDataSource
  }

  async findOne(id: number) {
    return await this.geographicDataSourceRepository.findOne({ id })
  }

  async findAll(
    query: GeographicDataSourceFindAllQuery
  ): Promise<PaginationResponse<GeographicDataSource>> {
    const [result, total] = await this.geographicDataSourceRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(
    id: number,
    updatedGeographicDataSource: UpdateGeographicDataSourceDto
  ): Promise<GeographicDataSource> {
    const existingGeographicDataSource = await this.findOne(id)
    wrap(existingGeographicDataSource).assign(updatedGeographicDataSource)

    await this.geographicDataSourceRepository.persistAndFlush(existingGeographicDataSource)
    return existingGeographicDataSource
  }

  async remove(id: number): Promise<boolean> {
    const geographicDataSource = await this.findOne(id)
    await this.geographicDataSourceRepository.removeAndFlush(geographicDataSource)

    return !!geographicDataSource
  }
}
