import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: EntityRepository<Category>
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category)
    await this.categoryRepository.persistAndFlush(newCategory)

    return newCategory
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({ id })
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<Category>> {
    const [result, total] = await this.categoryRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedCategory: UpdateCategoryDto): Promise<Category> {
    const existingCategory = await this.findOne(id)
    wrap(existingCategory).assign(updatedCategory)

    await this.categoryRepository.persistAndFlush(existingCategory)
    return existingCategory
  }

  async remove(id: number): Promise<boolean> {
    const category = await this.findOne(id)
    await this.categoryRepository.removeAndFlush(category)

    return !!category
  }
}
