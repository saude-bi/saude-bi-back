import { PaginationQuery } from '@libs/types/pagination'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DashboardCategoryService } from './dashboard-category.service'
import { CreateDashboardCategoryDto } from './dto/create-dashboard-category.dto'
import { UpdateDashboardCategoryDto } from './dto/update-dashboard-category.dto'
import { DashboardCategoryFindAllQuery } from './dto/dashboard-category-filter.dto'

@Controller('dashboard-categories')
@ApiTags('Dashboard Category')
export class DashboardCategoryController {
  constructor(private readonly dashboardCategoryService: DashboardCategoryService) {}

  @Post()
  create(@Body() createDashboardCategoryDto: CreateDashboardCategoryDto) {
    return this.dashboardCategoryService.create(createDashboardCategoryDto)
  }

  @Get()
  findAll(@Query() query: DashboardCategoryFindAllQuery) {
    return this.dashboardCategoryService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dashboardCategoryService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDashboardCategoryDto: UpdateDashboardCategoryDto
  ) {
    return this.dashboardCategoryService.update(id, updateDashboardCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dashboardCategoryService.remove(id)
  }
}
