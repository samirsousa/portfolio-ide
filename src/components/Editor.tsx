import React, { useState, useEffect } from 'react';
import { FileItem } from '../data/filesData';
import { FileIcon } from './FileIcon';

interface EditorProps {
  openFiles: FileItem[];
  activeFile: FileItem;
  onSelectFile: (file: FileItem) => void;
  onCloseTab: (fileId: string, e: React.MouseEvent) => void;
  onRunScript: (file: FileItem) => void;
  onToggleMode?: () => void;
  theme?: 'onedark' | 'dracula' | 'monokai';
  onSelectTheme?: (theme: 'onedark' | 'dracula' | 'monokai') => void;
}

export const Editor: React.FC<EditorProps> = ({
  openFiles,
  activeFile,
  onSelectFile,
  onCloseTab,
  onRunScript,
  onToggleMode,
  theme = 'onedark',
  onSelectTheme,
}) => {
  // 1. Estado da Animação Inicial de Entrada
  const [introText, setIntroText] = useState('');
  const [isIntroDone, setIsIntroDone] = useState(false);
  const fullIntroMessage = 'e se o seu portfólio...\n...fosse uma IDE?';

  // 2. Estado da Animação do Cargo no Banner Hero
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'Estagiário de TI / Análise de Dados';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setIntroText(fullIntroMessage.slice(0, index));
      index++;
      if (index > fullIntroMessage.length) {
        clearInterval(timer);
        setTimeout(() => {
          setIsIntroDone(true);
        }, 800);
      }
    }, 45);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isIntroDone) return;

    let index = 0;
    const timer = setInterval(() => {
      setTypedTitle(fullTitle.slice(0, index));
      index++;
      if (index > fullTitle.length) {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [isIntroDone]);

  // Paleta de cores dinâmica por tema
  const themeStyles = {
    onedark: {
      bg: 'bg-[#1e1e1e]',
      bannerBg: 'bg-[#181818]',
      text: 'text-[#abb2bf]',
      keyword: 'text-[#c678dd]',
      string: 'text-[#98c379]',
      function: 'text-[#61afef]',
      comment: 'text-[#5c6370]',
      number: 'text-[#d19a66]',
    },
    dracula: {
      bg: 'bg-[#282a36]',
      bannerBg: 'bg-[#21222c]',
      text: 'text-[#f8f8f2]',
      keyword: 'text-[#ff79c6]',
      string: 'text-[#f1fa8c]',
      function: 'text-[#50fa7b]',
      comment: 'text-[#6272a4]',
      number: 'text-[#bd93f9]',
    },
    monokai: {
      bg: 'bg-[#272822]',
      bannerBg: 'bg-[#1e1f1c]',
      text: 'text-[#f8f8f2]',
      keyword: 'text-[#f92672]',
      string: 'text-[#e6db74]',
      function: 'text-[#a6e22e]',
      comment: 'text-[#75715e]',
      number: 'text-[#ae81ff]',
    },
  };

  const currentStyle = themeStyles[theme] || themeStyles.onedark;

  // Destaque de sintaxe no código
  const renderHighlightedCode = (code: string) => {
    return code.split('\n').map((line, i) => {
      if (line.trim().startsWith('#') || line.trim().startsWith('//')) {
        return (
          <div key={i} className={currentStyle.comment}>
            {line}
          </div>
        );
      }

      return (
        <div key={i} className="whitespace-pre">
          {line.split(/(\s+|[(),:[\]{}="'])/).map((token, j) => {
            if (['class', 'def', 'return', 'import', 'from', 'self', 'const', 'let', 'var'].includes(token)) {
              return <span key={j} className={`${currentStyle.keyword} font-bold`}>{token}</span>;
            }
            if (['__init__', 'print', 'resumo', 'detalhes', 'impactos_e_conquistas'].includes(token)) {
              return <span key={j} className={currentStyle.function}>{token}</span>;
            }
            if (!isNaN(Number(token)) && token.trim() !== '') {
              return <span key={j} className={currentStyle.number}>{token}</span>;
            }
            if (token.startsWith('"') || token.startsWith("'")) {
              return <span key={j} className={currentStyle.string}>{token}</span>;
            }
            return <span key={j}>{token}</span>;
          })}
        </div>
      );
    });
  };

  if (!isIntroDone) {
    const lines = introText.split('\n');
    const firstLine = lines[0] || '';
    const secondLine = lines[1] || '';

    return (
      <div className={`flex-1 flex flex-col items-center justify-center ${currentStyle.bg} font-mono p-6 transition-all select-none`}>
        <div className="text-left space-y-1 max-w-md w-full text-base sm:text-lg font-bold leading-relaxed">
          <div className="text-white min-h-7">
            {firstLine}
            {lines.length === 1 && <span className="animate-pulse text-white">_</span>}
          </div>

          {lines.length > 1 && (
            <div className="text-[#007acc] min-h-7">
              {secondLine}
              <span className="animate-pulse text-[#007acc]">_</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col h-full min-h-0 ${currentStyle.bg} overflow-hidden transition-colors duration-200`}>
      {/* Abas Superiores (Tabs com scroll suave no mobile) */}
      <div className="flex bg-[#252526] border-b border-white/10 overflow-x-auto scrollbar-none select-none shrink-0">
        {openFiles.map((file) => {
          const isActive = file.id === activeFile.id;
          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file)}
              className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-white/5 cursor-pointer group transition-colors shrink-0 ${
                isActive
                  ? `${currentStyle.bg} text-white border-t-2 border-t-[#007acc]`
                  : 'text-gray-400 hover:bg-[#2d2d2d] hover:text-gray-200'
              }`}
              style={{ minWidth: '100px', maxWidth: '180px' }}
            >
              <FileIcon name={file.name} />
              <span className="truncate flex-1 text-[11px] sm:text-xs">{file.name}</span>
              <button
                onClick={(e) => onCloseTab(file.id, e)}
                className="opacity-70 sm:opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded p-0.5 text-gray-400 hover:text-white transition-opacity"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Container Rolável Único (Hero + Código) */}
      <div className={`flex-1 overflow-y-auto p-3 sm:p-6 font-mono text-xs sm:text-sm ${currentStyle.text}`}>
        {/* Hero Banner Compacto e Ajustado no Mobile */}
        <div className={`${currentStyle.bannerBg} border border-white/10 rounded-lg p-3 sm:p-5 flex flex-col gap-2.5 select-none mb-4`}>
          <p className="text-[10px] sm:text-xs text-gray-500 font-mono">
            // Fala aí, obrigado por abrir meu portfólio!
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2.5">
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Samir Firmino <span className="text-[#007acc] font-normal font-sans">;</span>
            </h1>

            <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs w-full sm:w-auto">
              {onToggleMode && (
                <button
                  onClick={onToggleMode}
                  className="bg-[#007acc] hover:bg-[#005999] text-white px-2.5 py-1.5 rounded font-medium transition-all active:scale-95 flex items-center gap-1.5 flex-1 sm:flex-initial justify-center"
                >
                  <span>📄</span> Ver CV (RH)
                </button>
              )}
              <button
                onClick={() => onRunScript(activeFile)}
                className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 rounded font-medium transition-all active:scale-95 flex items-center gap-1.5 flex-1 sm:flex-initial justify-center"
              >
                <span>▶</span> Executar ({activeFile.name})
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#007acc] font-semibold flex items-center">
            <span>{typedTitle}</span>
            <span className="animate-pulse text-[#007acc] ml-0.5">_</span>
          </div>

          <div className="space-y-1 text-[11px] sm:text-xs text-gray-300 leading-relaxed font-sans max-w-4xl">
            <p>
              Estudante de Sistemas de Informação (UniLaSalle - RJ) com foco em Análise de Dados, automação de rotinas e desenvolvimento de sistemas.
            </p>
            <p className="text-gray-400">
              <strong className="text-white font-mono">Hoje:</strong> atuando como estagiário na Agência Nacional do Petróleo (ANP), construindo pipelines ETL em Python, otimizando bancos SQL e desenvolvendo dashboards no Power BI.
            </p>
          </div>

          {/* Temas */}
          {onSelectTheme && (
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-400 pt-2 border-t border-white/5 font-mono mt-1 overflow-x-auto scrollbar-none">
              <span className="shrink-0">Themes:</span>
              <button
                onClick={() => onSelectTheme('onedark')}
                className={`px-2 py-0.5 rounded border transition-colors shrink-0 ${theme === 'onedark' ? 'bg-[#007acc] text-white border-[#007acc]' : 'border-white/10 hover:border-white/30'}`}
              >
                One Dark
              </button>
              <button
                onClick={() => onSelectTheme('dracula')}
                className={`px-2 py-0.5 rounded border transition-colors shrink-0 ${theme === 'dracula' ? 'bg-[#bd93f9] text-black font-semibold border-[#bd93f9]' : 'border-white/10 hover:border-white/30'}`}
              >
                Dracula
              </button>
              <button
                onClick={() => onSelectTheme('monokai')}
                className={`px-2 py-0.5 rounded border transition-colors shrink-0 ${theme === 'monokai' ? 'bg-[#e6db74] text-black font-semibold border-[#e6db74]' : 'border-white/10 hover:border-white/30'}`}
              >
                Monokai
              </button>
            </div>
          )}
        </div>

        {/* Editor de Código Principal */}
        <div className="flex leading-relaxed pt-1 overflow-x-auto">
          <div className="flex flex-col text-right pr-2.5 sm:pr-4 text-gray-600 select-none border-r border-white/5 mr-2.5 sm:mr-4 text-[11px] sm:text-xs space-y-1 shrink-0">
            {activeFile.content.split('\n').map((_, index) => (
              <span key={index}>{index + 1}</span>
            ))}
          </div>

          <div className="font-mono text-[11px] sm:text-sm flex-1 space-y-0.5 overflow-x-auto">
            {renderHighlightedCode(activeFile.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;