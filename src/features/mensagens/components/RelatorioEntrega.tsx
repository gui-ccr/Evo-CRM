import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface EntregaStats {
  entregues: number;
  lidos: number;
  erros: number;
  total: number;
}

interface RelatorioEntregaProps {
  stats: EntregaStats;
}

export function RelatorioEntrega({ stats }: RelatorioEntregaProps) {
  const percentualEntregues = ((stats.entregues / stats.total) * 100).toFixed(1);
  const percentualLidos = ((stats.lidos / stats.total) * 100).toFixed(1);
  const percentualErros = ((stats.erros / stats.total) * 100).toFixed(1);

  const chartData = {
    labels: ['Entregues', 'Lidos', 'Erros'],
    datasets: [
      {
        label: 'Mensagens',
        data: [stats.entregues, stats.lidos, stats.erros],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Emerald
          'rgba(59, 130, 246, 0.8)', // Blue
          'rgba(239, 68, 68, 0.8)', // Red
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 41, 107, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          family: 'DM Sans',
        },
        bodyFont: {
          size: 13,
          family: 'DM Sans',
        },
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = ((value / stats.total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-evo-indigo mb-4 sm:mb-6">
        Relatório de Entrega - Últimos 30 Dias
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Gráfico de Pizza */}
        <div className="flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-evo-dark-400">Entregues</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-evo-indigo">{stats.entregues}</p>
            </div>
            <div className="text-right">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-500">{percentualEntregues}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Eye className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-evo-dark-400">Lidos / Abertos</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-evo-indigo">{stats.lidos}</p>
            </div>
            <div className="text-right">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-500">{percentualLidos}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <XCircle className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-evo-dark-400">Erros / Números Inválidos</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-evo-indigo">{stats.erros}</p>
            </div>
            <div className="text-right">
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-500">{percentualErros}%</p>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-evo-orange/10 border border-evo-orange/20 rounded-lg mt-2 sm:mt-4">
            <p className="text-xs sm:text-sm text-evo-orange">
              <strong>Taxa de Sucesso:</strong> {((stats.lidos / stats.entregues) * 100).toFixed(1)}% dos entregues foram lidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
