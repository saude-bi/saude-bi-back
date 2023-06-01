import { Module } from '@nestjs/common'
import { OccupationService } from './occupation.service'
import { OccupationController } from './occupation.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Occupation } from './entities/occupation.entity'

@Module({
  controllers: [OccupationController],
  providers: [OccupationService],
  imports: [MikroOrmModule.forFeature([Occupation])]
})
export class OccupationModule {}
