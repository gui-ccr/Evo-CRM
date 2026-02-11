import type { Sale } from '../../shared/types';

interface PaymentBadgeProps {
  method: Sale['paymentMethod'];
}

const paymentLabels: Record<string, string> = {
  cash: 'À Vista',
  financing: 'Financiamento',
  leasing: 'Leasing',
  pix: 'PIX',
  cartao: 'Cartão de Crédito',
  maquina: 'Máquina de Cartão',
};

export function PaymentBadge({ method }: PaymentBadgeProps) {
  return <span className="text-sm text-zinc-900">{paymentLabels[method] || method}</span>;
}
