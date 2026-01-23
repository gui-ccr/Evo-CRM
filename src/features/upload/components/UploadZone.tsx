import { Upload, FileSpreadsheet } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-evo-purple/30 rounded-xl p-12 text-center hover:border-evo-orange transition-colors cursor-pointer bg-zinc-200"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-evo-orange/10 rounded-full flex items-center justify-center">
          <Upload className="text-evo-orange" size={32} />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-evo-indigo mb-2">
            Arraste e solte seu arquivo aqui
          </h3>
          <p className="text-evo-dark-400 text-sm mb-4">
            ou clique para selecionar
          </p>
        </div>

        <label className="px-6 py-3 bg-zinc-300/60 border border-zinc-500 text-black font-semibold rounded-lg hover:bg-zinc-400 transition-colors cursor-pointer">
          Selecionar Arquivo
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>

        <div className="flex items-center gap-2 text-sm text-evo-dark-400 mt-4">
          <FileSpreadsheet size={16} />
          <span>Formatos aceitos: Excel (.xlsx, .xls) ou CSV (.csv)</span>
        </div>
      </div>
    </div>
  );
}
