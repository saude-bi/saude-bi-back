import { PartialType } from '@nestjs/mapped-types'
import { CreateDirectorshipDto } from './create-directorship.dto'

export class UpdateDirectorshipDto extends PartialType(CreateDirectorshipDto) {}
