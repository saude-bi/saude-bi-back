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
import { GeographicMapService } from './geographic-map.service'
import { CreateGeographicMapDto } from './dto/create-geographic-map.dto'
import { GeographicMapFindAllQuery } from './dto/geographic-map-filters.dto'
import { UpdateGeographicMapDto } from './dto/update-geographic-map.dto'
import { AuthUser } from '@modules/identity/auth/decorators/auth-user.decorator'
import { User } from '@modules/identity/user/entities/user.entity'

@Controller('geographic-maps')
@ApiTags('Geographic Map')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GeographicMapController {
  constructor(private readonly geographicMapService: GeographicMapService) {}

  @Post()
  create(@Body() createGeographicMapDto: CreateGeographicMapDto) {
    return this.geographicMapService.create(createGeographicMapDto)
  }

  @Get()
  findAll(@Query() query: GeographicMapFindAllQuery, @AuthUser() currentUser: User) {
    return this.geographicMapService.findAll(query, currentUser)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @AuthUser() currentUser: User) {
    const geographicMap = await this.geographicMapService.findOne(id)

    if (!geographicMap) {
      throw new NotFoundException()
    }

    if (!currentUser.isAdmin && !geographicMap.public) {
      const workRelation = geographicMap.establishmentsWithAccess.matching({
        where: { workRelations: { worker: currentUser.medicalWorker } }
      })

      if (!workRelation) {
        throw new ForbiddenException()
      }
    }

    return geographicMap
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
