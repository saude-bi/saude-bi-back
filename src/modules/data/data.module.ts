import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { DataDownloader } from './data-downloader.service'
import { FileIOService } from './file-io.service'

@Module({
  providers: [DataDownloader, FileIOService],
  imports: [HttpModule],
  exports: [DataDownloader, FileIOService]
})
export class DataModule {}
