import { IsNumber, IsString } from 'class-validator'

export class CreateGeomapDto {
  @IsNumber()
  category: number

  @IsString()
  name: string
}
