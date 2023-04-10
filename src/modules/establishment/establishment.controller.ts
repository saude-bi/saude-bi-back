import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Query,
  Put
} from '@nestjs/common'
import { CreateEstablishmentDto } from './dto/create-establishment.dto'
import { UpdateEstablishmentDto } from './dto/update-establishment.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '@modules/identity/auth/guards/jwt-auth.guard'
import { CheckPolicies, PoliciesGuard } from '@modules/identity/auth/casl/check-policies.decorator'
import { Action } from '@modules/identity/auth/casl/types'
import { Establishment } from './entities/establishment.entity'
import { SynchronizationQueryDto } from './dto/synchronize-query.dto'
import { EstablishmentService } from './services/establishment.service'
import { SynchronizationService } from './services/synchronization.service'
import { PaginationQuery } from '@libs/types/pagination'

@ApiTags('Establishment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('establishment')
export class EstablishmentController {
  constructor(
    private readonly establishmentService: EstablishmentService,
    private readonly synchronizationService: SynchronizationService
  ) {}

  @CheckPolicies((ability) => ability.can(Action.Create, Establishment))
  @Post()
  async create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return await this.establishmentService.create(createEstablishmentDto)
  }

  @CheckPolicies((ability) => ability.can(Action.List, Establishment))
  @Get()
  async findAll(@Query() query: PaginationQuery) {
    return await this.establishmentService.findAll(query)
  }

  @CheckPolicies((ability) => ability.can(Action.Read, Establishment))
  @Get(':cnes')
  async findOne(@Param('cnes') cnes: string) {
    const establishment = await this.establishmentService.findOne(cnes)

    if (!establishment) {
      throw new NotFoundException()
    }

    return establishment
  }

  @CheckPolicies((ability) => ability.can(Action.Update, Establishment))
  @Patch(':cnes')
  async update(
    @Param('cnes') cnes: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto
  ) {
    return await this.establishmentService.update(cnes, updateEstablishmentDto)
  }

  @CheckPolicies((ability) => ability.can(Action.Delete, Establishment))
  @Delete(':cnes')
  async remove(@Param('cnes') cnes: string) {
    const couldRemove = await this.establishmentService.remove(cnes)
    if (!couldRemove) {
      throw new NotFoundException()
    }
  }

  @CheckPolicies((ability) => ability.can(Action.Create, Establishment))
  @Put()
  async synchronize(@Query() { year, month }: SynchronizationQueryDto) {
    return await this.synchronizationService.synchronize(year, month)
  }
}
