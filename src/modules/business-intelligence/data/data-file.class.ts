import { createReadStream } from 'fs'
import yauzl from 'yauzl'
import { Data } from './data.class'

export class DataFile {
  constructor(private readonly path: string) {}

  async unzipped(filename: string): Promise<Data> {
    return new Promise((resolve, reject) => {
      yauzl.open(this.path, { lazyEntries: true }, (err, zipfile) => {
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

            resolve(new Data(readStream))
          })
        })

        zipfile.on('end', () => {
          reject(new Error(`Could not find ${filename} in zip file at ${this.path}`))
        })
      })
    })
  }

  read(): Data {
    return new Data(createReadStream(this.path))
  }
}
