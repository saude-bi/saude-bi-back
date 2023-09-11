import { PartialType } from '@nestjs/mapped-types'
import { CreateGeomapDto } from './create-geomap.dto'

export class UpdateGeomapDto extends PartialType(CreateGeomapDto) {}
