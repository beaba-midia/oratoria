/**
 * ==========================================================================
 * LINK DE CHECKOUT (KIWIFY)
 * Troque o valor abaixo pelo link real assim que o checkout estiver ativo.
 * Todos os botões de CTA usam esta constante.
 * ==========================================================================
 */
export const CHECKOUT_URL = '[LINK-KIWIFY-PENDENTE]'

export type HeroContent = {
  headline: string
  subheadline: string
  pain: string
}

/** Conteúdo do hero por rota (teste A/B). */
export const heroContent: Record<'vendas' | 'lideranca', HeroContent> = {
  vendas: {
    headline: 'Você não perdeu a venda pro preço. Perdeu porque falou mal.',
    subheadline:
      'Domine a oratória e feche mais negócios com a Oratória Suprema. 17 de outubro, Macaé. Imersão com vagas limitadas.',
    pain: 'Sua proposta era melhor. Seu produto era melhor. Mesmo assim ele fechou com o concorrente. Não foi o preço. Foi a reunião. Isso custa comissão todo mês até você resolver como fala, não o que vende.',
  },
  lideranca: {
    headline: 'Cargo de líder você já tem. Respeito, ainda não.',
    subheadline:
      'Domine a comunicação que transforma cargo em autoridade real. 17 de outubro, Macaé. Imersão com vagas limitadas.',
    pain: 'Reunião de segunda, mesma pauta, ninguém executa. Não é falta de time bom. É liderança que não sabe comunicar. Autoridade não vem do cargo, vem de como você fala. E isso se repete toda semana até você resolver na raiz.',
  },
}

export const CTA_LABEL = 'Garantir minha vaga'

export const audienceFit = [
  'Quem trava na hora de falar em público',
  'Empreendedores e empresários',
  'Líderes e gestores',
  'Profissionais de vendas e marketing',
  'Políticos e líderes comunitários',
]

export const audienceNotFit = [
  'Quem quer fórmula mágica sem treinar — técnica se aplica, não se decora',
  'Quem procura motivação de um dia e não muda comportamento na segunda-feira',
  'Quem não topa ser visto e corrigido na frente do grupo — a imersão é prática',
  'Quem acha que carisma é dom e não técnica',
]

export const curriculum = [
  'Técnicas avançadas de expressão verbal e corporal',
  'Técnicas avançadas de persuasão (Ethos, Logos e Pathos)',
  'Controle da voz',
  'Técnicas de PNL para gestão do nervosismo',
  'Estruturação de discursos envolventes e memoráveis',
  'Como vencer o medo e a ansiedade de falar em público',
]

export const eventDetails = [
  { label: 'Data', value: '17 de outubro de 2026' },
  { label: 'Horário', value: '08:30h às 19h' },
  { label: 'Local', value: 'Paradiso Hotel, Macaé/RJ' },
]

export const contact = {
  phones: ['(22) 99725-9403', '(22) 99767-6717'],
  email: 'jotaremedios@gmail.com',
  instagram: '@jotaremedios',
  instagramUrl: 'https://instagram.com/jotaremedios',
  whatsappUrl: 'https://wa.me/5522997259403',
}
