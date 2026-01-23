import { CheckCircle, XCircle, Eye } from 'lucide-react';

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

  const data = [
    { label: 'Entregues', value: stats.entregues, color: '#10B981', percentage: percentualEntregues },
    { label: 'Lidos', value: stats.lidos, color: '#3B82F6', percentage: percentualLidos },
    { label: 'Erros', value: stats.erros, color: '#EF4444', percentage: percentualErros },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const startAngle = (cumulativePercentage * 360) / 100;
    const endAngle = ((cumulativePercentage + percentage) * 360) / 100;
    cumulativePercentage += percentage;

    const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180));
    const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180));
    const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180));
    const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180));

    const largeArcFlag = percentage > 50 ? 1 : 0;

    const pathData = [
      `M 50 50`,
      `L ${startX} ${startY}`,
      `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z',
    ].join(' ');

    return {
      pathData,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage: item.percentage,
    };
  });

  return (
    <div>
      <h3 className="text-lg font-semibold text-evo-indigo mb-6">
        Relatório de Entrega - Últimos 30 Dias
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <div className="relative w-80 h-80">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {segments.map((segment, index) => (
                <g key={index}>
                  <path
                    d={segment.pathData}
                    fill={segment.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </g>
              ))}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-evo-indigo">{stats.total}</p>
                <p className="text-sm text-evo-dark-400">Total Enviados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-lg">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-evo-dark-400">Entregues</p>
              <p className="text-2xl font-bold text-evo-indigo">{stats.entregues}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-500">{percentualEntregues}%</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-lg">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Eye className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-evo-dark-400">Lidos / Abertos</p>
              <p className="text-2xl font-bold text-evo-indigo">{stats.lidos}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-500">{percentualLidos}%</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <XCircle className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-evo-dark-400">Erros / Números Inválidos</p>
              <p className="text-2xl font-bold text-evo-indigo">{stats.erros}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-500">{percentualErros}%</p>
            </div>
          </div>

          <div className="p-4 bg-evo-orange/10 border border-evo-orange/20 rounded-lg mt-4">
            <p className="text-sm text-evo-orange">
              <strong>Taxa de Sucesso:</strong> {((stats.lidos / stats.entregues) * 100).toFixed(1)}% dos entregues foram lidos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
