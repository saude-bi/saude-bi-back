import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateGeographicLayerDto } from './dto/create-geographic-layer.dto'
import { UpdateGeographicLayerDto } from './dto/update-geographic-layer.dto'
import { GeographicLayer } from './entities/geographic-layer.entity'
import { GeographicLayerFindAllQuery } from './dto/geographic-layer-filters.dto'
import { HttpService } from '@nestjs/axios'
import { GeographicDataSourceCredentials } from '../geographic-data-source/entities/geographic-data-source.entity'
import { lastValueFrom, map } from 'rxjs'

@Injectable()
export class GeographicLayerService {
  constructor(
    @InjectRepository(GeographicLayer)
    private readonly geographicLayerRepository: EntityRepository<GeographicLayer>,
    private readonly httpService: HttpService
  ) {}

  async create(geographicLayer: CreateGeographicLayerDto): Promise<GeographicLayer> {
    const newGeographicLayer = this.geographicLayerRepository.create(geographicLayer)
    await this.geographicLayerRepository.persistAndFlush(newGeographicLayer)

    return newGeographicLayer
  }

  async fetchGeoJSON(endpoint: string, params: string, credentials: GeographicDataSourceCredentials) {
    return await lastValueFrom(this.httpService.get(endpoint + "?" + params, { auth: credentials }).pipe(map(r => r.data)))
  }

  async findOne(id: number) {
    const layer =
      await this.geographicLayerRepository.findOne({ id }, { populate: ["source"] })
    const { sourceUrl, credentials } = layer.source

    return { ...layer, data: await this.fetchGeoJSON(sourceUrl, layer.params, credentials) }
  }

  async findAll(query: GeographicLayerFindAllQuery): Promise<PaginationResponse<GeographicLayer>> {
    const [result, total] = await this.geographicLayerRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      getPaginationOptions(query),
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedGeographicLayer: UpdateGeographicLayerDto): Promise<GeographicLayer> {
    const existingGeographicLayer = await this.findOne(id)

    wrap(existingGeographicLayer).assign(updatedGeographicLayer)

    await this.geographicLayerRepository.persistAndFlush(existingGeographicLayer)
    return existingGeographicLayer
  }

  async remove(id: number): Promise<boolean> {
    const geographicLayer = await this.findOne(id)
    await this.geographicLayerRepository.removeAndFlush(geographicLayer)

    return !!geographicLayer
  }
}
