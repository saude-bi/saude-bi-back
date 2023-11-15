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
import { GeographicLayerService } from './geographic-layer.service'
import { CreateGeographicLayerDto } from './dto/create-geographic-layer.dto'
import { GeographicLayerFindAllQuery } from './dto/geographic-layer-filters.dto'
import { UpdateGeographicLayerDto } from './dto/update-geographic-layer.dto'

@Controller('geographic-layers')
@ApiTags('Geographic Layer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GeographicLayerController {
  constructor(private readonly geographicLayerService: GeographicLayerService) {}

  @Post()
  create(@Body() createGeographicLayerDto: CreateGeographicLayerDto) {
    return this.geographicLayerService.create(createGeographicLayerDto)
  }

  @Get()
  findAll(@Query() query: GeographicLayerFindAllQuery) {
    return this.geographicLayerService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const geographicLayer = await this.geographicLayerService.findOne(id)

    if (!geographicLayer) {
      throw new NotFoundException()
    }

    return { ...geographicLayer }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGeographicLayerDto: UpdateGeographicLayerDto
  ) {
    const geographicLayer = await this.geographicLayerService.findOne(id)

    if (!geographicLayer) {
      throw new NotFoundException()
    }

    return this.geographicLayerService.update(id, updateGeographicLayerDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const geographicLayer = await this.geographicLayerService.findOne(id)

    if (!geographicLayer) {
      throw new NotFoundException()
    }

    const couldRemove = this.geographicLayerService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
