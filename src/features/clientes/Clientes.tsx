import { useState } from 'react';
import { Card } from '../shared/components/Card';
import { ClientesHeader } from './components/ClientesHeader';
import { ClientesStats } from './components/ClientesStats';
import { ClientesTable } from './components/ClientesTable';
import { ClienteModal } from './components/ClienteModal';
import { useClientesData } from './hooks/useClientesData';
import type { Cliente } from './types';

export function Clientes() {
  const { clientes, stats } = useClientesData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('edit');

  const handleAddClient = () => {
    setModalMode('add');
    setSelectedCliente(null);
    setIsModalOpen(true);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setModalMode('edit');
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleSaveCliente = (cliente: Partial<Cliente>) => {
    if (modalMode === 'add') {
      console.log('Novo cliente adicionado:', cliente);
    } else {
      console.log('Cliente atualizado:', cliente);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-zinc-900 min-h-screen">
      <ClientesHeader onAddClient={handleAddClient} />

      <ClientesStats stats={stats} />

      <Card title="Lista de Clientes">
        <ClientesTable clientes={clientes} onEdit={handleEditCliente} />
      </Card>

      <ClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cliente={selectedCliente}
        onSave={handleSaveCliente}
        mode={modalMode}
      />
    </div>
  );
}
