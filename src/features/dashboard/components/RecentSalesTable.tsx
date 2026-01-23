import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { StatusBadge } from './StatusBadge';
import { PaymentBadge } from './PaymentBadge';
import type { Sale } from '../../shared/types';

interface RecentSalesTableProps {
  sales: Sale[];
}

export function RecentSalesTable({ sales }: RecentSalesTableProps) {
  if (sales.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400">
        <p className="text-sm sm:text-base">Nenhuma venda registrada ainda.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile view - Cards */}
      <div className="block lg:hidden space-y-3">
        {sales.map((sale) => (
          <div
            key={sale.id}
            className="bg-zinc-700/30 rounded-lg p-4 space-y-3 border border-zinc-700/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-evo-dark-50 text-sm">{sale.customerName}</div>
                <div className="text-xs text-zinc-900 mt-1">{formatDate(sale.saleDate)}</div>
              </div>
              <StatusBadge status={sale.status} />
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-xs text-zinc-400">Mentoria</div>
                <div className="text-sm font-medium text-evo-dark-50">{sale.mentoriaModel}</div>
                <div className="text-xs text-zinc-900">{sale.mentoriaBrand}</div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-zinc-700/50">
                <div>
                  <div className="text-xs text-zinc-400">Pagamento</div>
                  <PaymentBadge method={sale.paymentMethod} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-zinc-400 mb-1">Valor</div>
                  <div className="font-bold text-emerald-400">{formatCurrency(sale.amount)}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Cliente</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Mentoria</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Data</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Valor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Pagamento</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr
                key={sale.id}
                className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition-colors"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-evo-dark-50">{sale.customerName}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium text-evo-dark-50">{sale.mentoriaModel}</div>
                  <div className="text-sm text-zinc-900">{sale.mentoriaBrand}</div>
                </td>
                <td className="py-4 px-4 text-sm text-zinc-900">
                  {formatDate(sale.saleDate)}
                </td>
                <td className="py-4 px-4 font-semibold text-emerald-400">
                  {formatCurrency(sale.amount)}
                </td>
                <td className="py-4 px-4 ">
                  <PaymentBadge method={sale.paymentMethod} />
                </td>
                <td className="py-4 px-4">
                  <StatusBadge status={sale.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
