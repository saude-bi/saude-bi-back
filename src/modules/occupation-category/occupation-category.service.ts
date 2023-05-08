import { Injectable } from '@nestjs/common'
import { CreateOccupationCategoryDto } from './dto/create-occupation-category.dto'
import { UpdateOccupationCategoryDto } from './dto/update-occupation-category.dto'

@Injectable()
export class OccupationCategoryService {
  create(createOccupationCategoryDto: CreateOccupationCategoryDto) {
    console.log(createOccupationCategoryDto)
    return 'This action adds a new occupationCategory'
  }

  findAll() {
    return `This action returns all occupationCategory`
  }

  findOne(id: number) {
    return `This action returns a #${id} occupationCategory`
  }

  update(id: number, updateOccupationCategoryDto: UpdateOccupationCategoryDto) {
    console.log(updateOccupationCategoryDto)
    return `This action updates a #${id} occupationCategory`
  }

  remove(id: number) {
    return `This action removes a #${id} occupationCategory`
  }
}
