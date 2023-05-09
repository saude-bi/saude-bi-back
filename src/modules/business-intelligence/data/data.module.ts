import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { DataDownloader } from './data-downloader.service'

@Module({
  providers: [DataDownloader],
  imports: [HttpModule],
  exports: [DataDownloader]
})
export class DataModule {}
