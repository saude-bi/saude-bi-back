import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { BadRequestException, Injectable } from '@nestjs/common'
import { OccupationCategoryService } from '../occupation-category/occupation-category.service'
import { CreateOccupationDto } from './dto/create-occupation.dto'
import { UpdateOccupationDto } from './dto/update-occupation.dto'
import { Occupation } from './entities/occupation.entity'
import { OccupationFindAllQuery } from './dto/occupation-filters.dto'

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(Occupation)
    private readonly occupationRepository: EntityRepository<Occupation>,
    private readonly occupationCategoryService: OccupationCategoryService
  ) {}

  async create(occupation: CreateOccupationDto): Promise<Occupation> {
    const category = await this.occupationCategoryService.findOne(occupation.category)

    if (!category) {
      throw new BadRequestException('Category linked to occupation does not exist')
    }

    const newOccupation = this.occupationRepository.create({ ...occupation, category })
    await this.occupationRepository.persistAndFlush(newOccupation)

    return newOccupation
  }

  async findOne(id: number): Promise<Occupation> {
    return await this.occupationRepository.findOne({ id })
  }

  async findAll(query: OccupationFindAllQuery): Promise<PaginationResponse<Occupation>> {
    const [result, total] = await this.occupationRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedOccupation: UpdateOccupationDto): Promise<Occupation> {
    const category = updatedOccupation.category
      ? await this.occupationCategoryService.findOne(updatedOccupation.category)
      : undefined

    if (updatedOccupation.category && !category) {
      throw new BadRequestException('Category linked to medical worker does not exist')
    }

    const existingOccupation = await this.findOne(id)
    wrap(existingOccupation).assign({ ...updatedOccupation, category })

    await this.occupationRepository.persistAndFlush(existingOccupation)
    return existingOccupation
  }

  async remove(id: number): Promise<boolean> {
    const occupation = await this.findOne(id)
    await this.occupationRepository.removeAndFlush(occupation)

    return !!occupation
  }
}
