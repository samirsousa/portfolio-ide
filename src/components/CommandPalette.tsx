import React, { useState } from 'react';
import { FileItem } from '../data/filesData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  onSelectFile: (file: FileItem) => void;
  onSelectTheme: (theme: 'onedark' | 'dracula' | 'monokai') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  files,
  onSelectFile,
  onSelectTheme,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div 
        className="bg-[#252526] border border-[#454545] w-full max-w-xl rounded-lg shadow-2xl overflow-hidden font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-[#333333] flex items-center gap-2">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Digite para buscar arquivos ou temas (ex: dracula, sobre)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent w-full text-white outline-none text-sm font-mono placeholder-gray-500"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto p-2 text-sm text-[#cccccc] space-y-1">
          <div className="text-[10px] uppercase font-bold text-gray-500 px-2 py-1">Arquivos</div>
          {files
            .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
            .map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  onSelectFile(f);
                  onClose();
                }}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-[#04395e] hover:text-white flex items-center justify-between font-mono"
              >
                <span>{f.icon} {f.name}</span>
                <span className="text-xs text-gray-500">Abrir arquivo</span>
              </button>
            ))}

          <div className="text-[10px] uppercase font-bold text-gray-500 px-2 py-1 pt-2">Temas</div>
          <button
            onClick={() => { onSelectTheme('onedark'); onClose(); }}
            className="w-full text-left px-3 py-1.5 rounded hover:bg-[#04395e] hover:text-white flex items-center justify-between"
          >
            <span>🎨 Tema: One Dark Pro (Escuro)</span>
          </button>
          <button
            onClick={() => { onSelectTheme('dracula'); onClose(); }}
            className="w-full text-left px-3 py-1.5 rounded hover:bg-[#04395e] hover:text-white flex items-center justify-between"
          >
            <span>🧛 Tema: Dracula (Roxo)</span>
          </button>
          <button
            onClick={() => { onSelectTheme('monokai'); onClose(); }}
            className="w-full text-left px-3 py-1.5 rounded hover:bg-[#04395e] hover:text-white flex items-center justify-between"
          >
            <span>🍌 Tema: Monokai (Sépia/Amarelo)</span>
          </button>
        </div>
      </div>
    </div>
  );
};