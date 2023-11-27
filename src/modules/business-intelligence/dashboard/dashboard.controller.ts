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
import { DashboardFindAllQuery } from './dto/dashboard-filters.dto'
import { FindUrlQuery } from './dto/find-url-query.dto'
import { UpdateDashboardDto } from './dto/update-dashboard.dto'
import { Dashboard } from './entities/dashboard.entity'

@Controller()
@ApiTags('Dashboard')
@ApiBearerAuth()
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

  @Post('dashboards')
  @UseGuards(JwtAuthGuard)
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto)
  }

  @Get('dashboards')
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: DashboardFindAllQuery, @AuthUser() currentUser: User) {
    return this.dashboardService.findAll(query, currentUser)
  }

  @Get('public/dashboards')
  findAllPublic(@Query() query: DashboardFindAllQuery) {
    return this.dashboardService.findAll(query)
  }

  @Get('dashboards/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number, @AuthUser() currentUser: User) {
    const dashboard = await this.dashboardService.findOne(id)

    if (!dashboard) {
      throw new NotFoundException()
    }

    if (!(await this.canSee(currentUser, dashboard))) {
      throw new ForbiddenException()
    }

    return { ...dashboard }
  }

  @Get('dashboards/:id/url')
  @UseGuards(JwtAuthGuard)
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

  @Get('public/dashboards/:id/url')
  async findPublicDashboardUrl(@Param('id', ParseIntPipe) id: number) {
    const dashboard = await this.dashboardService.findOne(id)

    if (!dashboard?.public) {
      throw new NotFoundException()
    }

    return await this.dashboardService.getPublicEmbedUrl(dashboard)
  }

  @Patch('dashboards/:id')
  @UseGuards(JwtAuthGuard)
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

  @Delete('dashboards/:id')
  @UseGuards(JwtAuthGuard)
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
