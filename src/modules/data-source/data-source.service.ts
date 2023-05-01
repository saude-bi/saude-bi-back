import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateDataSourceDto } from './dto/create-data-source.dto'
import { UpdateDataSourceDto } from './dto/update-data-source.dto'
import { DashboardDataSource, DataSource } from './entities/data-source.entity'

@Injectable()
export class DataSourceService {
  constructor(
    @InjectRepository(DashboardDataSource)
    private readonly dashboardDataSourceRepository: EntityRepository<DashboardDataSource>
  ) {}

  async create(dataSource: CreateDataSourceDto): Promise<DataSource> {
    const newDataSource = this.dashboardDataSourceRepository.create(dataSource)
    await this.dashboardDataSourceRepository.persistAndFlush(newDataSource)

    return newDataSource
  }

  async findOne(id: number): Promise<DataSource> {
    return await this.dashboardDataSourceRepository.findOne({ id })
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<DataSource>> {
    const [result, total] = await this.dashboardDataSourceRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedDataSource: UpdateDataSourceDto): Promise<DataSource> {
    const existingDataSource = await this.findOne(id)
    wrap(existingDataSource).assign(updatedDataSource)

    await this.dashboardDataSourceRepository.persistAndFlush(existingDataSource)
    return existingDataSource
  }

  async remove(id: number): Promise<boolean> {
    const dataSource = await this.findOne(id)
    await this.dashboardDataSourceRepository.removeAndFlush(dataSource)

    return !!dataSource
  }
}
