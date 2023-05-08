import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { MedicalWorkerService } from './medical-worker.service'
import { CreateMedicalWorkerDto } from './dto/create-medical-worker.dto'
import { UpdateMedicalWorkerDto } from './dto/update-medical-worker.dto'

@Controller('medical-worker')
export class MedicalWorkerController {
  constructor(private readonly medicalWorkerService: MedicalWorkerService) {}

  @Post()
  create(@Body() createMedicalWorkerDto: CreateMedicalWorkerDto) {
    return this.medicalWorkerService.create(createMedicalWorkerDto)
  }

  @Get()
  findAll() {
    return this.medicalWorkerService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalWorkerService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalWorkerDto: UpdateMedicalWorkerDto) {
    return this.medicalWorkerService.update(+id, updateMedicalWorkerDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalWorkerService.remove(+id)
  }
}
