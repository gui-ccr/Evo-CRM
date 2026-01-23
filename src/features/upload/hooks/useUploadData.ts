import type { Importacao } from '../types';

export function useUploadData() {
  const importacoes: Importacao[] = [
    {
      id: '1',
      nomeArquivo: 'leads_evento_sp_novembro.xlsx',
      dataUpload: new Date(2025, 10, 25, 14, 30).toISOString(),
      qtdLeadsNovos: 156,
      qtdLeadsDuplicados: 12,
      status: 'concluido',
    },
    {
      id: '2',
      nomeArquivo: 'leads_landing_page_outubro.csv',
      dataUpload: new Date(2025, 10, 20, 9, 15).toISOString(),
      qtdLeadsNovos: 89,
      qtdLeadsDuplicados: 5,
      status: 'concluido',
    },
    {
      id: '3',
      nomeArquivo: 'leads_instagram_ads.xlsx',
      dataUpload: new Date(2025, 10, 18, 16, 45).toISOString(),
      qtdLeadsNovos: 0,
      qtdLeadsDuplicados: 0,
      status: 'processando',
    },
    {
      id: '4',
      nomeArquivo: 'leads_evento_rj_outubro.csv',
      dataUpload: new Date(2025, 10, 15, 11, 20).toISOString(),
      qtdLeadsNovos: 203,
      qtdLeadsDuplicados: 18,
      status: 'concluido',
    },
  ];

  return { importacoes };
}
