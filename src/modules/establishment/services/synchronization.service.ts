import { DataDownloader } from '@modules/data/data-downloader.service'
import { FileIOService } from '@modules/data/file-io.service'
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import { Establishment } from '../entities/establishment.entity'
import { EstablishmentService } from './establishment.service'

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
    const path = 'insertPathHere'

    const paddedMonth = month.toString().padStart(2, '0')
    const downloadSuccessful = this.dataDownloader.download(
      `ftp://ftp.datasus.gov.br/cnes/BASE_DE_DADOS_CNES_${year}${paddedMonth}.ZIP`,
      path
    )

    if (!downloadSuccessful) {
      throw new InternalServerErrorException()
    }

    const unzipSuccessful = await this.fileIOService.unzip(path)

    if (!unzipSuccessful) {
      throw new InternalServerErrorException()
    }

    const establishments = await this.fileIOService.mapFile<Establishment>(
      (line) => {
        const csv = line.split(';')
        const cnpj = csv[2]

        if (cnpj !== this.configService.get('CNPJ_MANTENEDORA')) {
          return null
        }

        const establishment = plainToInstance(Establishment, { name: csv[6], cnes: csv[1] })
        return establishment
      },
      path,
      1
    )

    establishments.forEach(async (establishment) => {
      try {
        await this.establishmentService.upsert(establishment)
      } catch (e) {
        this.logger.error(e)
      }
    })

    return
  }
}
