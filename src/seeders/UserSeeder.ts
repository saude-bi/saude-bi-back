import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import {
  Gender,
  MedicalWorker
} from '@modules/health/medical-worker/entities/medical-worker.entity'
import { hash } from 'bcrypt'

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(MedicalWorker, {
      user: {
        username: 'admin',
        password: await hash('admin', 10),
        isAdmin: true
      },
      workRelations: [
        {
          occupation: await em.findOne('Occupation', { cbo: '131210' }),
          establishment: await em.findOne('Establishment', { cnes: '6415903' })
        },
        {
          occupation: await em.findOne('Occupation', { cbo: '225142' }),
          establishment: await em.findOne('Establishment', { cnes: '2672987' })
        }
      ],
      name: 'Admnistrador',
      gender: Gender.Male,
      cns: '251454548330007',
      cpf: '81558947035'
    })
  }
}
