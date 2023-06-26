import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  NotFoundException
} from '@nestjs/common'
import { OccupationService } from './occupation.service'
import { CreateOccupationDto } from './dto/create-occupation.dto'
import { UpdateOccupationDto } from './dto/update-occupation.dto'
import { ApiTags } from '@nestjs/swagger'
import { OccupationFindAllQuery } from './dto/occupation-filters.dto'

@Controller('occupations')
@ApiTags('Occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Post()
  async create(@Body() createOccupationDto: CreateOccupationDto) {
    return await this.occupationService.create(createOccupationDto)
  }

  @Get()
  async findAll(@Query() query: OccupationFindAllQuery) {
    return await this.occupationService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.occupationService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOccupationDto: UpdateOccupationDto
  ) {
    return await this.occupationService.update(id, updateOccupationDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const couldRemove = await this.occupationService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
