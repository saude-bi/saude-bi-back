import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityManager, wrap } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { CreateDataSourceDto } from './dto/create-data-source.dto'
import { UpdateDataSourceDto } from './dto/update-data-source.dto'
import { DashboardDataSource, DataSource } from './entities/data-source.entity'
import { DataSourceFindAllQuery } from './dto/data-source-filters.dto'

@Injectable()
export class DataSourceService {
  constructor(
    private readonly em: EntityManager
  ) {}

  async create(dataSource: CreateDataSourceDto): Promise<DataSource> {
    const newDataSource = this.em.create(DashboardDataSource, dataSource)
    await this.em.persistAndFlush(newDataSource)

    return newDataSource
  }

  async findOne(id: number): Promise<DataSource> {
    return await this.em.findOne(DashboardDataSource, { id })
  }

  async findAll(query: DataSourceFindAllQuery): Promise<PaginationResponse<DataSource>> {
    const [result, total] = await this.em.findAndCount(DashboardDataSource,
      { name: new RegExp(query.name, 'i') },
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedDataSource: UpdateDataSourceDto): Promise<DataSource> {
    const existingDataSource = await this.findOne(id)
    wrap(existingDataSource).assign(updatedDataSource)

    await this.em.persistAndFlush(existingDataSource)
    return existingDataSource
  }

  async remove(id: number): Promise<boolean> {
    const dataSource = await this.findOne(id)
    await this.em.removeAndFlush(dataSource)

    return !!dataSource
  }
}
