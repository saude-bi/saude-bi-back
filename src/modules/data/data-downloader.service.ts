import { Injectable } from '@nestjs/common'
import { Client } from 'basic-ftp'
import { FileIOService } from './file-io.service'

@Injectable()
export class DataDownloader {
  constructor(private readonly fileIOService: FileIOService) {}

  async downloadFTP(host: string, filename: string, filePath: string): Promise<boolean> {
    if (this.fileIOService.fileExists(filePath)) {
      return true
    }

    const client = new Client()
    client.ftp.verbose = true

    const directory = this.fileIOService.directoryFrom(filePath)

    try {
      await client.access({
        host
      })

      await this.fileIOService.makePathIfNotExists(directory)
      await client.downloadTo(filePath, filename)

      return true
    } catch (err) {
      return false
    }
  }
}
