import { Injectable, Logger } from '@nestjs/common'
import { createReadStream, existsSync, ReadStream, writeFileSync } from 'fs'
import fs from 'fs'
import readline from 'readline'
import yauzl from 'yauzl'
import path from 'path'

type ObjectMapper<T> = (line: string) => T | null
type LinesMapperOptions = {
  start: number
  count: number
  onError?: (line: string, lineNumber: number, error: Error) => void
}

@Injectable()
export class FileIOService {
  private readonly logger = new Logger(FileIOService.name)

  fileExists(path: string): boolean {
    return existsSync(path)
  }

  writeBuffer(path: string, buffer: Buffer) {
    writeFileSync(path, buffer)
  }

  async makePathIfNotExists(dir: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, { recursive: true }, (err, path) => {
        if (err) {
          reject(err)
          return
        }

        resolve(path)
      })
    })
  }

  directoryFrom(filePath: string): string {
    return path.dirname(filePath)
  }

  async unzipped(path: string, filename: string): Promise<ReadStream> {
    if (!this.fileExists(path)) {
      throw new Error('Tried to read ${path}, but file was not found')
    }

    return new Promise((resolve, reject) => {
      yauzl.open(path, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          reject(err)
          return
        }

        zipfile.readEntry()
        zipfile.on('entry', (entry) => {
          if (entry.fileName !== filename) {
            zipfile.readEntry()
            return
          }

          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) {
              reject(err)
              return
            }

            resolve(readStream)
          })
        })

        zipfile.on('end', () => {
          reject(new Error(`Could not find ${filename} in ${path}`))
        })
      })
    })
  }

  async mapLinesFromStream<T>(
    objectMapper: ObjectMapper<T>,
    stream: ReadStream,
    options?: Partial<LinesMapperOptions>
  ): Promise<T[]> {
    const parsedOptions: LinesMapperOptions = {
      start: options?.start || 0,
      count: options?.count || Infinity,
      onError: options?.onError
    }

    const lines = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    })

    let lineNumber = 0
    const objects = []
    for await (const line of lines) {
      if (lineNumber > parsedOptions.count) {
        break
      }

      if (lineNumber < parsedOptions.start) {
        lineNumber++
        continue
      }

      try {
        const mappedObject = objectMapper(line)

        if (mappedObject) {
          objects.push(mappedObject)
        }
      } catch (err) {
        parsedOptions.onError(line, lineNumber, err)
      }

      lineNumber++
    }

    lines.close()
    return objects
  }

  async mapFile<T>(
    objectMapper: ObjectMapper<T>,
    path: string,
    start = 0,
    count?: number
  ): Promise<T[]> {
    if (!this.fileExists(path)) {
      throw new Error('Tried to read ${path}, but file was not found')
    }

    const fileStream = createReadStream(path, { encoding: 'utf8' })
    const result = await this.mapLinesFromStream(objectMapper, fileStream, {
      start,
      count,
      onError: (_, lineNumber, error) => {
        this.logger.error(`Error parsing line ${lineNumber} of ${path}: ${error}`)
      }
    })

    fileStream.close()
    return result
  }
}
