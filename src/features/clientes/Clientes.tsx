import { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Card } from '../shared/components/Card';
import { ClientesHeader } from './components/ClientesHeader';
import { ClientesStats } from './components/ClientesStats';
import { ClientesTable } from './components/ClientesTable';
import { ClienteModal } from './components/ClienteModal';
import { useClientesData } from './hooks/useClientesData';
import type { Cliente } from './types';

const PER_PAGE = 10;

export function Clientes() {
  const { clientes, stats, searchQuery, setSearchQuery } = useClientesData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('edit');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('');

  const totalPages = Math.max(1, Math.ceil(clientes.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  // Reseta para página 1 quando a busca muda
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    setPageInput('');
  };

  const paginatedClientes = useMemo(() => {
    const page = Math.min(currentPage, Math.max(1, Math.ceil(clientes.length / PER_PAGE)));
    const start = (page - 1) * PER_PAGE;
    return clientes.slice(start, start + PER_PAGE);
  }, [clientes, currentPage]);

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
    setPageInput('');
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const num = parseInt(pageInput, 10);
      if (!isNaN(num)) {
        goToPage(num);
      }
    }
  };

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
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar por nome ou email..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-300/50 border border-zinc-600 text-zinc-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <p className="text-xs text-zinc-600 mt-2">
            {clientes.length} cliente{clientes.length !== 1 ? 's' : ''} encontrado{clientes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <ClientesTable clientes={paginatedClientes} onEdit={handleEditCliente} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 mt-4 border-t border-zinc-600">
            <p className="text-xs text-zinc-600">
              Mostrando {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, clientes.length)} de {clientes.length}
            </p>

            <div className="flex items-center gap-1.5">
              {/* First */}
              <button
                onClick={() => goToPage(1)}
                disabled={safePage === 1}
                className="p-1.5 rounded-md border border-zinc-600 text-zinc-800 hover:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronsLeft size={16} />
              </button>
              {/* Prev */}
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="p-1.5 rounded-md border border-zinc-600 text-zinc-800 hover:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page input */}
              <div className="flex items-center gap-1.5 px-2">
                <span className="text-xs text-zinc-600">Página</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={pageInput || safePage}
                  onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={handlePageInputKeyDown}
                  onBlur={() => {
                    const num = parseInt(pageInput, 10);
                    if (!isNaN(num)) goToPage(num);
                    else setPageInput('');
                  }}
                  onFocus={() => setPageInput(String(safePage))}
                  className="w-12 text-center text-sm font-medium text-zinc-900 bg-zinc-300/50 border border-zinc-600 rounded-md py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <span className="text-xs text-zinc-600">de {totalPages}</span>
              </div>

              {/* Next */}
              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-md border border-zinc-600 text-zinc-800 hover:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
              {/* Last */}
              <button
                onClick={() => goToPage(totalPages)}
                disabled={safePage === totalPages}
                className="p-1.5 rounded-md border border-zinc-600 text-zinc-800 hover:border-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
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
