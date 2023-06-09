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
  NotFoundException,
  ParseIntPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { DataSourceService } from './data-source.service'
import { CreateDataSourceDto } from './dto/create-data-source.dto'
import { UpdateDataSourceDto } from './dto/update-data-source.dto'

@Controller('data-sources')
@ApiTags('Data Source')
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Post()
  create(@Body() createDataSourceDto: CreateDataSourceDto) {
    return this.dataSourceService.create(createDataSourceDto)
  }

  @Get()
  findAll(@Query() query: PaginationQuery) {
    return this.dataSourceService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dataSourceService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDataSourceDto: UpdateDataSourceDto) {
    return this.dataSourceService.update(id, updateDataSourceDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const couldRemove = this.dataSourceService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
