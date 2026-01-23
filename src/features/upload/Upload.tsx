import { useState } from 'react';
import { Card } from '../shared/components/Card';
import { UploadHeader } from './components/UploadHeader';
import { UploadZone } from './components/UploadZone';
import { ProgressBar } from './components/ProgressBar';
import { ImportacoesTable } from './components/ImportacoesTable';
import { useUploadData } from './hooks/useUploadData';
import { useUploadProgress } from './hooks/useUploadProgress';

export function Upload() {
  const { importacoes } = useUploadData();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadProgress, resetProgress } = useUploadProgress(selectedFile);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleNovoUpload = () => {
    resetProgress();
    setSelectedFile(null);
  };

  return (
    <div className="p-8 space-y-8 bg-evo-cyan-100 min-h-screen">
      <UploadHeader />

      {!uploadProgress ? (
        <Card title="Nova Importação">
          <UploadZone onFileSelect={handleFileSelect} />
        </Card>
      ) : (
        <Card title="Processamento em Tempo Real">
          <ProgressBar
            progresso={uploadProgress.progresso}
            status={uploadProgress.status}
            arquivo={uploadProgress.arquivo}
            detalhes={uploadProgress.detalhes}
          />
          {uploadProgress.status === 'concluido' && (
            <div className="mt-6 text-center">
              <button
                onClick={handleNovoUpload}
                className="px-6 py-3 bg-evo-orange text-black font-semibold rounded-lg hover:bg-evo-coral transition-colors"
              >
                Fazer Novo Upload
              </button>
            </div>
          )}
        </Card>
      )}

      <Card title="Histórico de Importações">
        <ImportacoesTable importacoes={importacoes} />
      </Card>
    </div>
  );
}
