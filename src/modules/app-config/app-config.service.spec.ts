import { TestBed } from '@automock/jest'
import { ConfigService } from '@nestjs/config'
import { AppConfig } from './app-config.service'

describe('AppConfig', () => {
  let config: AppConfig
  let globalConfig: ConfigService

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AppConfig)
      .mock(ConfigService)
      .using({
        get: jest.fn().mockImplementation((key: string) => {
          if (key === 'MODE') {
            return 'dev'
          }

          if (key === 'PORT') {
            return 1234
          }

          if (key === 'DB_NAME') {
            return 'postgres'
          }
        })
      })
      .compile()

    config = unit
    globalConfig = unitRef.get(ConfigService)
  })

  it('should return the correct config values', () => {
    expect(config.db.name).toBe(globalConfig.get('DB_NAME'))
  })

  it('should allow destructuring into multiple config values', () => {
    const { mode, port } = config.app
    expect({ mode, port }).toMatchObject({
      mode: globalConfig.get('MODE'),
      port: globalConfig.get('PORT')
    })
  })
})
