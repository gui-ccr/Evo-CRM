export type LeadTemperatura = 'quente' | 'morno' | 'frio';
export type LeadOrigem = 'Evento SP - Novembro' | 'Evento RJ - Outubro' | 'Landing Page' | 'Instagram' | 'Indicação' | 'Lançamento Digital';
export type LeadStatus = 'novo' | 'contatado' | 'interessado' | 'negociacao' | 'convertido' | 'perdido';

export interface LeadCRM {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem: LeadOrigem;
  status: LeadStatus;
  temperatura: LeadTemperatura;
  score: number;
  dataCadastro: string;
  ultimaInteracao: string;
  clicouLink: boolean;
  valorPotencial: number;
}

export interface FiltrosCRM {
  origem?: LeadOrigem[];
  status?: LeadStatus[];
  temperatura?: LeadTemperatura[];
  scoreMinimo?: number;
  apenasQuentes?: boolean;
}
