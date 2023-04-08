import { Injectable, Logger } from '@nestjs/common'
import { createReadStream, existsSync, writeFileSync } from 'fs'
import readline from 'readline'

type ObjectMapper<T> = (line: string) => T | null

@Injectable()
export class FileIOService {
  private readonly logger = new Logger(FileIOService.name)

  fileExists(path: string): boolean {
    return existsSync(path)
  }

  writeBuffer(path: string, buffer: Buffer) {
    writeFileSync(path, buffer)
  }

  async unzip(path: string): Promise<boolean> {
    if (!this.fileExists(path)) {
      throw new Error('Tried to read ${path}, but file was not found')
    }

    return true
  }

  async mapFile<T>(
    objectMapper: ObjectMapper<T>,
    path: string,
    startLine = 0,
    lineCount?: number
  ): Promise<T[]> {
    if (!this.fileExists(path)) {
      throw new Error('Tried to read ${path}, but file was not found')
    }

    const fileStream = createReadStream(path, { encoding: 'utf8' })
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    const countLine = (
      (i = 0) =>
      () =>
        i++
    )()

    const objects = []
    for await (const line of rl) {
      const lineNumber = countLine()

      if (lineNumber < startLine) {
        continue
      }

      if (lineCount && lineNumber > lineCount) {
        rl.close()
        fileStream.close()
        return objects
      }

      try {
        const mappedObject = objectMapper(line)

        if (mappedObject) {
          objects.push(mappedObject)
        }
      } catch (err) {
        this.logger.error(`Error parsing line ${lineNumber} of ${path}: ${err}`)
      }
    }

    rl.close()
    fileStream.close()

    return objects
  }
}
