import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { OccupationCategory } from '@modules/health/occupation-category/entities/occupation-category.entity';

export class OccupationSeeder extends Seeder {

  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const entities = [
      {
        name: 'Profissionais de Saúde',
        occupations: [
          {
            name: 'Gerente de Serviços de Saúde',
            cbo: '131210',
          },
          {
            name: 'Médico da Estratégia de Saúde da Familia',
            cbo: '225142',
          }
        ]
      }
    ]

    context.directorship = entities.map((item) => {
      em.create(OccupationCategory, {
        ...item
      });
    });
  }

}
