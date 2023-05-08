import { Injectable } from '@nestjs/common'
import { CreateOccupationDto } from './dto/create-occupation.dto'
import { UpdateOccupationDto } from './dto/update-occupation.dto'

@Injectable()
export class OccupationsService {
  create(createOccupationDto: CreateOccupationDto) {
    console.log(createOccupationDto)
    return 'This action adds a new occupation'
  }

  findAll() {
    return `This action returns all occupations`
  }

  findOne(id: number) {
    return `This action returns a #${id} occupation`
  }

  update(id: number, updateOccupationDto: UpdateOccupationDto) {
    console.log(updateOccupationDto)
    return `This action updates a #${id} occupation`
  }

  remove(id: number) {
    return `This action removes a #${id} occupation`
  }
}
