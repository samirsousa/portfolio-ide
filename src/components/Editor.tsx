import React from 'react';
import { FileItem } from '../data/filesData';
import { FileIcon } from './FileIcon';

interface EditorProps {
  openFiles: FileItem[];
  activeFile: FileItem;
  onSelectFile: (file: FileItem) => void;
  onCloseTab: (fileId: string, e: React.MouseEvent) => void;
  onRunScript: (file: FileItem) => void;
  onToggleMode?: () => void;
  theme?: string;
  onSelectTheme?: (theme: 'onedark' | 'dracula' | 'monokai') => void;
}

export const Editor: React.FC<EditorProps> = ({
  openFiles,
  activeFile,
  onSelectFile,
  onCloseTab,
  onRunScript,
  onToggleMode,
  theme,
  onSelectTheme,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
      {/* Abas Superiores (Tabs com ícones do VS Code) */}
      <div className="flex bg-[#252526] border-b border-white/10 overflow-x-auto scrollbar-none select-none">
        {openFiles.map((file) => {
          const isActive = file.id === activeFile.id;
          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file)}
              className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-white/5 cursor-pointer min-w-[120px] max-w-[200px] group transition-colors ${
                isActive
                  ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]'
                  : 'text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-200'
              }`}
            >
              <FileIcon name={file.name} />
              <span className="truncate flex-1">{file.name}</span>
              <button
                onClick={(e) => onCloseTab(file.id, e)}
                className="opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded p-0.5 text-gray-400 hover:text-white transition-opacity"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Hero Banner Estilo Yash Dhingra */}
      <div className="bg-[#181818] border-b border-white/10 p-4 sm:p-6 flex flex-col gap-4 select-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight font-mono">Samir Firmino ;</h1>
              <span className="bg-[#007acc]/20 text-[#007acc] border border-[#007acc]/40 text-[10px] font-mono px-2 py-0.5 rounded-full">
                Data & Software Jr
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Estudante de Sistemas de Informação • Estagiário em Análise de Dados & Automação @ ANP
            </p>
          </div>

          {/* Botões de Ação Rápidos */}
          <div className="flex flex-wrap gap-2 text-xs">
            {onToggleMode && (
              <button
                onClick={onToggleMode}
                className="bg-[#007acc] hover:bg-[#005999] text-white px-3 py-1.5 rounded font-medium transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>📄</span> Ver Currículo RH
              </button>
            )}
            <button
              onClick={() => onRunScript(activeFile)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded font-medium transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>▶</span> Executar ({activeFile.name})
            </button>
          </div>
        </div>

        {/* Badges do Yash Dhingra */}
        <div className="flex flex-wrap gap-2 text-[11px] font-mono">
          <span className="bg-[#252526] border border-white/10 text-gray-300 px-2.5 py-1 rounded">
            ⚡ <strong className="text-white">10%</strong> redução de horas mensais na ANP
          </span>
          <span className="bg-[#252526] border border-white/10 text-gray-300 px-2.5 py-1 rounded">
            🛢️ ETL em <strong className="text-white">Python / SQL / OracleDB</strong>
          </span>
          <span className="bg-[#252526] border border-white/10 text-gray-300 px-2.5 py-1 rounded">
            📊 Power BI <strong className="text-white">DAX & Power Query</strong>
          </span>
        </div>

        {/* Selector de Temas no Banner (Igual Yash) */}
        {onSelectTheme && (
          <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-2 border-t border-white/5 font-mono">
            <span>One-click Themes:</span>
            <button
              onClick={() => onSelectTheme('onedark')}
              className={`px-2 py-0.5 rounded border transition-colors ${
                theme === 'onedark' ? 'bg-[#007acc] text-white border-[#007acc]' : 'border-white/10 hover:border-white/30'
              }`}
            >
              One Dark (VS Code)
            </button>
            <button
              onClick={() => onSelectTheme('dracula')}
              className={`px-2 py-0.5 rounded border transition-colors ${
                theme === 'dracula' ? 'bg-[#bd93f9] text-black font-semibold border-[#bd93f9]' : 'border-white/10 hover:border-white/30'
              }`}
            >
              Dracula
            </button>
            <button
              onClick={() => onSelectTheme('monokai')}
              className={`px-2 py-0.5 rounded border transition-colors ${
                theme === 'monokai' ? 'bg-[#e6db74] text-black font-semibold border-[#e6db74]' : 'border-white/10 hover:border-white/30'
              }`}
            >
              Monokai
            </button>
          </div>
        )}
      </div>

      {/* Editor de Código com Numeração de Linhas */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed flex">
        <div className="flex flex-col text-right pr-4 text-gray-600 select-none border-r border-white/5 mr-4 text-xs space-y-1">
          {activeFile.content.split('\n').map((_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>

        <pre className="text-gray-300 whitespace-pre-wrap font-mono text-xs sm:text-sm flex-1 space-y-1">
          <code>{activeFile.content}</code>
        </pre>
      </div>
    </div>
  );
};