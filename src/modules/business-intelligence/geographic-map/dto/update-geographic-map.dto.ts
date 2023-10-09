import { PartialType } from '@nestjs/mapped-types'
import { CreateGeographicMapDto } from './create-geographic-map.dto'

export class UpdateGeographicMapDto extends PartialType(CreateGeographicMapDto) {}
