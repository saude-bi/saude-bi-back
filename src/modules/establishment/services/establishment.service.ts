import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateEstablishmentDto } from '../dto/create-establishment.dto'
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto'
import { Establishment } from '../entities/establishment.entity'

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: EntityRepository<Establishment>
  ) {}

  async create(createEstablishmentDto: CreateEstablishmentDto) {
    const newUser = this.establishmentRepository.create(createEstablishmentDto)
    await this.establishmentRepository.persistAndFlush(newUser)

    return newUser
  }

  async findAll(query: PaginationQuery) {
    const [result, total] = await this.establishmentRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async findOne(cnes: string) {
    return await this.establishmentRepository.findOne({ cnes })
  }

  async update(cnes: string, updated: UpdateEstablishmentDto) {
    const existing = await this.findOne(cnes)
    wrap(existing).assign(updated)

    await this.establishmentRepository.persistAndFlush(existing)
    return existing
  }

  async upsert(establishment: CreateEstablishmentDto) {
    const cnes = establishment.cnes

    if (this.findOne(cnes)) {
      this.update(cnes, establishment)
    } else {
      this.create(establishment)
    }

    await this.establishmentRepository.upsert(establishment)
  }

  async remove(cnes: string) {
    const user = await this.findOne(cnes)
    await this.establishmentRepository.removeAndFlush(user)

    return !!user
  }
}
