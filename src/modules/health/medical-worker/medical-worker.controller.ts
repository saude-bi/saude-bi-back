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
import { MedicalWorkerService } from './medical-worker.service'
import { CreateMedicalWorkerDto } from './dto/create-medical-worker.dto'
import { UpdateMedicalWorkerDto } from './dto/update-medical-worker.dto'
import { PaginationQuery } from '@libs/types/pagination'
import { ApiTags } from '@nestjs/swagger'

@Controller('medical-workers')
@ApiTags('Medical Worker')
export class MedicalWorkerController {
  constructor(private readonly medicalWorkerService: MedicalWorkerService) {}

  @Post()
  async create(@Body() createMedicalWorkerDto: CreateMedicalWorkerDto) {
    return await this.medicalWorkerService.create(createMedicalWorkerDto)
  }

  @Get()
  async findAll(@Query() query: PaginationQuery) {
    return await this.medicalWorkerService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.medicalWorkerService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicalWorkerDto: UpdateMedicalWorkerDto
  ) {
    return await this.medicalWorkerService.update(id, updateMedicalWorkerDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const couldRemove = await this.medicalWorkerService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
