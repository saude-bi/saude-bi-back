import { Injectable, Logger } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Establishment } from '../entities/establishment.entity'
import { EstablishmentService } from './establishment.service'
import { AppConfig } from '@modules/app-config/app-config.service'
import { DataDownloader } from '@modules/business-intelligence/data/data-downloader.service'

@Injectable()
export class SynchronizationService {
  private readonly logger = new Logger(SynchronizationService.name)

  constructor(
    private readonly establishmentService: EstablishmentService,
    private readonly dataDownloader: DataDownloader,
    private readonly config: AppConfig
  ) {}

  async synchronize(year: number, month: number) {
    const paddedMonth = month.toString().padStart(2, '0')
    const filename = `BASE_DE_DADOS_CNES_${year}${paddedMonth}.ZIP`

    this.logger.log('Downloading establishment data...')

    const downloadedFile = await this.dataDownloader
      .ftp(`ftp.datasus.gov.br/cnes/${filename}`)
      .download()

    this.logger.log('Unzipping establishment data and mapping contents...')

    const establishments = await downloadedFile
      .unzipped(`tbEstabelecimento${year}${paddedMonth}.csv`)
      .then((data) =>
        data.mapLines<Establishment>(
          (line) => {
            const csv = line.split(';')
            const cnpj = JSON.parse(csv[2])

            if (cnpj !== this.config.synchronization.maintainerCnpj) {
              return null
            }

            const establishment = plainToInstance(Establishment, {
              name: JSON.parse(csv[6]),
              cnes: JSON.parse(csv[1])
            })

            return establishment
          },
          { start: 1 }
        )
      )

    this.logger.log({ count: establishments.length }, 'Persisting establishments to database...')
    for (const establishment of establishments) {
      try {
        this.logger.verbose({ establishment }, 'Synchronizing establishment via upsert...')
        await this.establishmentService.upsert(establishment)
      } catch (e) {
        this.logger.warn(
          { error: e, establishment },
          'Failed to persist an establishment during synchronization'
        )
      }
    }
  }
}
