export type ClienteStatus = 'ativo' | 'inativo' | 'pendente' | 'lead';

export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  status: ClienteStatus;
  origem: string;
  valorTotal: number;
  ultimaInteracao: string;
}

export interface ClienteStats {
  total: number;
  ativos: number;
  novosEsteMes: number;
  conversao: string;
}
