import { TrendingUp } from 'lucide-react';

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

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.leads, d.vendas))
  );

  const createPath = (values: number[], color: string) => {
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - (value / maxValue) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    );
  };

  const leadsValues = data.map(d => d.leads);
  const vendasValues = data.map(d => d.vendas);

  const totalLeads = data.reduce((sum, d) => sum + d.leads, 0);
  const totalVendas = data.reduce((sum, d) => sum + d.vendas, 0);
  const taxaConversao = ((totalVendas / totalLeads) * 100).toFixed(1);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-evo-indigo">{title}</h3>
          <p className="text-sm text-evo-dark-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <TrendingUp size={20} />
          <span className="text-sm font-medium">Taxa: {taxaConversao}%</span>
        </div>
      </div>

      <div className="mb-6">
        <svg
          viewBox="0 0 100 60"
          className="w-full h-64"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="leadsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="vendasGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
            </linearGradient>
          </defs>

          {createPath(leadsValues, '#4ECDC4')}
          {createPath(vendasValues, '#FF6B35')}

          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100;
            const yLeads = 100 - (point.leads / maxValue) * 100;
            const yVendas = 100 - (point.vendas / maxValue) * 100;

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={yLeads}
                  r="0.8"
                  fill="#4ECDC4"
                  className="hover:r-1.5 transition-all cursor-pointer"
                />
                <circle
                  cx={x}
                  cy={yVendas}
                  r="0.8"
                  fill="#FF6B35"
                  className="hover:r-1.5 transition-all cursor-pointer"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-8 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-evo-cyan"></div>
          <span className="text-sm text-evo-dark-400">Novos Leads</span>
          <span className="text-sm font-bold text-evo-indigo">{totalLeads}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-evo-orange"></div>
          <span className="text-sm text-evo-dark-400">Vendas</span>
          <span className="text-sm font-bold text-evo-indigo">{totalVendas}</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-evo-dark-400 px-2">
        {data.map((point, index) => (
          <span key={index}>{point.dia}</span>
        ))}
      </div>
    </div>
  );
}
