import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateOccupationDto } from './dto/create-occupation.dto'
import { UpdateOccupationDto } from './dto/update-occupation.dto'
import { Occupation } from './entities/occupation.entity'

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(Occupation)
    private readonly occupationRepository: EntityRepository<Occupation>
  ) {}

  async create(occupation: CreateOccupationDto): Promise<Occupation> {
    const newOccupation = this.occupationRepository.create(occupation)
    await this.occupationRepository.persistAndFlush(newOccupation)

    return newOccupation
  }

  async findOne(id: number): Promise<Occupation> {
    return await this.occupationRepository.findOne({ id })
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Occupation>> {
    const [result, total] = await this.occupationRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedOccupation: UpdateOccupationDto): Promise<Occupation> {
    const existingOccupation = await this.findOne(id)
    wrap(existingOccupation).assign(updatedOccupation)

    await this.occupationRepository.persistAndFlush(existingOccupation)
    return existingOccupation
  }

  async remove(id: number): Promise<boolean> {
    const occupation = await this.findOne(id)
    await this.occupationRepository.removeAndFlush(occupation)

    return !!occupation
  }
}
