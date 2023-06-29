import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Gender, MedicalWorker } from '@modules/health/medical-worker/entities/medical-worker.entity';
import { User } from '@modules/identity/user/entities/user.entity';
import { hash } from 'bcrypt';

export class UserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const medicalWorker = em.create(MedicalWorker, {
      user: {
        username: 'admin',
        password: await hash('admin', 10),
        isAdmin: true,
      },
      workRelations: [
        {
          occupation: await em.findOne('Occupation', { cbo: '131210' }),
          establishment: await em.findOne('Establishment', { cnes: '6415903' }),
        }
      ],
      name: 'Admnistrador',
      gender: Gender.Male,
      cns: '251454548330007',
      cpf: '81558947035',
    });
  }

}
