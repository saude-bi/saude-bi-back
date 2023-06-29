import { Module } from '@nestjs/common'
import { DirectorshipService } from './directorship.service'
import { DirectorshipController } from './directorship.controller'
import { Directorship } from './entities/directorship.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  controllers: [DirectorshipController],
  providers: [DirectorshipService],
  imports: [MikroOrmModule.forFeature([Directorship])],
  exports: [DirectorshipService]
})
export class DirectorshipModule {}
