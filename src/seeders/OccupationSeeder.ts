import type { Dictionary, EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { OccupationCategory } from '@modules/health/occupation-category/entities/occupation-category.entity'

export class OccupationSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const entities = [
      {
        name: 'Profissionais de Saúde',
        occupations: [
          {
            name: 'Gerente de Serviços de Saúde',
            cbo: '131210'
          },
          {
            name: 'Médico da Estratégia de Saúde da Família',
            cbo: '225142'
          },
          {
            name: 'Agente Comunitário de Saúde',
            cbo: '515105'
          },
          {
            name: 'Agente de Ação Social',
            cbo: '515310'
          },
          {
            name: 'Agente de Combate às Endemias',
            cbo: '515140'
          },
          {
            name: 'Agente de Saúde Pública',
            cbo: '352210'
          },
          {
            name: 'Agente Indígena de Saneamento',
            cbo: '515130'
          },
          {
            name: 'Agente Indígena de Saúde',
            cbo: '515124'
          },
          {
            name: 'Arteterapeuta',
            cbo: '226310'
          },
          {
            name: 'Assistente Administrativo',
            cbo: '411010'
          },
          {
            name: 'Assistente Social',
            cbo: '251605'
          },
          {
            name: 'Auxiliar de Enfermagem',
            cbo: '322230'
          },
          {
            name: 'Auxiliar de Enfermagem da Estratégia de Saúde da Família',
            cbo: '322250'
          },
          {
            name: 'Auxiliar em Saúde Bucal',
            cbo: '322415'
          },
          {
            name: 'Auxiliar em Saúde Bucal da Estratégia de Saúde da Família',
            cbo: '322430'
          },
          {
            name: 'Cirurgião Dentista - Auditor',
            cbo: '223204'
          },
          {
            name: 'Cirurgião Dentista - Clínico Geral',
            cbo: '223208'
          },
          {
            name: 'Cirurgião Dentista - Dentística',
            cbo: '223280'
          },
          {
            name: 'Cirurgião Dentista - Disfunção Temporomandibular e Dor Orofacial',
            cbo: '223284'
          },
          {
            name: 'Cirurgião Dentista - Endodontista',
            cbo: '223212'
          },
          {
            name: 'Cirurgião Dentista - Epidemiologista',
            cbo: '223216'
          },
          {
            name: 'Cirurgião Dentista - Estomatologista',
            cbo: '223220'
          },
          {
            name: 'Cirurgião Dentista - Implantodontista',
            cbo: '223224'
          },
          {
            name: 'Cirurgião Dentista - Odontogeriatra',
            cbo: '223228'
          },
          {
            name: 'Cirurgião Dentista - Odontologia do Trabalho',
            cbo: '223276'
          },
          {
            name: 'Cirurgião Dentista - Odontologia para Pacientes com Necessidades Especiais',
            cbo: '223288'
          },
          {
            name: 'Cirurgião Dentista - Odontologista Legal',
            cbo: '223232'
          },
          {
            name: 'Cirurgião Dentista - Odontopediatra',
            cbo: '223236'
          },
          {
            name: 'Cirurgião Dentista - Ortopedista e Ortodontista',
            cbo: '223240'
          },
          {
            name: 'Cirurgião Dentista - Patologista Bucal',
            cbo: '223244'
          },
          {
            name: 'Cirurgião Dentista - Periodontista',
            cbo: '223248'
          },
          {
            name: 'Cirurgião Dentista - Protesiólogo Bucomaxilofacial',
            cbo: '223252'
          },
          {
            name: 'Cirurgião Dentista - Protesista',
            cbo: '223256'
          },
          {
            name: 'Cirurgião Dentista - Radiologista',
            cbo: '223260'
          },
          {
            name: 'Cirurgião Dentista - Reabilitador Oral',
            cbo: '223264'
          },
          {
            name: 'Cirurgião Dentista - Traumatologista Bucomaxilofacial',
            cbo: '223268'
          },
          {
            name: 'Cirurgião Dentista de Saúde Coletiva',
            cbo: '223272'
          },
          {
            name: 'Cirurgião-Dentista da Estratégia de Saúde da Família',
            cbo: '223293'
          },
          {
            name: 'Digitador',
            cbo: '412110'
          },
          {
            name: 'Diretor de Serviços de Saúde',
            cbo: '131205'
          },
          {
            name: 'Educador Social',
            cbo: '515305'
          },
          {
            name: 'Enfermeiro',
            cbo: '223505'
          },
          {
            name: 'Enfermeiro da Estratégia de Saúde da Família',
            cbo: '223565'
          },
          {
            name: 'Enfermeiro do Trabalho',
            cbo: '223530'
          },
          {
            name: 'Enfermeiro Obstétrico',
            cbo: '223545'
          },
          {
            name: 'Enfermeiro Psiquiátrico',
            cbo: '223550'
          },
          {
            name: 'Enfermeiro Puericultor e Pediátrico',
            cbo: '223555'
          },
          {
            name: 'Enfermeiro Sanitarista',
            cbo: '223560'
          },
          {
            name: 'Equoterapeuta',
            cbo: '226315'
          },
          {
            name: 'Farmacêutico',
            cbo: '223405'
          },
          {
            name: 'Farmacêutico Analista Clínico',
            cbo: '223415'
          },
          {
            name: 'Farmacêutico em Saúde Pública',
            cbo: '223430'
          },
          {
            name: 'Farmacêutico Hospitalar e Clínico',
            cbo: '223445'
          },
          {
            name: 'Farmacêutico Práticas Integrativas e Complementares',
            cbo: '223425'
          },
          {
            name: 'Fisioterapeuta Acupunturista',
            cbo: '223650'
          },
          {
            name: 'Fisioterapeuta Geral',
            cbo: '223605'
          },
          {
            name: 'Fonoaudiólogo',
            cbo: '223810'
          },
          {
            name: 'Médico Acupunturista',
            cbo: '225105'
          },
          {
            name: 'Médico Alergista e Imunologista',
            cbo: '225110'
          },
          {
            name: 'Médico Antroposófico',
            cbo: '225154'
          },
          {
            name: 'Médico Cardiologista',
            cbo: '225120'
          },
          {
            name: 'Médico Clínico',
            cbo: '225125'
          },
          {
            name: 'Médico de Família e Comunidade',
            cbo: '225130'
          },
          {
            name: 'Médico Dermatologista',
            cbo: '225135'
          },
          {
            name: 'Médico do Trabalho',
            cbo: '225140'
          },
          {
            name: 'Médico Endocrinologista e Metabologista',
            cbo: '225155'
          },
          {
            name: 'Médico Fisiatria',
            cbo: '225160'
          },
          {
            name: 'Médico Gastroenterologista',
            cbo: '225165'
          },
          {
            name: 'Médico Generalista',
            cbo: '225170'
          },
          {
            name: 'Médico Geriatra',
            cbo: '225180'
          },
          {
            name: 'Médico Ginecologista e Obstetra',
            cbo: '225250'
          },
          {
            name: 'Médico Hematologista',
            cbo: '225185'
          },
          {
            name: 'Médico Homeopata',
            cbo: '225195'
          },
          {
            name: 'Médico Infectologista',
            cbo: '225103'
          },
          {
            name: 'Médico Mastologista',
            cbo: '225255'
          },
          {
            name: 'Médico Nefrologista',
            cbo: '225109'
          },
          {
            name: 'Médico Neurofisiologista Clínico',
            cbo: '225350'
          },
          {
            name: 'Médico Neurologista',
            cbo: '225112'
          },
          {
            name: 'Médico Nutrólogo',
            cbo: '225118'
          },
          {
            name: 'Médico Oftalmologista',
            cbo: '225265'
          },
          {
            name: 'Médico Oncologista Clínico',
            cbo: '225121'
          },
          {
            name: 'Médico Ortopedista e Traumatologista',
            cbo: '225270'
          },
          {
            name: 'Médico Otorrinolaringologista',
            cbo: '225275'
          },
          {
            name: 'Médico Pediatra',
            cbo: '225124'
          },
          {
            name: 'Médico Pneumologista',
            cbo: '225127'
          },
          {
            name: 'Médico Psiquiatra',
            cbo: '225133'
          },
          {
            name: 'Médico Residente',
            cbo: '2231F9'
          },
          {
            name: 'Médico Reumatologista',
            cbo: '225136'
          },
          {
            name: 'Médico Sanitarista',
            cbo: '225139'
          },
          {
            name: 'Médico Urologista',
            cbo: '225285'
          },
          {
            name: 'Monitor de Teleatendimento',
            cbo: '422215'
          },
          {
            name: 'Musicoterapeuta',
            cbo: '226305'
          },
          {
            name: 'Naturólogo',
            cbo: '226320'
          },
          {
            name: 'Neuropsicólogo',
            cbo: '251545'
          },
          {
            name: 'Nutricionista',
            cbo: '223710'
          },
          {
            name: 'Operador de Rádio Chamada',
            cbo: '422220'
          },
          {
            name: 'Osteopata',
            cbo: '226110'
          },
          {
            name: 'Ouvidor',
            cbo: '142340'
          },
          {
            name: 'Pedagogo',
            cbo: '239415'
          },
          {
            name: 'Professor de Educação Física no Ensino Superior',
            cbo: '234410'
          },
          {
            name: 'Profissional de Educação Física na Saúde',
            cbo: '224140'
          },
          {
            name: 'Psicanalista',
            cbo: '251550'
          },
          {
            name: 'Psicólogo Acupunturista',
            cbo: '251555'
          },
          {
            name: 'Psicólogo Clínico',
            cbo: '251510'
          },
          {
            name: 'Psicólogo do Trabalho',
            cbo: '251540'
          },
          {
            name: 'Psicólogo Educacional',
            cbo: '251505'
          },
          {
            name: 'Psicólogo Social',
            cbo: '251530'
          },
          {
            name: 'Psicopedagogo',
            cbo: '239425'
          },
          {
            name: 'Quiropraxista',
            cbo: '226105'
          },
          {
            name: 'Recepcionista de Consultório Médico ou Dentário',
            cbo: '422110'
          },
          {
            name: 'Recepcionista, em Geral',
            cbo: '422105'
          },
          {
            name: 'Sanitarista',
            cbo: '1312C1'
          },
          {
            name: 'Sanitarista',
            cbo: '131225'
          },
          {
            name: 'Técnico de Enfermagem',
            cbo: '322205'
          },
          {
            name: 'Técnico de Enfermagem da Estratégia de Saúde da Família',
            cbo: '322245'
          },
          {
            name: 'Técnico de Enfermagem de Terapia Intensiva',
            cbo: '322210'
          },
          {
            name: 'Técnico em Saúde Bucal',
            cbo: '322405'
          },
          {
            name: 'Técnico em Saúde Bucal da Estratégia de Saúde da Família',
            cbo: '322425'
          },
          {
            name: 'Telefonista',
            cbo: '422205'
          },
          {
            name: 'Teleoperador',
            cbo: '422210'
          },
          {
            name: 'Terapeuta Ocupacional',
            cbo: '223905'
          },
          {
            name: 'Visitador Sanitário',
            cbo: '515120'
          }
        ]
      }
    ]

    context.directorship = entities.map((item) => {
      em.create(OccupationCategory, {
        ...item
      })
    })
  }
}
