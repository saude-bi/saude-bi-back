import { PaginationQuery } from '@libs/types/pagination'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DashboardService } from './dashboard.service'
import { CreateDashboardDto } from './dto/create-dashboard.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto)
  }

  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.dashboardService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dashboardService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(id, updateDashboardDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const couldRemove = this.dashboardService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
