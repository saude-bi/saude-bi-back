import { DataDownloader } from '@modules/data/data-downloader.service'
import { FileIOService } from '@modules/data/file-io.service'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { Establishment } from '../entities/establishment.entity'
import { EstablishmentService } from './establishment.service'
import path from 'path'

@Injectable()
export class SynchronizationService {
  private readonly logger = new Logger(FileIOService.name)

  constructor(
    private readonly establishmentService: EstablishmentService,
    private readonly dataDownloader: DataDownloader,
    private readonly fileIOService: FileIOService,
    private readonly configService: ConfigService
  ) {}

  async synchronize(year: number, month: number) {
    const directory = path.join(process.cwd(), this.configService.get('DOWNLOAD_PATH'))

    this.logger.log('Downloading datasus database...')

    const paddedMonth = month.toString().padStart(2, '0')
    const filename = `BASE_DE_DADOS_CNES_${year}${paddedMonth}.ZIP`
    const filepath = path.join(directory, filename)

    const downloadSuccessful = await this.dataDownloader.downloadFTP(
      'ftp.datasus.gov.br',
      `/cnes/${filename}`,
      filepath
    )

    if (!downloadSuccessful) {
      throw new Error('Could not download CNES data from datasus database')
    }

    this.logger.log('Unzipping csv file from datasus database...')

    const dataStream = await this.fileIOService.unzipped(
      filepath,
      `tbEstabelecimento${year}${paddedMonth}.csv`
    )

    if (!dataStream) {
      throw new Error('Could not unzip expected file from data stream')
    }

    this.logger.log('Mapping data from csv database to repository objects...')

    const establishments = await this.fileIOService.mapLinesFromStream<Establishment>(
      (line) => {
        const csv = line.split(';')
        const cnpj: string = JSON.parse(csv[2])

        if (cnpj !== this.configService.get('CNPJ_MANTENEDORA')) {
          return null
        }

        const establishment = plainToInstance(Establishment, {
          name: JSON.parse(csv[6]),
          cnes: JSON.parse(csv[1])
        })

        return establishment
      },
      dataStream,
      { start: 1 }
    )

    this.logger.log('Persisting objects to repository...')
    console.log(establishments)

    establishments.forEach(async (establishment) => {
      try {
        await this.establishmentService.upsert(establishment)
      } catch (e) {
        this.logger.error(e)
      }
    })
  }
}
