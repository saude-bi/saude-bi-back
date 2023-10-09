import { PartialType } from '@nestjs/mapped-types'
import { CreateGeographicDataSourceDto } from './create-geographic-data-source.dto'

export class UpdateGeographicDataSourceDto extends PartialType(CreateGeographicDataSourceDto) {}
