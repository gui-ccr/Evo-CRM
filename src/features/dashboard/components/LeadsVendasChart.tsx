import { TrendingUp } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '../../shared/utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LeadsVendasChartProps {
  title?: string;
  subtitle?: string;
  labels?: string[];
  transacoes?: number[];
  valores?: number[];
}

export function LeadsVendasChart({
  title = "Transações vs Comissão - Mensal",
  subtitle = "Acompanhamento mensal",
  labels: propLabels,
  transacoes: propTransacoes,
  valores: propValores,
}: LeadsVendasChartProps) {
  const labels = propLabels || ['01', '05', '10', '15', '20', '25', '30'];
  const transacoesData = propTransacoes || [45, 52, 38, 65, 58, 72, 68];
  const valoresData = propValores || [8000, 12000, 7000, 15000, 11000, 18000, 14000];

  const totalTransacoes = transacoesData.reduce((sum, d) => sum + d, 0);
  const totalValor = valoresData.reduce((sum, d) => sum + d, 0);
  const mediaTransacoes = transacoesData.length > 0 ? (totalTransacoes / transacoesData.length).toFixed(0) : '0';

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Transações',
        data: transacoesData,
        borderColor: 'rgb(78, 205, 196)',
        backgroundColor: 'rgba(78, 205, 196, 0.1)',
        yAxisID: 'y',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(78, 205, 196)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Comissão (R$)',
        data: valoresData,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        yAxisID: 'y1',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: 'DM Sans',
          },
          color: '#00296B',
          usePointStyle: true,
          pointStyle: 'circle',
        },
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
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('Comissão')) {
              return `${label}: ${formatCurrency(value)}`;
            }
            return `${label}: ${value}`;
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
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Transações',
          font: {
            size: 12,
            family: 'DM Sans',
            weight: 'bold' as const,
          },
          color: 'rgb(78, 205, 196)',
        },
        grid: {
          color: 'rgba(0, 41, 107, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'DM Sans',
          },
          color: '#64748b',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Comissão (R$)',
          font: {
            size: 12,
            family: 'DM Sans',
            weight: 'bold' as const,
          },
          color: 'rgb(99, 102, 241)',
        },
        grid: {
          drawOnChartArea: false,
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
          <TrendingUp size={18} className="sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm font-medium">Média: {mediaTransacoes} tx/semana</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 lg:h-80 mb-4">
        <Line data={chartData} options={options} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-zinc-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-evo-cyan"></div>
          <span className="text-xs sm:text-sm text-zinc-600">Total Transações</span>
          <span className="text-sm sm:text-base font-bold text-indigo-500">{totalTransacoes}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-500"></div>
          <span className="text-xs sm:text-sm text-zinc-600">Total Comissão</span>
          <span className="text-sm sm:text-base font-bold text-indigo-500">{formatCurrency(totalValor)}</span>
        </div>
      </div>
    </div>
  );
}
