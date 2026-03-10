import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../../shared/utils/formatters';
import { StatusBadge } from './StatusBadge';
import { PaymentBadge } from './PaymentBadge';
import { useLayoutTheme } from '../../shared/layout/ThemeContext';
import type { Sale } from '../../shared/types';

const PAGE_SIZE = 10;

interface RecentSalesTableProps {
  sales: Sale[];
}

export function RecentSalesTable({ sales }: RecentSalesTableProps) {
  const [page, setPage] = useState(1);
  const theme = useLayoutTheme();

  if (sales.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: theme.cardTitleColor }}>
        <p className="text-sm sm:text-base">Nenhuma venda registrada ainda.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(sales.length / PAGE_SIZE);
  const paginated = sales.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Mobile view - Cards */}
      <div className="block lg:hidden space-y-3">
        {paginated.map((sale) => (
          <div
            key={sale.id}
            className="rounded-lg p-4 space-y-3 border"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-sm" style={{ color: theme.cardTitleColor }}>{sale.customerName}</div>
                <div className="text-xs mt-1" style={{ color: theme.cardTitleColor }}>{formatDate(sale.saleDate)}</div>
              </div>
              <StatusBadge status={sale.status} />
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-xs" style={{ color: theme.cardTitleColor }}>Mentoria</div>
                <div className="text-sm font-medium" style={{ color: theme.cardTitleColor }}>{sale.mentoriaModel}</div>
                <div className="text-xs" style={{ color: theme.cardTitleColor }}>{sale.mentoriaBrand}</div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: theme.cardBorder }}>
                <div>
                  <div className="text-xs" style={{ color: theme.cardTitleColor }}>Pagamento</div>
                  <PaymentBadge method={sale.paymentMethod} />
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color: theme.cardTitleColor }}>Valor</div>
                  <div className="font-bold text-emerald-500">{formatCurrency(sale.amount)}</div>
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
            <tr className="border-b" style={{ borderColor: theme.cardBorder }}>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.cardTitleColor }}>Cliente</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.cardTitleColor }}>Mentoria</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.cardTitleColor }}>Data</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.cardTitleColor }}>Valor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.cardTitleColor }}>Pagamento</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.cardTitleColor }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((sale) => (
              <tr
                key={sale.id}
                className="border-b hover:bg-gray-100 transition-colors"
                style={{ borderColor: theme.cardBorder }}
              >
                <td className="py-4 px-4">
                  <div className="font-medium" style={{ color: theme.cardTitleColor }}>{sale.customerName}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium" style={{ color: theme.cardTitleColor }}>{sale.mentoriaModel}</div>
                  <div className="text-sm" style={{ color: theme.cardTitleColor }}>{sale.mentoriaBrand}</div>
                </td>
                <td className="py-4 px-4 text-sm" style={{ color: theme.cardTitleColor }}>
                  {formatDate(sale.saleDate)}
                </td>
                <td className="py-4 px-4 font-semibold text-emerald-500">
                  {formatCurrency(sale.amount)}
                </td>
                <td className="py-4 px-4">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 mt-2 border-t" style={{ borderColor: theme.cardBorder }}>
          <span className="text-xs" style={{ color: theme.cardTitleColor }}>
            Página {page} de {totalPages} · {sales.length} registros
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              style={{ color: theme.cardTitleColor }}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-sm rounded-lg transition-colors cursor-pointer ${
                  p === page
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                style={p !== page ? { color: theme.cardTitleColor } : undefined}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              style={{ color: theme.cardTitleColor }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
