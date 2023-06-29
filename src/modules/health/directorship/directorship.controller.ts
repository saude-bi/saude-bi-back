import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common'
import { DirectorshipService } from './directorship.service'
import { CreateDirectorshipDto } from './dto/create-directorship.dto'
import { UpdateDirectorshipDto } from './dto/update-directorship.dto'
import { ApiTags } from '@nestjs/swagger'
import { DirectorshipFindAllQuery } from './dto/directorship-filters.dto'

@Controller('directorship')
@ApiTags('Directorship')
export class DirectorshipController {
  constructor(private readonly directorshipService: DirectorshipService) {}

  @Post()
  create(@Body() createDirectorshipDto: CreateDirectorshipDto) {
    return this.directorshipService.create(createDirectorshipDto)
  }

  @Get()
  findAll(@Query() query: DirectorshipFindAllQuery) {
    return this.directorshipService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.directorshipService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDirectorshipDto: UpdateDirectorshipDto
  ) {
    return this.directorshipService.update(id, updateDirectorshipDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.directorshipService.remove(id)
  }
}
