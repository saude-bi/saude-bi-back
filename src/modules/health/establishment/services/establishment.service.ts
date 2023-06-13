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

  async findOne(id: number) {
    return await this.establishmentRepository.findOne({ id })
  }


  async findOneByCnes(cnes: string) {
    return await this.establishmentRepository.findOne({ cnes })
  }

  async update(id: number, updated: UpdateEstablishmentDto) {
    const existing = await this.findOne(id)
    wrap(existing).assign(updated)

    await this.establishmentRepository.persistAndFlush(existing)
    return existing
  }

  async upsert(establishment: CreateEstablishmentDto) {
    const cnes = establishment.cnes
    const found = await this.findOneByCnes(cnes);

    if (found) {
      this.update(found.id, establishment)
    } else {
      this.create(establishment)
    }

    await this.establishmentRepository.upsert(establishment)
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    await this.establishmentRepository.removeAndFlush(user)

    return !!user
  }
}
