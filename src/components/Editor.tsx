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
    // 1. Estado da Animação Inicial de Entrada ("e se...")
    const [introText, setIntroText] = useState('');
    const [isIntroDone, setIsIntroDone] = useState(false);
    const fullIntroMessage = 'e se o seu portfólio...\n...fosse uma IDE?';

    // 2. Estado da Animação do Cargo no Banner Hero
    const [typedTitle, setTypedTitle] = useState('');
    const fullTitle = 'Estagiário de TI / Análise de Dados';

    // Executa a primeira animação de introdução
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

    // Executa a digitação do cargo assim que a intro inicial termina
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

    // 1. TELA DE INTRODUÇÃO ANIMADA (Branco + Azul)
    if (!isIntroDone) {
        const lines = introText.split('\n');
        const firstLine = lines[0] || '';
        const secondLine = lines[1] || '';

        return (
            <div className={`flex-1 flex flex-col items-center justify-center ${currentStyle.bg} font-mono p-6 transition-all select-none`}>
                <div className="text-left space-y-1 max-w-md w-full text-base sm:text-lg font-bold leading-relaxed">
                    {/* Linha 1 em Branco */}
                    <div className="text-white min-h-7">
                        {firstLine}
                        {lines.length === 1 && <span className="animate-pulse text-white">_</span>}
                    </div>

                    {/* Linha 2 em Azul */}
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

    // 2. EXIBIÇÃO COMPLETA DA IDE APÓS A INTRO
    return (
        <div className={`flex-1 flex flex-col ${currentStyle.bg} overflow-hidden transition-colors duration-200`}>
            {/* Abas Superiores (Tabs) */}
            <div className="flex bg-[#252526] border-b border-white/10 overflow-x-auto scrollbar-none select-none">
                {openFiles.map((file) => {
                    const isActive = file.id === activeFile.id;
                    return (
                        <div
                            key={file.id}
                            onClick={() => onSelectFile(file)}
                            className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-white/5 cursor-pointer style={{ minWidth: '120px', maxWidth: '200px' }} group transition-colors ${isActive
                                ? `${currentStyle.bg} text-white border-t-2 border-t-[#007acc]`
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

            {/* Hero Banner Estilo Yash Dhingra Exact Copy */}
            <div className={`${currentStyle.bannerBg} border-b border-white/10 p-5 sm:p-7 flex flex-col gap-4 select-none font-mono`}>
                {/* Comentário de código em cinza */}
                <p className="text-xs sm:text-sm text-gray-500 font-mono">
          // Fala aí, obrigado por abrir meu portfólio!
                </p>

                {/* Nome Grande e Botões */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Samir Firmino <span className="text-[#007acc] font-normal font-sans">;</span>
                    </h1>

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

                {/* Frase do Cargo em AZUL animada */}
                <div className="text-sm sm:text-base text-[#007acc] font-semibold style={{ minHeight: '24px' }} flex items-center">
                    <span>{typedTitle}</span>
                    <span className="animate-pulse text-[#007acc] ml-0.5">_</span>
                </div>

                {/* Parágrafos do Resumo Profissional */}
                <div className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans max-w-4xl pt-1">
                    <p>
                        Estudante de Sistemas de Informação (UniLaSalle - RJ) com foco em Análise de Dados, automação de rotinas e desenvolvimento de sistemas.
                    </p>
                    <p className="text-gray-400">
                        <strong className="text-white font-mono">Hoje:</strong> atuando como estagiário na Agência Nacional do Petróleo (ANP), construindo pipelines ETL em Python, otimizando bancos SQL e desenvolvendo dashboards estratégicos em Power BI.
                    </p>
                </div>

                {/* Temas */}
                {onSelectTheme && (
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 pt-3 border-t border-white/5 font-mono mt-1">
                        <span>One-click Themes:</span>
                        <button
                            onClick={() => onSelectTheme('onedark')}
                            className={`px-2 py-0.5 rounded border transition-colors ${theme === 'onedark' ? 'bg-[#007acc] text-white border-[#007acc]' : 'border-white/10 hover:border-white/30'
                                }`}
                        >
                            One Dark (VS Code)
                        </button>
                        <button
                            onClick={() => onSelectTheme('dracula')}
                            className={`px-2 py-0.5 rounded border transition-colors ${theme === 'dracula' ? 'bg-[#bd93f9] text-black font-semibold border-[#bd93f9]' : 'border-white/10 hover:border-white/30'
                                }`}
                        >
                            Dracula
                        </button>
                        <button
                            onClick={() => onSelectTheme('monokai')}
                            className={`px-2 py-0.5 rounded border transition-colors ${theme === 'monokai' ? 'bg-[#e6db74] text-black font-semibold border-[#e6db74]' : 'border-white/10 hover:border-white/30'
                                }`}
                        >
                            Monokai
                        </button>
                    </div>
                )}
            </div>

            {/* Editor de Código Principal */}
            <div className={`flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed flex ${currentStyle.text}`}>
                <div className="flex flex-col text-right pr-4 text-gray-600 select-none border-r border-white/5 mr-4 text-xs space-y-1">
                    {activeFile.content.split('\n').map((_, index) => (
                        <span key={index}>{index + 1}</span>
                    ))}
                </div>

                <div className="font-mono text-xs sm:text-sm flex-1 space-y-0.5">
                    {renderHighlightedCode(activeFile.content)}
                </div>
            </div>
        </div>
    );
};

export default Editor;