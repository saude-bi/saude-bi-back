import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { OccupationCategoryService } from './occupation-category.service'
import { CreateOccupationCategoryDto } from './dto/create-occupation-category.dto'
import { UpdateOccupationCategoryDto } from './dto/update-occupation-category.dto'

@Controller('occupation-category')
export class OccupationCategoryController {
  constructor(private readonly occupationCategoryService: OccupationCategoryService) {}

  @Post()
  create(@Body() createOccupationCategoryDto: CreateOccupationCategoryDto) {
    return this.occupationCategoryService.create(createOccupationCategoryDto)
  }

  @Get()
  findAll() {
    return this.occupationCategoryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occupationCategoryService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOccupationCategoryDto: UpdateOccupationCategoryDto
  ) {
    return this.occupationCategoryService.update(+id, updateOccupationCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occupationCategoryService.remove(+id)
  }
}
