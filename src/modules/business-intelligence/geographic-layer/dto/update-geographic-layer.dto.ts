import { PartialType } from '@nestjs/mapped-types'
import { CreateGeographicLayerDto } from './create-geographic-layer.dto'

export class UpdateGeographicLayerDto extends PartialType(CreateGeographicLayerDto) {}
