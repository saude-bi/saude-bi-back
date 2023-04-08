import { IsInt, Max, Min } from 'class-validator'

export class SynchronizationQueryDto {
  @IsInt()
  @Min(2017)
  year: number

  @IsInt()
  @Min(1)
  @Max(12)
  month: number
}
