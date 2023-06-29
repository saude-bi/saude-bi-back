import { PaginationResponse } from '@libs/types/pagination'
import { getPaginationOptions } from '@libs/utils/pagination.utils'
import { EntityRepository, wrap } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { UserService } from '@modules/identity/user/user.service'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { EstablishmentService } from '../establishment/services/establishment.service'
import { OccupationService } from '../occupation/occupation.service'
import { CreateMedicalWorkerDto } from './dto/create-medical-worker.dto'
import { CreateWorkRelationDto } from './dto/create-work-relation.dto'
import { MedicalWorkerFindAllQuery } from './dto/medical-worker-filters.dto'
import { UpdateMedicalWorkerDto } from './dto/update-medical-worker.dto'
import { MedicalWorker } from './entities/medical-worker.entity'
import { WorkRelation } from './entities/work-relation.entity'

@Injectable()
export class MedicalWorkerService {
  constructor(
    @InjectRepository(MedicalWorker)
    private readonly medicalWorkerRepository: EntityRepository<MedicalWorker>,
    @InjectRepository(WorkRelation)
    private readonly workRelationRepository: EntityRepository<WorkRelation>,
    private readonly userService: UserService,
    private readonly occupationService: OccupationService,
    private readonly establishmentService: EstablishmentService
  ) {}

  async create(medicalWorker: CreateMedicalWorkerDto): Promise<MedicalWorker> {
    const user = medicalWorker.user ? await this.userService.create(medicalWorker.user) : null

    const newMedicalWorker = this.medicalWorkerRepository.create({ ...medicalWorker, user })
    await this.medicalWorkerRepository.persistAndFlush(newMedicalWorker)

    return newMedicalWorker
  }

  async findOne(id: number): Promise<MedicalWorker> {
    return await this.medicalWorkerRepository.findOne(
      { id },
      {
        populate: ['created', 'updated', 'workRelations']
      }
    )
  }

  async findAll(query: MedicalWorkerFindAllQuery): Promise<PaginationResponse<MedicalWorker>> {
    const [result, total] = await this.medicalWorkerRepository.findAndCount(
      { name: new RegExp(query.name, 'i') },
      {
        ...getPaginationOptions(query),
        populate: ['created', 'updated', 'workRelations']
      }
    )

    return new PaginationResponse(query, total, result)
  }

  async update(id: number, updatedMedicalWorker: UpdateMedicalWorkerDto): Promise<MedicalWorker> {
    const existingMedicalWorker = await this.findOne(id)
    wrap(existingMedicalWorker).assign(updatedMedicalWorker)

    await this.medicalWorkerRepository.persistAndFlush(existingMedicalWorker)
    return existingMedicalWorker
  }

  async remove(id: number): Promise<boolean> {
    const medicalWorker = await this.findOne(id)
    await this.medicalWorkerRepository.removeAndFlush(medicalWorker)

    return !!medicalWorker
  }

  async createWorkRelation(
    medicalWorkerId: number,
    workRelation: CreateWorkRelationDto
  ): Promise<MedicalWorker> {
    const medicalWorker = await this.findOne(medicalWorkerId)

    if (!medicalWorker) {
      throw new NotFoundException('Medical Worker with id ${medicalWorkerId} does not exist')
    }

    const occupation = await this.occupationService.findOne(workRelation.occupation)

    if (!occupation) {
      throw new BadRequestException('Occupation to be linked with work relation does not exist')
    }

    const establishment = await this.establishmentService.findOne(workRelation.establishment)

    if (!establishment) {
      throw new BadRequestException('Establishment to be linked with work relation does not exist')
    }

    const newWorkRelation = this.workRelationRepository.create({
      worker: medicalWorkerId,
      establishment,
      occupation
    })

    await this.workRelationRepository.persistAndFlush(newWorkRelation)
    return await this.findOne(medicalWorkerId)
  }

  async removeWorkRelation(medicalWorkerId: number, workRelationId: number): Promise<boolean> {
    const workRelation = await this.workRelationRepository.findOne({
      id: workRelationId,
      worker: medicalWorkerId
    })
    await this.workRelationRepository.removeAndFlush(workRelation)

    return !!workRelation
  }
}
