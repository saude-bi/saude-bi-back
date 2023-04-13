import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { DataFile } from './data-file.class'

type DownloadCallback = (path: string) => Promise<void>
type DownloadOptions = { overwrite: boolean }

export class PendingDownload {
  constructor(private readonly downloadCallback: DownloadCallback) {}

  async downloadTo(path: string, options?: Partial<DownloadOptions>): Promise<DataFile> {
    const parsedOptions: DownloadOptions = {
      overwrite: options?.overwrite === undefined ? false : options?.overwrite
    }

    if (parsedOptions.overwrite && existsSync(path)) {
      return new DataFile(path)
    }

    mkdirSync(dirname(path), { recursive: true })

    await this.downloadCallback(path)
    return new DataFile(path)
  }
}
