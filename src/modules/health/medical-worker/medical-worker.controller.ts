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
import { CreateWorkRelationDto } from './dto/create-work-relation.dto'

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

  @Post(':id/work-relations')
  async addWorkRelation(
    @Param('id', ParseIntPipe) id: number,
    @Body() createWorkRelationDto: CreateWorkRelationDto
  ) {
    return await this.medicalWorkerService.createWorkRelation(id, createWorkRelationDto)
  }

  @Delete(':medicalWorkerId/work-relations/:workRelationId')
  async removeWorkRelation(
    @Param('medicalWorkerId') medicalWorkerId: number,
    @Param('workRelationId') workRelationId: number
  ) {
    const couldRemove = await this.medicalWorkerService.removeWorkRelation(
      medicalWorkerId,
      workRelationId
    )

    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
