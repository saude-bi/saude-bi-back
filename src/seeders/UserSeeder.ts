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
      name: 'Admnistrador',
      gender: Gender.Male,
      cns: '1234567890123456',
      cpf: '12345678901',
    });
  }

}
