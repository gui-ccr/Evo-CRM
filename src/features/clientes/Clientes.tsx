import { Card } from '../shared/components/Card';
import { ClientesHeader } from './components/ClientesHeader';
import { ClientesStats } from './components/ClientesStats';
import { ClientesTable } from './components/ClientesTable';
import { useClientesData } from './hooks/useClientesData';

export function Clientes() {
  const { clientes, stats } = useClientesData();

  const handleAddClient = () => {
    console.log('Adicionar novo cliente');
  };

  return (
    <div className="p-8 space-y-8 bg-evo-cyan-100 min-h-screen">
      <ClientesHeader onAddClient={handleAddClient} />

      <ClientesStats stats={stats} />

      <Card title="Lista de Clientes">
        <ClientesTable clientes={clientes} />
      </Card>
    </div>
  );
}
