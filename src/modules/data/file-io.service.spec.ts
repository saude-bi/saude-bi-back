import { TestBed } from '@automock/jest'
import { FileIOService } from './file-io.service'
import { Readable } from 'stream'

describe('File IO Service', () => {
  let service: FileIOService

  beforeAll(() => {
    const { unit } = TestBed.create(FileIOService).compile()

    service = unit
  })

  describe('directoryFrom', () => {
    it('should return the correct directory path', () => {
      expect(service.directoryFrom('this/is/a/file.txt')).toBe('this/is/a')
    })

    it('should handle an empty path', () => {
      expect(service.directoryFrom('')).toBe('.')
    })
  })

  describe('mapLinesFromStream', () => {
    const objectMapper = (line: string) => {
      const values = line.split(',')
      return {
        a: JSON.parse(values[0]),
        b: JSON.parse(values[1]),
        c: JSON.parse(values[2])
      }
    }

    const data = '10,20,30\n40,50,60\n70,80,90\n'
    const expectedResult = [
      { a: 10, b: 20, c: 30 },
      { a: 40, b: 50, c: 60 },
      { a: 70, b: 80, c: 90 }
    ]

    it('should parse data to list of objects', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data))
      expect(result).toMatchObject(expectedResult)
    })

    it('should handle no newline at the end', async () => {
      const result = await service.mapLinesFromStream(
        objectMapper,
        Readable.from(data.slice(0, -1))
      )

      expect(result).toMatchObject(expectedResult)
    })

    it('should allow skipping lines', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data), {
        start: 2
      })
      expect(result).toMatchObject(expectedResult.slice(2))
    })

    it('should return nothing when skipping more lines than there are in the file', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data), {
        start: expectedResult.length
      })
      expect(result).toStrictEqual([])
    })

    it('should handle no onError callback when catching error', async () => {
      const callback = () => {
        throw new Error('this should be caught')
      }

      const result = await service.mapLinesFromStream(callback, Readable.from(data))

      expect(result).toStrictEqual([])
    })

    it('should call callback on error', async () => {
      const callback = jest.fn()
      await service.mapLinesFromStream(
        () => {
          throw new Error('this should be caught')
        },
        Readable.from(data),
        { onError: callback }
      )

      expect(callback).toHaveBeenCalledTimes(expectedResult.length)
    })

    it('should handle negative count', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data), {
        count: -1
      })
      expect(result).toStrictEqual([])
    })

    it('should handle count equal to zero', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data), {
        count: 0
      })
      expect(result).toStrictEqual([])
    })

    it('should handle positive count', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data), {
        count: 1
      })
      expect(result).toStrictEqual([expectedResult[0]])
    })

    it('should handle count with start line', async () => {
      const result = await service.mapLinesFromStream(objectMapper, Readable.from(data), {
        start: 1,
        count: 1
      })
      expect(result).toStrictEqual([expectedResult[1]])
    })
  })
})
