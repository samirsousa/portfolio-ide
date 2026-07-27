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
          `>>> STATUS: Coleta de dados via API ativa | Score de risco calculado em tempo real.`
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

  // 📄 SE MODO LEITURA RH ESTIVER ATIVO
  if (isReadingMode) {
    return (
      <div className="min-h-screen bg-[#121212] text-white p-6 sm:p-12 max-w-4xl mx-auto font-sans leading-relaxed">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Samir Firmino Martins de Sousa</h1>
            <p className="text-[#007acc] font-medium text-base mt-1">
              Desenvolvedor Jr | Analista de Dados Jr | Estagiário de TI
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Niterói, RJ • +55 21 97928-4282 • samir.sfmss@gmail.com
            </p>
            <div className="flex gap-3 text-xs text-[#007acc] mt-2">
              <a href="https://www.linkedin.com/in/samir-firmino-573322265" target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href="https://github.com/samirsousa" target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href="/curriculo.pdf" 
              download="Curriculo_Samir_Firmino.pdf"
              className="bg-green-600 px-4 py-2.5 rounded text-sm hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2 flex-1 sm:flex-initial"
            >
              📥 Baixar CV (PDF)
            </a>
            <button
              onClick={() => setIsReadingMode(false)}
              className="bg-[#007acc] px-4 py-2.5 rounded text-sm hover:bg-[#005999] transition-colors flex-1 sm:flex-initial"
            >
              💻 Voltar para IDE
            </button>
          </div>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#007acc] border-b border-gray-800 pb-1 mb-3">
              Objetivo Profissional
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Estudante do 7º período de Sistemas de Informação com experiência prática em análise de dados, automação de processos e desenvolvimento de aplicações. Habilidades em Python para pipelines ETL, criação de dashboards no Power BI, desenvolvimento web com ReactJS e Node.js, além de integração de APIs (REST e WebSockets). Idiomas: Inglês e Espanhol intermediários.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#007acc] border-b border-gray-800 pb-1 mb-3">
              Formação Acadêmica
            </h2>
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">Bacharelado em Sistemas de Informação</h3>
                <span className="text-xs text-gray-400">Março 2023 - Dezembro 2027</span>
              </div>
              <p className="text-sm text-gray-400">UniLaSalle - RJ (Cursando 7º período - Noite)</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#007acc] border-b border-gray-800 pb-1 mb-4">
              Experiência Profissional
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">Estagiário em Análise de Dados</h3>
                  <span className="text-xs text-gray-400">Abril 2024 - Abril 2026</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Agência Nacional do Petróleo (ANP)</p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1.5 pl-1">
                  <li>Planejou e executou atualizações em banco de dados corporativo, garantindo consistência das informações.</li>
                  <li>Modelei e implementei histórico de dados em SQL para análises comparativas e relatórios de longo prazo.</li>
                  <li>Automatizei processos repetitivos com scripts Python, reduzindo trabalho manual e aumentando eficiência.</li>
                  <li>Desenvolvi dashboards interativos no Power BI com DAX e Power Query entregando relatórios com insights estratégicos.</li>
                  <li>Integrei e analisei dados de múltiplas fontes (incluindo OracleDB), resultando na redução de 10% nas horas mensais trabalhadas.</li>
                  <li>Implementei pipelines ETL e ERP com Python (Pandas e NumPy) para extração e carga em bases relacionais.</li>
                  <li>Colaborei na definição de requisitos funcionais com Histórias de Usuário e Diagramas de Classe para sistemas de credenciamento.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-base">Desenvolvedor Voluntário</h3>
                  <span className="text-xs text-gray-400">Março 2024 - Junho 2024</span>
                </div>
                <p className="text-sm text-gray-400 mb-2">Projeto ONG</p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-1">
                  <li>Desenvolvimento do Back-end utilizando Django com banco de dados SQL.</li>
                  <li>Criação de Front-end responsivo com HTML, CSS e JavaScript.</li>
                  <li>Gestão de versionamento e trabalho em equipe via Git e GitHub.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#007acc] border-b border-gray-800 pb-1 mb-3">
              Projetos Acadêmicos / Pessoais
            </h2>
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-base">Gerenciador de Supermercado (Linguagem C)</h3>
                <span className="text-xs text-gray-400">Março 2023 - Junho 2023</span>
              </div>
              <p className="text-sm text-gray-300 mt-1">
                Desenvolvimento de sistema em C para gerenciamento de estoque e vendas com regras de negócio personalizadas, resultando na melhoria operacional do ambiente simulado.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#007acc] border-b border-gray-800 pb-1 mb-3">
              Habilidades Técnicas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-white block">Linguagens:</span>
                <span className="text-gray-300">Python (ETL/Automação), SQL, C, Java</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Desenvolvimento Web:</span>
                <span className="text-gray-300">ReactJS, TypeScript, Node.js, Express, HTML/CSS, REST APIs</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Bancos de Dados:</span>
                <span className="text-gray-300">SQL Server, OracleDB, PostgreSQL</span>
              </div>
              <div>
                <span className="font-semibold text-white block">BI & Automação:</span>
                <span className="text-gray-300">Power BI (DAX, Power Query), n8n, Excel Avançado</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Metodologias & Ferramentas:</span>
                <span className="text-gray-300">Scrum, Kanban, Git, GitHub, Vite, Docker/Deploy</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Idiomas:</span>
                <span className="text-gray-300">Inglês Intermediário, Espanhol Intermediário</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#007acc] border-b border-gray-800 pb-1 mb-3">
              Licenças e Certificados
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1 pl-1">
              <li>Análise de Dados no Power BI - Fundação Bradesco (Maio 2025)</li>
              <li>Inteligência Artificial para Cibersegurança - LinkedIn Learning (Maio 2025)</li>
              <li>Introdução às Competências para Carreira de Análise de Dados - LinkedIn Learning (Maio 2025)</li>
            </ul>
          </section>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 📱 NO MOBILE: Exibe o Feed por padrão com o botão de alternar para a IDE */}
      <div className="block md:hidden">
        {mobileView === 'feed' ? (
          <MobilePortfolio onSwitchToIde={() => setMobileView('ide')} />
        ) : (
          <div className={`flex flex-col h-screen w-screen overflow-hidden ${themeClasses[theme]} font-sans`}>
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