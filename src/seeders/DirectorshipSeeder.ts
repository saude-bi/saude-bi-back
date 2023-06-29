import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Directorship } from '@modules/health/directorship/entities/directorship.entity';
import { Establishment } from '@modules/health/establishment/entities/establishment.entity';



export class DirectorshipSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const entities = [
      {
        name: 'Diretoria de Atenção Básica',
        acronym: 'DIAT',
        establishments: [
          {
            name: 'SECRETARIA MUNÍCIPAL DE SAÚDE',
            cnes: '6415903',
          },
        ]
      },
      {
        name: 'Diretoria de Atenção Especializada',
        acronym: 'DIES',
      },
      {
        name: 'Diretoria de Saúde Mental e Residência',
        acronym: 'DIRS',
      },
      {
        name: 'Diretoria de Vigilância em Saúde',
        acronym: 'DIVS',
      },
      {
        name: 'Diretoria de Auditoria e Controle',
        acronym: 'DIAC',
      },
      {
        name: 'Diretoria de Gestão de Pessoas',
        acronym: 'DIGS',
        establishments: [
          {
            name: 'UBS VILA C',
            cnes: '2672987',
          },
        ]
      },
      {
        name: 'Diretoria de Gestão Financeira e Contábil',
        acronym: 'DIFC',
      },
    ];
  

    context.directorship = entities.map((item) => {
      em.create(Directorship, {
        ...item
      });
    });
  }
}
