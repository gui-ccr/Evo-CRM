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
      className="border-2 border-dashed border-zinc-600 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-12 text-center hover:border-evo-orange transition-colors cursor-pointer bg-zinc-200"
    >
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-evo-orange/10 rounded-full flex items-center justify-center">
          <Upload className="text-evo-orange" size={24} />
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-indigo-500 mb-1 sm:mb-2">
            Arraste e solte seu arquivo aqui
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm mb-3 sm:mb-4">
            ou clique para selecionar
          </p>
        </div>

        <label className="px-4 sm:px-6 py-2.5 sm:py-3 bg-zinc-300/60 border border-zinc-500 text-black font-semibold rounded-lg hover:bg-zinc-400 transition-colors cursor-pointer touch-manipulation text-sm sm:text-base">
          Selecionar Arquivo
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-600 mt-2 sm:mt-4">
          <FileSpreadsheet size={16} className="flex-shrink-0" />
          <span className="text-center">Formatos aceitos: Excel (.xlsx, .xls) ou CSV (.csv)</span>
        </div>
      </div>
    </div>
  );
}
