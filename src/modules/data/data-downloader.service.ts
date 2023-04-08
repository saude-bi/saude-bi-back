import { HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { FileIOService } from './file-io.service'

@Injectable()
export class DataDownloader {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileIOService: FileIOService
  ) {}

  async download(url: string, path: string): Promise<boolean> {
    const response = await this.httpService
      .get(url, {
        responseType: 'blob'
      })
      .toPromise()

    if (response.status !== HttpStatus.OK) {
      return false
    }

    this.fileIOService.writeBuffer(path, response.data)
    return true
  }
}
