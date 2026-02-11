export type Stat = {
  id: string;
  label: string;
  value: string | number;
  trend?: string;
  trendPositive?: boolean;
  icon: string;
};

export type QuickStat = {
  label: string;
  value: string;
  description: string;
};

export type Sale = {
  id: string;
  customerName: string;
  mentoriaModel: string;
  mentoriaBrand: string;
  saleDate: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: 'cash' | 'financing' | 'leasing' | 'pix' | 'cartao' | 'maquina';
};

export type Alert = {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
};

export type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string;
  status: 'ativo' | 'inativo' | 'pendente';
  origem: string;
  valorTotal: number;
  ultimaInteracao: string;
};

export type Importacao = {
  id: string;
  nomeArquivo: string;
  dataUpload: string;
  qtdLeadsNovos: number;
  qtdLeadsDuplicados: number;
  status: 'concluido' | 'processando' | 'erro';
};
