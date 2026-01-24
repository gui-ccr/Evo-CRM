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
}

interface DataPoint {
  dia: string;
  leads: number;
  vendas: number;
}

export function LeadsVendasChart({
  title = "Leads vs Vendas - Últimos 30 Dias",
  subtitle = "Acompanhamento diário"
}: LeadsVendasChartProps) {
  const data: DataPoint[] = [
    { dia: '01', leads: 45, vendas: 8 },
    { dia: '05', leads: 52, vendas: 12 },
    { dia: '10', leads: 38, vendas: 7 },
    { dia: '15', leads: 65, vendas: 15 },
    { dia: '20', leads: 58, vendas: 11 },
    { dia: '25', leads: 72, vendas: 18 },
    { dia: '30', leads: 68, vendas: 14 },
  ];

  const totalLeads = data.reduce((sum, d) => sum + d.leads, 0);
  const totalVendas = data.reduce((sum, d) => sum + d.vendas, 0);
  const taxaConversao = ((totalVendas / totalLeads) * 100).toFixed(1);

  const chartData = {
    labels: data.map(d => `Dia ${d.dia}`),
    datasets: [
      {
        label: 'Novos Leads',
        data: data.map(d => d.leads),
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
        label: 'Vendas Concluídas',
        data: data.map(d => d.vendas),
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
          text: 'Leads',
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
          text: 'Vendas',
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
          <span className="text-xs sm:text-sm font-medium">Taxa de Conversão: {taxaConversao}%</span>
        </div>
      </div>

      <div className="h-64 sm:h-72 lg:h-80 mb-4">
        <Line data={chartData} options={options} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-zinc-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-evo-cyan"></div>
          <span className="text-xs sm:text-sm text-zinc-600">Total de Leads</span>
          <span className="text-sm sm:text-base font-bold text-indigo-500">{totalLeads}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-500"></div>
          <span className="text-xs sm:text-sm text-zinc-600">Total de Vendas</span>
          <span className="text-sm sm:text-base font-bold text-indigo-500">{totalVendas}</span>
        </div>
      </div>
    </div>
  );
}
