import { PaginationQuery, PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UserService } from '@modules/identity/user/user.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateMedicalWorkerDto } from './dto/create-medical-worker.dto'
import { UpdateMedicalWorkerDto } from './dto/update-medical-worker.dto'
import { MedicalWorker } from './entities/medical-worker.entity'

@Injectable()
export class MedicalWorkerService {
  constructor(
    @InjectRepository(MedicalWorker)
    private readonly medicalWorkerRepository: EntityRepository<MedicalWorker>,
    private readonly userService: UserService
  ) {}

  async create(medicalWorker: CreateMedicalWorkerDto): Promise<MedicalWorker> {
    const user = await this.userService.findOne(medicalWorker.user)

    if (!user) {
      throw new BadRequestException('User linked to medical worker does not exist')
    }

    const newMedicalWorker = this.medicalWorkerRepository.create({ ...medicalWorker, user })
    await this.medicalWorkerRepository.persistAndFlush(newMedicalWorker)

    return newMedicalWorker
  }

  async findOne(id: number): Promise<MedicalWorker> {
    return await this.medicalWorkerRepository.findOne({ id })
  }

  async findAll(query: PaginationQuery): Promise<PaginationResponse<MedicalWorker>> {
    const [result, total] = await this.medicalWorkerRepository.findAndCount(
      {},
      getPaginationOptions(query)
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedMedicalWorker: UpdateMedicalWorkerDto): Promise<MedicalWorker> {
    const user = updatedMedicalWorker.user
      ? await this.userService.findOne(updatedMedicalWorker.user)
      : undefined

    if (updatedMedicalWorker.user && !user) {
      throw new BadRequestException('User linked to medical worker does not exist')
    }

    const existingMedicalWorker = await this.findOne(id)
    wrap(existingMedicalWorker).assign({ ...updatedMedicalWorker, user })

    await this.medicalWorkerRepository.persistAndFlush(existingMedicalWorker)
    return existingMedicalWorker
  }

  async remove(id: number): Promise<boolean> {
    const medicalWorker = await this.findOne(id)
    await this.medicalWorkerRepository.removeAndFlush(medicalWorker)

    return !!medicalWorker
  }
}
