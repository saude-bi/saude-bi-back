import { Module } from '@nestjs/common'
import { OccupationCategoryService } from './occupation-category.service'
import { OccupationCategoryController } from './occupation-category.controller'
import { OccupationCategory } from './entities/occupation-category.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  controllers: [OccupationCategoryController],
  providers: [OccupationCategoryService],
  imports: [MikroOrmModule.forFeature([OccupationCategory])]
})
export class OccupationCategoryModule {}
