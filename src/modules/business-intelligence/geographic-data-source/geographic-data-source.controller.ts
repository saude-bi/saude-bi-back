import { JwtAuthGuard } from '@modules/identity/auth/guards/jwt-auth.guard'
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
  NotFoundException,
  UseGuards
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GeographicDataSourceService } from './geographic-data-source.service'
import { CreateGeographicDataSourceDto } from './dto/create-geographic-data-source.dto'
import { GeographicDataSourceFindAllQuery } from './dto/geographic-data-source-filters.dto'
import { UpdateGeographicDataSourceDto } from './dto/update-geographic-data-source.dto'

@Controller('geographic-data-sources')
@ApiTags('Geographic Data Source')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GeographicDataSourceController {
  constructor(private readonly geographicDataSourceService: GeographicDataSourceService) {}

  @Post()
  create(@Body() createGeographicDataSourceDto: CreateGeographicDataSourceDto) {
    return this.geographicDataSourceService.create(createGeographicDataSourceDto)
  }

  @Get()
  findAll(@Query() query: GeographicDataSourceFindAllQuery) {
    return this.geographicDataSourceService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const geographicDataSource = await this.geographicDataSourceService.findOne(id)

    if (!geographicDataSource) {
      throw new NotFoundException()
    }

    return { ...geographicDataSource }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeographicDataSourceDto: UpdateGeographicDataSourceDto
  ) {
    const geographicDataSource = await this.geographicDataSourceService.findOne(id)

    if (!geographicDataSource) {
      throw new NotFoundException()
    }

    return this.geographicDataSourceService.update(id, updateGeographicDataSourceDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const geographicDataSource = await this.geographicDataSourceService.findOne(id)

    if (!geographicDataSource) {
      throw new NotFoundException()
    }

    const couldRemove = this.geographicDataSourceService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
