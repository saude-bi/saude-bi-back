import { existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { DataFile } from './data-file.class'

type DownloadCallback = (path: string) => Promise<void>
type DownloadOptions = { overwrite: boolean }

export class PendingDownload {
  constructor(
    private readonly baseDirectory: string,
    private readonly defaultFilename: string,
    private readonly downloadCallback: DownloadCallback
  ) {}

  private parseDownloadOptions(options: Partial<DownloadOptions>): DownloadOptions {
    const { overwrite = false } = options

    return {
      overwrite
    }
  }

  private pathToAbsolute(relativePath: string) {
    return join(process.cwd(), this.baseDirectory, relativePath)
  }

  async download(options: Partial<DownloadOptions> = {}): Promise<DataFile> {
    return await this.downloadTo(this.defaultFilename, options)
  }

  async downloadTo(
    relativePath: string,
    options: Partial<DownloadOptions> = {}
  ): Promise<DataFile> {
    const { overwrite } = this.parseDownloadOptions(options)

    const path = this.pathToAbsolute(relativePath)

    if (overwrite && existsSync(path)) {
      return new DataFile(path)
    }

    mkdirSync(dirname(path), { recursive: true })

    await this.downloadCallback(path)
    return new DataFile(path)
  }
}
