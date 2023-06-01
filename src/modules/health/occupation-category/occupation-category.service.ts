import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateOccupationCategoryDto } from './dto/create-occupation-category.dto'
import { UpdateOccupationCategoryDto } from './dto/update-occupation-category.dto'
import { OccupationCategory } from './entities/occupation-category.entity'

@Injectable()
export class OccupationCategoryService {
  constructor(
    @InjectRepository(OccupationCategory)
    private readonly occupationCategoryRepository: EntityRepository<OccupationCategory>
  ) {}

  async create(occupationCategory: CreateOccupationCategoryDto): Promise<OccupationCategory> {
    const newOccupationCategory = this.occupationCategoryRepository.create(occupationCategory)
    await this.occupationCategoryRepository.persistAndFlush(newOccupationCategory)

    return newOccupationCategory
  }

  async findOne(id: number): Promise<OccupationCategory> {
    return await this.occupationCategoryRepository.findOne({ id })
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<OccupationCategory>> {
    const [result, total] = await this.occupationCategoryRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(
    id: number,
    updatedOccupationCategory: UpdateOccupationCategoryDto
  ): Promise<OccupationCategory> {
    const existingOccupationCategory = await this.findOne(id)
    wrap(existingOccupationCategory).assign(updatedOccupationCategory)

    await this.occupationCategoryRepository.persistAndFlush(existingOccupationCategory)
    return existingOccupationCategory
  }

  async remove(id: number): Promise<boolean> {
    const occupationCategory = await this.findOne(id)
    await this.occupationCategoryRepository.removeAndFlush(occupationCategory)

    return !!occupationCategory
  }
}
