import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { Agent } from 'https';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    const key = 'd2de988d-cbb5-4177-85fc-251164c3d26f';

    return (
      await firstValueFrom(
        this.httpService.get(
          'https://gist.githubusercontent.com/gustavocwl/8951b36a534c647370a4df6e09330b49/raw/8a3a9bac878a03f2bcb278bf3fbe9e15257edb1e/esgoto_foz',
        ),
      )
    ).data;
  }
}
