'use client';

import { useState, useEffect } from 'react';
import { initialFiles, FileItem } from '../src/data/filesData';
import { TitleBar } from '../src/components/TitleBar';
import { ActivityBar } from '../src/components/ActivityBar';
import { Sidebar } from '../src/components/Sidebar';
import { Editor } from '../src/components/Editor';
import { StatusBar } from '../src/components/StatusBar';
import { Terminal } from '../src/components/Terminal';
import { CommandPalette } from '../src/components/CommandPalette';
import MobilePortfolio from '../src/components/MobilePortfolio';

export default function Home() {
  const [files] = useState<FileItem[]>(initialFiles);
  const [openFiles, setOpenFiles] = useState<FileItem[]>([initialFiles[0]]);
  const [activeFile, setActiveFile] = useState<FileItem>(initialFiles[0]);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'onedark' | 'dracula' | 'monokai'>('onedark');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  // Estado para controlar o layout no mobile ('feed' ou 'ide')
  const [mobileView, setMobileView] = useState<'feed' | 'ide'>('feed');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectFile = (file: FileItem) => {
    if (!openFiles.some((f) => f.id === file.id)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file);
  };

  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedTabs = openFiles.filter((f) => f.id !== fileId);
    setOpenFiles(updatedTabs);

    if (activeFile.id === fileId && updatedTabs.length > 0) {
      setActiveFile(updatedTabs[updatedTabs.length - 1]);
    }
  };

  const handleRunScript = (file: FileItem) => {
    setIsTerminalOpen(true);

    const log: string[] = [
      `$ python3 ./${file.name}`,
      `[Executing...] Compilando script e processando dados...`,
    ];

    switch (file.id) {
      case 'sobre-mim':
        log.push(
          `[SUCCESS] Executado sem erros (exit code 0).`,
          `>>> SAÍDA: "Estudante de Sistemas de Informação focado em análise de dados, ETL em Python e SQL."`
        );
        break;

      case 'experiencia':
        log.push(
          `[SUCCESS] Executado sem erros (exit code 0).`,
          `>>> EMPRESA: Agência Nacional do Petróleo (ANP)`,
          `>>> CARGO: Estagiário em Análise de Dados`,
          `>>> IMPACTO: Otimização de processos ETL/SQL e redução de 10% no total de horas mensais.`
        );
        break;

      case 'tcc-projeto':
        log.push(
          `[SUCCESS] Executado sem erros (exit code 0).`,
          `>>> SISTEMA: Support Decision System - Criptomoedas`,
          `>>> STATUS: Coleta de dados via API ativa | Score de risco calculated em tempo real.`
        );
        break;

      case 'habilidades':
        log.push(
          `[JSON PARSED]: Dados válidos.`,
          `>>> LINGUAGENS: Python, SQL, C, Java`,
          `>>> BI & BANCOS: Power BI, OracleDB, PostgreSQL, SQL Server`
        );
        break;

      case 'contato':
        log.push(
          `=== CANAIS DE CONTATO DE SAMIR FIRMINO ===`,
          `LinkedIn: https://www.linkedin.com/in/samir-firmino-573322265`,
          `GitHub:   https://github.com/samirsousa`,
          `E-mail:   samir.sfmss@gmail.com`,
          `Telefone: +55 21 97928-4282`
        );
        break;

      default:
        log.push(
          `[SUCCESS] Código executado com sucesso (exit code 0).`,
          `>>> SAÍDA: Processo concluído.`
        );
    }

    setTerminalOutput(log);
  };

  const themeClasses = {
    onedark: 'bg-[#1e1e1e] text-[#abb2bf]',
    dracula: 'bg-[#282a36] text-[#f8f8f2]',
    monokai: 'bg-[#272822] text-[#f8f8f2]',
  };

  return (
    <>
      {/* 📱 NO MOBILE: Exibe o Feed por padrão com o botão de alternar para a IDE */}
      <div className="block md:hidden">
        {mobileView === 'feed' ? (
          <MobilePortfolio onSwitchToIde={() => setMobileView('ide')} />
        ) : (
          <div className={`flex flex-col h-screen w-screen overflow-hidden ${themeClasses[theme]} font-sans`}>
            {/* Barra superior de retorno para o Feed no mobile */}
            <div className="bg-[#007acc] text-white px-3 py-1.5 flex justify-between items-center text-xs font-medium">
              <span>Modo IDE (VS Code)</span>
              <button
                onClick={() => setMobileView('feed')}
                className="bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded text-[11px]"
              >
                📱 Voltar ao Feed Clean
              </button>
            </div>

            <TitleBar />

            <div className="flex flex-1 overflow-hidden relative">
              <Sidebar
                files={files}
                activeFileId={activeFile.id}
                onSelectFile={handleSelectFile}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen((prev) => !prev)}
              />

              <div className="flex-1 flex flex-col overflow-hidden w-full">
                <Editor
                  openFiles={openFiles}
                  activeFile={activeFile}
                  onSelectFile={setActiveFile}
                  onCloseTab={handleCloseTab}
                  onRunScript={handleRunScript}
                  theme={theme}
                />
                <Terminal
                  isOpen={isTerminalOpen}
                  onClose={() => setIsTerminalOpen(false)}
                  outputLog={terminalOutput}
                />
              </div>
            </div>

            <StatusBar
              activeFileName={activeFile.name}
              onToggleMode={() => setIsReadingMode(true)}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              currentTheme={theme}
            />
          </div>
        )}
      </div>

      {/* 💻 NO DESKTOP: Sempre exibe a IDE do VS Code Completa */}
      <div className={`hidden md:flex flex-col h-screen w-screen overflow-hidden ${themeClasses[theme]} font-sans transition-colors duration-200`}>
        <TitleBar />

        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          files={files}
          onSelectFile={handleSelectFile}
          onSelectTheme={(t) => setTheme(t)}
        />

        <div className="flex flex-1 overflow-hidden relative">
          <ActivityBar />

          <Sidebar
            files={files}
            activeFileId={activeFile.id}
            onSelectFile={handleSelectFile}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
          />

          <div className="flex-1 flex flex-col overflow-hidden w-full">
            <Editor
              openFiles={openFiles}
              activeFile={activeFile}
              onSelectFile={setActiveFile}
              onCloseTab={handleCloseTab}
              onRunScript={handleRunScript}
              theme={theme}
            />
            <Terminal
              isOpen={isTerminalOpen}
              onClose={() => setIsTerminalOpen(false)}
              outputLog={terminalOutput}
            />
          </div>
        </div>

        <StatusBar
          activeFileName={activeFile.name}
          onToggleMode={() => setIsReadingMode(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          currentTheme={theme}
        />
      </div>
    </>
  );
}