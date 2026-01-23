import type { Sale } from '../../shared/types';

interface PaymentBadgeProps {
  method: Sale['paymentMethod'];
}

const paymentLabels = {
  cash: 'À Vista',
  financing: 'Financiamento',
  leasing: 'Leasing',
};

export function PaymentBadge({ method }: PaymentBadgeProps) {
  return <span className="text-sm text-zinc-300">{paymentLabels[method]}</span>;
}
