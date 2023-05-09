import { Injectable } from '@nestjs/common'
import { CreateMedicalWorkerDto } from './dto/create-medical-worker.dto'
import { UpdateMedicalWorkerDto } from './dto/update-medical-worker.dto'

@Injectable()
export class MedicalWorkerService {
  create(createMedicalWorkerDto: CreateMedicalWorkerDto) {
    console.log(createMedicalWorkerDto)
    return 'This action adds a new medicalWorker'
  }

  findAll() {
    return `This action returns all medicalWorker`
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalWorker`
  }

  update(id: number, updateMedicalWorkerDto: UpdateMedicalWorkerDto) {
    console.log(updateMedicalWorkerDto)
    return `This action updates a #${id} medicalWorker`
  }

  remove(id: number) {
    return `This action removes a #${id} medicalWorker`
  }
}
