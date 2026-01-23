export type ImportacaoStatus = 'concluido' | 'processando' | 'erro';

export interface Importacao {
  id: string;
  nomeArquivo: string;
  dataUpload: string;
  qtdLeadsNovos: number;
  qtdLeadsDuplicados: number;
  status: ImportacaoStatus;
}
