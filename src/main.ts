import { Logger } from 'nestjs-pino'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { QueryErrorFilter } from './configs/filters/query-error.filter'
import cookieParser from 'cookie-parser'

export let apiUrl: string

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useLogger(app.get(Logger))

  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  app.enableCors()

  app.useGlobalFilters(new QueryErrorFilter(httpAdapter))

  setupSwagger(app)

  await app.listen(process.env.PORT)
  apiUrl = await app.getUrl()
}
bootstrap()

async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('saude-bi')
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document, { swaggerOptions: { withCredentials: true } })
}
