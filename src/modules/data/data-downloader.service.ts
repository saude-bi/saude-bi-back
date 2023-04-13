import { AppConfig } from '@modules/app-config/app-config.service'
import { Injectable } from '@nestjs/common'
import { Client } from 'basic-ftp'
import { PendingDownload } from './pending-download.class'

@Injectable()
export class DataDownloader {
  constructor(private readonly config: AppConfig) {}

  ftp(url: string): PendingDownload {
    const parsedUrl = new URL(url)

    const host = parsedUrl.host
    const ftpPath = parsedUrl.pathname
    const defaultFilename = ftpPath.split('/').at(-1)

    return new PendingDownload(
      this.config.synchronization.downloadPath,
      defaultFilename,
      async (path) => {
        const client = new Client()

        await client.access({
          host
        })

        await client.downloadTo(path, ftpPath)
      }
    )
  }
}
