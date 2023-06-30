import { IsString } from 'class-validator'

export class CreateDirectorshipDto {
  @IsString()
  name: string

  @IsString()
  acronym: string
}
