import { PaginationQuery } from '@libs/types/pagination'
import { AuthUser } from '@modules/identity/auth/decorators/auth-user.decorator'
import { JwtAuthGuard } from '@modules/identity/auth/guards/jwt-auth.guard'
import { User } from '@modules/identity/user/entities/user.entity'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  NotFoundException,
  UseGuards,
  ForbiddenException
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DashboardService } from './dashboard.service'
import { CreateDashboardDto } from './dto/create-dashboard.dto'
import { FindUrlQuery } from './dto/find-url-query.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'
import { Dashboard } from './entities/dashboard.entity'

@Controller('dashboards')
@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  async canSee(user: User, dashboard: Dashboard) {
    const userInRelatedEstablishment =
      (
        await dashboard.establishmentsWithAccess.matching({
          where: { workRelations: { worker: user.medicalWorker } }
        })
      ).length > 0

    return user.isAdmin || userInRelatedEstablishment
  }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto)
  }

  @Get()
  findAll(@Query() query: PaginationQuery, @AuthUser() currentUser: User) {
    return this.dashboardService.findAll(query, currentUser)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @AuthUser() currentUser: User) {
    const dashboard = await this.dashboardService.findOne(id)

    if (!dashboard) {
      throw new NotFoundException()
    }

    if (!(await this.canSee(currentUser, dashboard))) {
      throw new ForbiddenException()
    }

    return { ...dashboard, dataSource: undefined }
  }

  @Get(':id/url')
  async findDashboardUrl(
    @Param('id', ParseIntPipe) id: number,
    @Query() findUrlQuery: FindUrlQuery,
    @AuthUser() currentUser: User
  ) {
    const dashboard = await this.dashboardService.findOne(id)

    if (!currentUser.medicalWorker) {
      throw new ForbiddenException()
    }

    if (!dashboard) {
      throw new NotFoundException()
    }

    return await this.dashboardService.getEmbedUrl(
      dashboard,
      currentUser.medicalWorker,
      findUrlQuery.workRelation
    )
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDashboardDto: UpdateDashboardDto,
    @AuthUser() currentUser: User
  ) {
    const dashboard = await this.dashboardService.findOne(id)

    if (!dashboard) {
      throw new NotFoundException()
    }

    if (!(await this.canSee(currentUser, dashboard))) {
      throw new ForbiddenException()
    }

    return this.dashboardService.update(id, updateDashboardDto)
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @AuthUser() currentUser: User) {
    const dashboard = await this.dashboardService.findOne(id)

    if (!dashboard) {
      throw new NotFoundException()
    }

    if (!(await this.canSee(currentUser, dashboard))) {
      throw new ForbiddenException()
    }

    const couldRemove = this.dashboardService.remove(id)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }
}
