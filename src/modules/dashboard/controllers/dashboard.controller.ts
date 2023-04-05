import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager'
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common'
import { CreateDashboardDto } from '../dto/create-dashboard.dto'
import { UpdateDashboardDto } from '../dto/update-dashboard.dto'
import { DashboardService } from '../services/dashboard.service'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto)
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll()
  }

  @CacheTTL(10000)
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dashboardService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id)
  }
}
