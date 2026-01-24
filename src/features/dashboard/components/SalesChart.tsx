import { TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  title?: string;
  subtitle?: string;
}

export function SalesChart({
  title = "Vendas dos Últimos 6 Meses",
  subtitle = "Comparativo mensal"
}: SalesChartProps) {
  const months = ['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro'];
  const values = [850000, 920000, 1050000, 980000, 1100000, 1200000];

  const totalVendas = values.reduce((a, b) => a + b, 0);
  const mediaVendas = totalVendas / values.length;

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Vendas (R$)',
        data: values,
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(99, 102, 241, 0.9)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(99, 102, 241, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 41, 107, 0.95)',
        padding: 12,
        titleFont: {
          size: 14,
          family: 'DM Sans',
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
          family: 'DM Sans',
        },
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            return `R$ ${(value / 1000).toFixed(0)}K`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'DM Sans',
          },
          color: '#64748b',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 41, 107, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'DM Sans',
          },
          color: '#64748b',
          callback: function(value: any) {
            return `R$ ${(value / 1000).toFixed(0)}K`;
          }
        },
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-zinc-400">{title}</h3>
          <p className="text-xs sm:text-sm text-zinc-600">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
          <TrendingUp size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">+24% vs semestre anterior</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 lg:h-80 mb-4">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-zinc-600">Média mensal:</span>
          <span className="font-semibold text-sm sm:text-base text-indigo-500">
            R$ {(mediaVendas / 1000).toFixed(0)}K
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-zinc-600">Total no período:</span>
          <span className="font-semibold text-sm sm:text-base text-indigo-500">
            R$ {(totalVendas / 1000000).toFixed(2)}M
          </span>
        </div>
      </div>
    </div>
  );
}
