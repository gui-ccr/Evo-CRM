import { TrendingUp } from 'lucide-react';

interface SalesChartProps {
  title?: string;
  subtitle?: string;
}

export function SalesChart({
  title = "Vendas dos Últimos 6 Meses",
  subtitle = "Comparativo mensal"
}: SalesChartProps) {
  const months = ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'];
  const values = [850000, 920000, 1050000, 980000, 1100000, 1200000];
  const maxValue = Math.max(...values);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-evo-dark-50">{title}</h3>
          <p className="text-sm text-evo-dark-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <TrendingUp size={20} />
          <span className="text-sm font-medium">+24% vs semestre anterior</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 h-48">
        {months.map((month, index) => {
          const height = (values[index] / maxValue) * 100;
          return (
            <div key={month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-40">
                <div
                  className="w-full bg-gradient-to-t from-evo-orange to-evo-coral rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-200 text-evo-dark-50 text-xs px-2 py-1 rounded whitespace-nowrap border border-evo-purple/20">
                    R$ {(values[index] / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-evo-dark-400">{month}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-evo-purple/20 flex items-center justify-between text-sm">
        <div>
          <span className="text-evo-dark-400">Média mensal: </span>
          <span className="font-semibold text-evo-dark-50">
            R$ {(values.reduce((a, b) => a + b, 0) / values.length / 1000).toFixed(0)}K
          </span>
        </div>
        <div>
          <span className="text-evo-dark-400">Total no período: </span>
          <span className="font-semibold text-evo-dark-50">
            R$ {(values.reduce((a, b) => a + b, 0) / 1000000).toFixed(1)}M
          </span>
        </div>
      </div>
    </div>
  );
}
