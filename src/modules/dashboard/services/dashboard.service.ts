import { CacheStore, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { CreateDashboardDto } from '../dto/create-dashboard.dto'
import { UpdateDashboardDto } from '../dto/update-dashboard.dto'

@Injectable()
export class DashboardService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore) {}

  create(createDashboardDto: CreateDashboardDto) {
    console.log(createDashboardDto)
    this.cacheManager.set('c', 'hello, world', { ttl: 10000 })
    return 'This action adds a new dashboard'
  }

  findAll() {
    return `This action returns all dashboard`
  }

  async findOne(id: number) {
    await new Promise((r) => setTimeout(r, 2000))
    return id
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    console.log(updateDashboardDto)
    return `This action updates a #${id} dashboard`
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`
  }
}
