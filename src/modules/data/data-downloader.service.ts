import { Injectable } from '@nestjs/common'
import { Client } from 'basic-ftp'
import { PendingDownload } from './pending-download.class'

@Injectable()
export class DataDownloader {
  ftp(url: string): PendingDownload {
    return new PendingDownload(async (path) => {
      const parsedUrl = new URL(url)

      const host = parsedUrl.host
      const ftpPath = parsedUrl.pathname

      const client = new Client()

      await client.access({
        host
      })

      await client.downloadTo(path, ftpPath)
    })
  }
}
