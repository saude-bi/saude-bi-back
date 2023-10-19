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
import { GeographicMapService } from './geographic-map.service'
import { CreateGeographicMapDto } from './dto/create-geographic-map.dto'
import { GeographicMapFindAllQuery } from './dto/geographic-map-filters.dto'
import { UpdateGeographicMapDto } from './dto/update-geographic-map.dto'

@Controller('geographic-maps')
@ApiTags('Geographic Data Source')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GeographicMapController {
  constructor(private readonly geographicMapService: GeographicMapService) {}

  @Post()
  create(@Body() createGeographicMapDto: CreateGeographicMapDto) {
    return this.geographicMapService.create(createGeographicMapDto)
  }

  @Get()
  findAll(@Query() query: GeographicMapFindAllQuery) {
    return this.geographicMapService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const geographicMap = await this.geographicMapService.findOne(id)

    if (!geographicMap) {
      throw new NotFoundException()
    }

    return { ...geographicMap }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeographicMapDto: UpdateGeographicMapDto
  ) {
    const geographicMap = await this.geographicMapService.findOne(id)

    if (!geographicMap) {
      throw new NotFoundException()
    }

    return this.geographicMapService.update(id, updateGeographicMapDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const geographicMap = await this.geographicMapService.findOne(id)

    if (!geographicMap) {
      throw new NotFoundException()
    }

    const couldRemove = this.geographicMapService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
