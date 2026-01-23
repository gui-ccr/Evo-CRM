export type TemplateType = 'whatsapp' | 'email';
export type DisparoStatus = 'agendado' | 'enviando' | 'concluido' | 'erro';

export interface Template {
  id: string;
  nome: string;
  tipo: TemplateType;
  assunto?: string;
  mensagem: string;
  variaveis: string[];
}

export interface Disparo {
  id: string;
  nome: string;
  tipo: TemplateType;
  dataAgendamento: string;
  qtdDestinatarios: number;
  qtdEnviados: number;
  qtdErros: number;
  status: DisparoStatus;
}
