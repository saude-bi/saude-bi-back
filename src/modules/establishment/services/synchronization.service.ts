import { DataDownloader } from '@modules/data/data-downloader.service'
import { Injectable, Logger } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { Establishment } from '../entities/establishment.entity'
import { EstablishmentService } from './establishment.service'
import path from 'path'
import { AppConfig } from '@modules/app-config/app-config.service'

@Injectable()
export class SynchronizationService {
  private readonly logger = new Logger(SynchronizationService.name)

  constructor(
    private readonly establishmentService: EstablishmentService,
    private readonly dataDownloader: DataDownloader,
    private readonly config: AppConfig
  ) {}

  async synchronize(year: number, month: number) {
    const directory = path.join(process.cwd(), this.config.synchronization.downloadPath)

    const paddedMonth = month.toString().padStart(2, '0')
    const filename = `BASE_DE_DADOS_CNES_${year}${paddedMonth}.ZIP`
    const filepath = path.join(directory, filename)

    const downloadedFile = await this.dataDownloader
      .ftp(`ftp.datasus.gov.br/cnes/${filename}`)
      .downloadTo(filepath)

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

    establishments.forEach(async (establishment) => {
      try {
        await this.establishmentService.upsert(establishment)
      } catch (e) {
        this.logger.warn(
          { error: e, establishment },
          'Failed to upsert an establishment during synchronization'
        )
      }
    })
  }
}
