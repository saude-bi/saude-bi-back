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
          {
            name: 'UBS PQ PRESIDENTE',
            cnes: '2593955',
        },
        {
            name: 'UBS PORTO BELO',
            cnes: '2593998',
        },
        {
            name: 'UBS MORUMBI III',
            cnes: '2594013',
        },
        {
            name: 'UBS PROFILURB I',
            cnes: '2593890',
        },
        {
            name: 'UBS JARDIM CURITIBANO',
            cnes: '2672979',
        },
        {
            name: 'UBS PORTAL DA FOZ',
            cnes: '2673029',
        },
        {
            name: 'UBS CIDADE NOVA',
            cnes: '2673134',
        },
        {
            name: 'UBS VILA YOLANDA',
            cnes: '2593920',
        },
        {
            name: 'UBS JARDIM SAO PAULO',
            cnes: '2672960',
        },
        {
            name: 'UBS CARIMA',
            cnes: '2672995',
        },
        {
            name: 'UBS MORUMBI II',
            cnes: '7489374',
        },
        {
            name: 'UBS JARDIM JUPIRA',
            cnes: '6053114',
        },
        {
            name: 'UBS VILA C NOVA',
            cnes: '3841626',
        },
        {
            name: 'UBS JARDIM AMERICA',
            cnes: '2673010',
        },
        {
            name: 'UBS TRES LAGOAS',
            cnes: '2673037',
        },
        {
            name: 'UBS SOL DE MAIO',
            cnes: '2673126',
        },
        {
            name: 'UBS CAMPOS DO IGUACU',
            cnes: '2593963',
        },
        {
            name: 'UBS TRES BANDEIRAS',
            cnes: '2673150',
        },
        {
            name: 'UBS JARDIM SAO PAULO II',
            cnes: '5133815',
        },
        {
            name: 'UBS PADRE MONTI',
            cnes: '3448363',
        },
        {
            name: 'UBS MARACANA',
            cnes: '7876726',
        },
        {
            name: 'UBS VILA ADRIANA',
            cnes: '2673142',
        },
        {
            name: 'UBS OURO VERDE',
            cnes: '3001172',
        },
        {
          name: 'NUCLEO DE SAUDE AKLP',
          cnes: '2673002',
      },
      {
          name: 'NUCLEO DE SAUDE SAO JOAO',
          cnes: '2673169',
      },
      {
          name: 'NUCLEO DE SAUDE PROFILURB II',
          cnes: '2593882',
      }              
        ]
      },
      {
        name: 'Diretoria de Atenção Especializada',
        acronym: 'DIES',
        establishments: [
          {
            name: 'CENTRO ESPECIALIZADO EM REABILITACAO CER IV',
            cnes: '9259996'
          },
          {
            name: 'SAMU FOZ USA 02',
            cnes: '6999565'
          },
          {
            name: 'MOTOLANCIA FOZ 02',
            cnes: '9143327'
          },
          {
            name: 'CIEVS FRONTEIRA FOZ DO IGUACU',
            cnes: '0948365'
          },
          {
            name: 'UNIDADE DE PRONTO ATENDIMENTO DR WALTER CAVALCANTI BARBOSA',
            cnes: '2593904'
          },
          {
            name: 'CAPS AD SOLIDARIEDADE',
            cnes: '3860256'
          },
          {
            name: 'CENTRO DE ESPECIALIDADES MEDICAS',
            cnes: '0086681'
          },
          {
            name: 'CENTRO DE CONTROLE DE ZOONOSES DE FOZ DO IGUACU',
            cnes: '7823673'
          },
          {
            name: 'USF SAO ROQUE ANAIR DOS SANTOS QUADROS',
            cnes: '9871314'
          },
          {
            name: 'DIRETORIA DE VIGILANCIA EM SAUDE',
            cnes: '2673177'
          },
          {
            name: 'CAPS INFANTIL DE FOZ DO IGUACU',
            cnes: '7181760'
          },
          {
            name: 'BANCO DE LEITE',
            cnes: '6990223'
          },
          {
            name: 'UNIDADE DE PRONTO ATENDIMENTO JOAO SAMEK',
            cnes: '6613136'
          },
          {
            name: 'ESCOLA M J COSTA VIANA CONSULTORIO PMFI',
            cnes: '3404501'
          },
          {
            name: 'PROGRAMA IST AIDS E HEPATITES VIRAIS',
            cnes: '0075477'
          },
          {
            name: 'CENTRO MUNICIPAL DE APOIO A TUBERCULOSE E HANSENIASE',
            cnes: '0043001'
          },
          {
            name: 'SAMU FOZ USA 01',
            cnes: '6028950'
          },
          {
            name: 'CAPS II',
            cnes: '3085015'
          },
          {
            name: 'CENTRAL DE REGULACAO DE URGENCIAS DE FOZ DO IGUACU',
            cnes: '6942792'
          },
          {
            name: 'UNIDADE DE SAUDE 24H PADRE ITALO PATERNOSTER',
            cnes: '0224251'
          },
          {
            name: 'CENTRAL DE ABASTECIMENTO FARMACEUTICO',
            cnes: '7846339'
          },
          {
            name: 'AMBULATORIO DE SAUDE MENTAL',
            cnes: '5973139'
          },
          {
            name: 'SAMU FOZ USB 04',
            cnes: '6999573'
          },
          {
            name: 'SAMU FOZ USB 05',
            cnes: '6999581'
          },
          {
            name: 'MOTOLANCIA FOZ 01',
            cnes: '6999603'
          },
          {
            name: 'DIRETORIA DE AUDITORIA E CONTROLE',
            cnes: '3756718'
          },
          {
            name: 'CENTRO DE ESPECIALIDADES ODONTOLOGICAS',
            cnes: '2593939'
          },
          {
            name: 'SAMU FOZ USB 01',
            cnes: '6968279'
          },
          {
            name: 'SAMU FOZ USB 02',
            cnes: '6968805'
          },
          {
            name: 'SAMU FOZ USB 03',
            cnes: '6968813'
          },
          {
            name: 'DIRETORIA DE SAUDE OCUPACIONAL',
            cnes: '0431893'
          },
          {
            name: 'UNIDADE DE SAUDE LAGOA DOURADA',
            cnes: '7367341'
          },
          {
            name: 'LABORATORIO REGIONAL DE PROTESE DENTARIA',
            cnes: '6473970'
          },
          {
            name: 'SIATE FOZ DO IGUACU',
            cnes: '2673746'
          },
          {
            name: 'AMBULATORIO MUN TRAT FERIDAS E ATEND ESP DR GODOFREDO M NETO',
            cnes: '4211707'
          }
        ]
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
