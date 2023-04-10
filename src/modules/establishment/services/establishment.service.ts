import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateEstablishmentDto } from '../dto/create-establishment.dto'
import { UpdateEstablishmentDto } from '../dto/update-establishment.dto'
import { Establishment } from '../entities/establishment.entity'

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private readonly establishmentRepository: EntityRepository<Establishment>
  ) {}

  async create(createEstablishmentDto: CreateEstablishmentDto) {
    console.log(createEstablishmentDto)
    return 'This action adds a new establishment'
  }

  async findAll() {
    return `This action returns all establishment`
  }

  async findOne(cnes: string) {
    return `This action returns a #${cnes} establishment`
  }

  async update(cnes: string, updateEstablishmentDto: UpdateEstablishmentDto) {
    console.log(updateEstablishmentDto)
    return `This action updates a #${cnes} establishment`
  }

  async upsert(establishment: CreateEstablishmentDto) {
    await this.establishmentRepository.upsert(establishment)
  }

  async remove(cnes: string) {
    return `This action removes a #${cnes} establishment`
  }
}
