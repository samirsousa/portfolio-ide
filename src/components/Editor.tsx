import React from 'react';
import { FileItem } from '../data/filesData';

interface EditorProps {
  openFiles: FileItem[];
  activeFile: FileItem;
  onSelectFile: (file: FileItem) => void;
  onCloseTab: (fileId: string, e: React.MouseEvent) => void;
  onRunScript: (file: FileItem) => void;
  theme: 'onedark' | 'dracula' | 'monokai';
}

export const Editor: React.FC<EditorProps> = ({
  openFiles,
  activeFile,
  onSelectFile,
  onCloseTab,
  onRunScript,
  theme,
}) => {
  const syntaxPalettes = {
    onedark: {
      comment: 'text-[#5c6370] italic',
      keyword: 'text-[#c678dd] font-semibold',
      string: 'text-[#98c379]',
      number: 'text-[#d19a66]',
      default: 'text-[#abb2bf]',
    },
    dracula: {
      comment: 'text-[#6272a4] italic',
      keyword: 'text-[#ff79c6] font-semibold',
      string: 'text-[#f1fa8c]',
      number: 'text-[#bd93f9]',
      default: 'text-[#f8f8f2]',
    },
    monokai: {
      comment: 'text-[#75715e] italic',
      keyword: 'text-[#f92672] font-semibold',
      string: 'text-[#e6db74]',
      number: 'text-[#ae81ff]',
      default: 'text-[#f8f8f2]',
    },
  };

  const palette = syntaxPalettes[theme] || syntaxPalettes.onedark;

  const formatCode = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, i) => {
      let colorClass = palette.default;

      const trimmed = line.trim();
      if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
        colorClass = palette.comment;
      } else if (
        trimmed.startsWith('class ') ||
        trimmed.startsWith('def ') ||
        trimmed.startsWith('import ') ||
        trimmed.startsWith('from ') ||
        trimmed.startsWith('return')
      ) {
        colorClass = palette.keyword;
      } else if (line.includes('="') || line.includes("='") || line.includes('":')) {
        colorClass = palette.string;
      }

      return (
        <div key={i} className="table-row">
          <span className="table-cell pr-6 text-right text-gray-500/60 select-none text-xs font-mono">{i + 1}</span>
          <span className={`table-cell font-mono ${colorClass}`}>{line}</span>
        </div>
      );
    });
  };

  return (
    <main className="flex-1 bg-transparent flex flex-col overflow-hidden">
      {/* Barra de Abas e Botão Run */}
      <div className="flex items-center justify-between bg-black/30 border-b border-white/10 pr-4">
        <div className="flex overflow-x-auto">
          {openFiles.map((file) => {
            const isActive = file.id === activeFile.id;
            return (
              <div
                key={file.id}
                onClick={() => onSelectFile(file)}
                className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer border-r border-white/10 min-w-[120px] max-w-[200px] group transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white border-t-2 border-t-[#007acc]'
                    : 'bg-black/20 text-gray-400 hover:bg-white/5'
                }`}
              >
                <span>{file.icon}</span>
                <span className="truncate flex-1">{file.name}</span>
                <button
                  onClick={(e) => onCloseTab(file.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded px-1 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        {/* Botão Run Código */}
        <button
          onClick={() => onRunScript(activeFile)}
          className="flex items-center gap-1.5 bg-green-600/80 hover:bg-green-600 text-white text-xs font-mono px-3 py-1 rounded transition-all shadow-md active:scale-95"
          title="Executar script atual"
        >
          <span>▷</span>
          <span className="font-semibold">Run</span>
        </button>
      </div>

      {/* Área de Código */}
      <div className="flex-1 p-4 text-sm overflow-auto">
        <div className="table w-full">
          {formatCode(activeFile.content)}
        </div>
      </div>
    </main>
  );
};