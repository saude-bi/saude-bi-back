import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateDirectorshipDto } from './dto/create-directorship.dto'
import { DirectorshipFindAllQuery } from './dto/directorship-filters.dto'
import { UpdateDirectorshipDto } from './dto/update-directorship.dto'
import { Directorship } from './entities/directorship.entity'

@Injectable()
export class DirectorshipService {
  constructor(
    @InjectRepository(Directorship)
    private readonly directorshipRepository: EntityRepository<Directorship>
  ) {}

  async create(directorship: CreateDirectorshipDto): Promise<Directorship> {
    const newDirectorship = this.directorshipRepository.create(directorship)
    await this.directorshipRepository.persistAndFlush(newDirectorship)

    return newDirectorship
  }

  async findOne(id: number): Promise<Directorship> {
    return await this.directorshipRepository.findOne({ id })
  }

  async findAll(query: DirectorshipFindAllQuery): Promise<PaginationResponse<Directorship>> {
    const [result, total] = await this.directorshipRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedDirectorship: UpdateDirectorshipDto): Promise<Directorship> {
    const existingDirectorship = await this.findOne(id)
    wrap(existingDirectorship).assign(updatedDirectorship)

    await this.directorshipRepository.persistAndFlush(existingDirectorship)
    return existingDirectorship
  }

  async remove(id: number): Promise<boolean> {
    const directorship = await this.findOne(id)
    await this.directorshipRepository.removeAndFlush(directorship)

    return !!directorship
  }
}
