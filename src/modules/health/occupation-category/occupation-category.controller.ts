import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common'
import { OccupationCategoryService } from './occupation-category.service'
import { CreateOccupationCategoryDto } from './dto/create-occupation-category.dto'
import { UpdateOccupationCategoryDto } from './dto/update-occupation-category.dto'
import { PaginationQuery } from '@libs/types/pagination'

@Controller('occupation-categories')
export class OccupationCategoryController {
  constructor(private readonly occupationCategoryService: OccupationCategoryService) {}

  @Post()
  create(@Body() createOccupationCategoryDto: CreateOccupationCategoryDto) {
    return this.occupationCategoryService.create(createOccupationCategoryDto)
  }

  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.occupationCategoryService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.occupationCategoryService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOccupationCategoryDto: UpdateOccupationCategoryDto
  ) {
    return this.occupationCategoryService.update(id, updateOccupationCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.occupationCategoryService.remove(id)
  }
}
