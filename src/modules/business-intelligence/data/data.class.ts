import { Readable } from 'stream'
import readline from 'readline'

type ObjectMapper<T> = (line: string) => T | null
type LinesMapperOptions = {
  start: number
  count: number
  onError?: (line: string, lineNumber: number, error: Error) => void
}

export class Data {
  constructor(private readonly stream: Readable) {}

  async mapLines<T>(
    objectMapper: ObjectMapper<T>,
    options?: Partial<LinesMapperOptions>
  ): Promise<T[]> {
    const parsedOptions: LinesMapperOptions = {
      start: options?.start || 0,
      count: options?.count === undefined ? Infinity : options.count,
      onError: options?.onError
    }

    const lines = readline.createInterface({
      input: this.stream,
      crlfDelay: Infinity
    })

    let lineNumber = 0
    const objects = []
    for await (const line of lines) {
      if (lineNumber >= parsedOptions.start + parsedOptions.count) {
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
        if (parsedOptions.onError) {
          parsedOptions.onError(line, lineNumber, err)
        }
      }

      lineNumber++
    }

    lines.close()
    return objects
  }

  async toString(): Promise<string> {
    const chunks = []

    for await (const chunk of this.stream) {
      chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks).toString('utf-8')
  }
}
