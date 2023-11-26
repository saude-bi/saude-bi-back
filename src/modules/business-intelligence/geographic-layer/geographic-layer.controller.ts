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
  UseGuards,
  ForbiddenException
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { GeographicLayerService } from './geographic-layer.service'
import { CreateGeographicLayerDto } from './dto/create-geographic-layer.dto'
import { GeographicLayerFindAllQuery, GetDataQuery } from './dto/geographic-layer-filters.dto'
import { UpdateGeographicLayerDto } from './dto/update-geographic-layer.dto'
import { AuthUser } from '@modules/identity/auth/decorators/auth-user.decorator'
import { User } from '@modules/identity/user/entities/user.entity'

@Controller()
@ApiTags('Geographic Layer')
@ApiBearerAuth()
export class GeographicLayerController {
  constructor(private readonly geographicLayerService: GeographicLayerService) {}

  @Post('geographic-layers')
  @UseGuards(JwtAuthGuard)
  create(@Body() createGeographicLayerDto: CreateGeographicLayerDto) {
    return this.geographicLayerService.create(createGeographicLayerDto)
  }

  @Get('geographic-layers')
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: GeographicLayerFindAllQuery) {
    return this.geographicLayerService.findAll(query)
  }

  @Get('geographic-layers/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const geographicLayer = await this.geographicLayerService.findOne(id)

    if (!geographicLayer) {
      throw new NotFoundException()
    }

    return { ...geographicLayer }
  }

  @Get('geographic-layers/:id/data')
  @UseGuards(JwtAuthGuard)
  async getData(
    @Param('id', ParseIntPipe) id: number,
    @Query() getDataQuery: GetDataQuery,
    @AuthUser() currentUser: User
  ) {
    if (!currentUser.medicalWorker) {
      throw new ForbiddenException()
    }

    return {
      id,
      data: await this.geographicLayerService.fetchGeoJSON(
        id,
        currentUser.medicalWorker,
        getDataQuery.workRelation
      )
    }
  }

  @Get('public/geographic-layers/:id/data')
  async getPublicData(@Param('id', ParseIntPipe) id: number,) {
    return {
      id,
      data: await this.geographicLayerService.fetchPublicGeoJSON(id)
    }
  }


  @Patch('geographic-layers/:id')
  @UseGuards(JwtAuthGuard)
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

  @Delete('geographic-layers/:id')
  @UseGuards(JwtAuthGuard)
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
