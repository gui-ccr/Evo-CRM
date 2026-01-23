import { useState, useEffect } from 'react';

interface UploadProgress {
  progresso: number;
  status: 'processando' | 'concluido' | 'erro';
  arquivo: string;
  detalhes: {
    total: number;
    processados: number;
    novos: number;
    duplicados: number;
  };
}

export function useUploadProgress(file: File | null) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);

  useEffect(() => {
    if (!file) {
      setUploadProgress(null);
      return;
    }

    const total = Math.floor(Math.random() * 200) + 100;

    setUploadProgress({
      progresso: 0,
      status: 'processando',
      arquivo: file.name,
      detalhes: {
        total,
        processados: 0,
        novos: 0,
        duplicados: 0,
      },
    });

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (!prev) return null;

        const incremento = Math.floor(Math.random() * 15) + 5;
        const novoProgresso = Math.min(prev.progresso + incremento, 100);
        const processados = Math.floor((novoProgresso / 100) * total);
        const novos = Math.floor(processados * 0.85);
        const duplicados = processados - novos;

        if (novoProgresso >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            progresso: 100,
            status: 'concluido',
            detalhes: {
              total,
              processados: total,
              novos,
              duplicados,
            },
          };
        }

        return {
          ...prev,
          progresso: novoProgresso,
          detalhes: {
            total,
            processados,
            novos,
            duplicados,
          },
        };
      });
    }, 800);

    return () => clearInterval(interval);
  }, [file]);

  const resetProgress = () => {
    setUploadProgress(null);
  };

  return { uploadProgress, resetProgress };
}
