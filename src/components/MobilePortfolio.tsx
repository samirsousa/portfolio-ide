import React, { useState } from 'react';

interface MobilePortfolioProps {
  onSwitchToIde?: () => void;
}

export const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ onSwitchToIde }) => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'biblioteca'>('inicio');
  const [activeFilter, setActiveFilter] = useState<'tudo' | 'projetos' | 'experiencia'>('tudo');

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans flex flex-col justify-between pb-28 select-none">
      
      {/* Header Nativo Spotify: Perfil + Filtros do Topo */}
      <header className="px-4 pt-4 pb-2 space-y-3 sticky top-0 bg-[#121212]/95 backdrop-blur-md z-30">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="./perfil.jfif"
              alt="Perfil"
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <span className="text-xl font-bold tracking-tight text-white">Início</span>
          </div>

          {onSwitchToIde && (
            <button
              onClick={onSwitchToIde}
              className="flex items-center gap-1.5 text-[11px] bg-[#282828] text-gray-200 hover:text-white border border-gray-700/60 px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-md"
            >
              <span>💻</span> Modo IDE
            </button>
          )}
        </div>

        {/* Pílulas de Filtro */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none text-xs font-medium">
          <button
            onClick={() => setActiveFilter('tudo')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'tudo' ? 'bg-[#1DB954] text-black font-bold' : 'bg-[#282828] text-white'
            }`}
          >
            Tudo
          </button>
          <button
            onClick={() => setActiveFilter('projetos')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'projetos' ? 'bg-[#1DB954] text-black font-bold' : 'bg-[#282828] text-white'
            }`}
          >
            Projetos
          </button>
          <button
            onClick={() => setActiveFilter('experiencia')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
              activeFilter === 'experiencia' ? 'bg-[#1DB954] text-black font-bold' : 'bg-[#282828] text-white'
            }`}
          >
            Experiência
          </button>
        </div>
      </header>

      {/* Feed Estilo App Spotify */}
      <main className="px-4 flex-1 space-y-6 pt-1">
        
        {/* Recentes em Grade de 2 Colunas com Logos Reais */}
        {(activeFilter === 'tudo' || activeFilter === 'projetos') && (
          <div>
            <h2 className="text-lg font-bold text-white mb-2.5">Recentes</h2>
            <div className="grid grid-cols-2 gap-2">
              
              {/* Petflow - Logo React */}
              <div className="bg-[#282828]/80 hover:bg-[#383838] transition-colors rounded-md p-2 flex items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center shrink-0 border border-cyan-500/30 p-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-full h-full object-contain" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">Petflow</p>
                  <p className="text-[10px] text-gray-400 truncate">React • Node • Postgres</p>
                </div>
              </div>

              {/* Krypton AI - Logo Python */}
              <div className="bg-[#282828]/80 hover:bg-[#383838] transition-colors rounded-md p-2 flex items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center shrink-0 border border-purple-500/30 p-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-full h-full object-contain" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">Krypton AI</p>
                  <p className="text-[10px] text-gray-400 truncate">TCC Cripto • Python</p>
                </div>
              </div>

              {/* Deal Closer AI - Logo Python */}
              <div className="bg-[#282828]/80 hover:bg-[#383838] transition-colors rounded-md p-2 flex items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center shrink-0 border border-blue-500/30 p-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-full h-full object-contain" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">Deal Closer AI</p>
                  <p className="text-[10px] text-gray-400 truncate">Agente IA • Python</p>
                </div>
              </div>

              {/* DevChef - Logo TypeScript */}
              <div className="bg-[#282828]/80 hover:bg-[#383838] transition-colors rounded-md p-2 flex items-center gap-2.5 overflow-hidden">
                <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center shrink-0 border border-emerald-500/30 p-2">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-full h-full object-contain" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">DevChef</p>
                  <p className="text-[10px] text-gray-400 truncate">React & Node App</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Recomendado para você (Experiência) */}
        {(activeFilter === 'tudo' || activeFilter === 'experiencia') && (
          <div>
            <h2 className="text-lg font-bold text-white mb-2.5">Recomendado para você</h2>
            
            <div className="bg-[#181818] p-3.5 rounded-lg border border-gray-800/80 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1e293b] border border-[#1DB954]/40 rounded flex items-center justify-center shrink-0 p-2.5">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqldeveloper/sqldeveloper-original.svg" alt="SQL / Database" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#1DB954] tracking-wider">Experiência Atual</span>
                  <h3 className="text-sm font-bold text-white">Análise de Dados na ANP</h3>
                  <p className="text-xs text-gray-400">Agência Nacional do Petróleo • 2024 - 2026</p>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed pt-1">
                Pipelines ETL com Python, modelagem de dados SQL e automações com redução de 10% nas horas mensais.
              </p>
            </div>
          </div>
        )}

        {/* Sua Biblioteca Tech (Carrossel com Logos Reais) */}
        {activeFilter === 'tudo' && (
          <div>
            <h2 className="text-lg font-bold text-white mb-2.5">Sua Biblioteca Tech</h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
              
              <div className="w-32 bg-[#181818] p-3 rounded-md shrink-0 border border-gray-800">
                <div 
                  style={{ background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)' }}
                  className="w-full aspect-square rounded mb-2 flex items-center justify-center p-5"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-full h-full object-contain" />
                </div>
                <p className="text-xs font-bold text-white truncate">Python & ETL</p>
                <p className="text-[10px] text-gray-400">Pandas, NumPy</p>
              </div>

              <div className="w-32 bg-[#181818] p-3 rounded-md shrink-0 border border-gray-800">
                <div 
                  style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)' }}
                  className="w-full aspect-square rounded mb-2 flex items-center justify-center p-5"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="SQL / Postgres" className="w-full h-full object-contain" />
                </div>
                <p className="text-xs font-bold text-white truncate">SQL & Databases</p>
                <p className="text-[10px] text-gray-400">PostgreSQL, OracleDB</p>
              </div>

              <div className="w-32 bg-[#181818] p-3 rounded-md shrink-0 border border-gray-800">
                <div 
                  style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)' }}
                  className="w-full aspect-square rounded mb-2 flex items-center justify-center p-5"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-full h-full object-contain" />
                </div>
                <p className="text-xs font-bold text-white truncate">React & Node</p>
                <p className="text-[10px] text-gray-400">TypeScript, Express</p>
              </div>

            </div>
          </div>
        )}

        {/* Canais de Contato */}
        <div>
          <h2 className="text-lg font-bold text-white mb-2.5">Conectar</h2>
          <div className="flex gap-2">
            <a
              href="https://wa.me/5521979284282"
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs py-2.5 rounded-full text-center block transition-transform active:scale-95 shadow-md"
            >
              💬 WhatsApp
            </a>
            <a
              href="mailto:samir.sfmss@gmail.com?subject=Contato%20via%20Portfólio"
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-[#007acc] hover:bg-[#005999] text-white font-bold text-xs py-2.5 rounded-full text-center block transition-transform active:scale-95 shadow-md"
            >
              ✉️ E-mail
            </a>
          </div>
        </div>

      </main>

      {/* Mini Player Fixo */}
      <div className="fixed bottom-16 left-2 right-2 bg-[#212121] rounded-md overflow-hidden shadow-2xl border border-white/5 z-40">
        <div className="w-full bg-gray-700 h-0.5">
          <div className="bg-[#1DB954] h-0.5 w-2/3"></div>
        </div>

        <div className="p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <img
              src="./perfil.jfif"
              alt="Capa"
              className="w-10 h-10 rounded object-cover shrink-0"
            />
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">Samir Firmino — Estagiário de TI</p>
              <p className="text-[10px] text-gray-400 truncate">Agência Nacional do Petróleo (ANP)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 pr-1">
            <a href="https://wa.me/5521979284282" target="_blank" rel="noreferrer" className="text-[#1DB954] text-xs font-bold">
              CONTATO
            </a>
            <span className="text-white text-base">▶</span>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800/80 flex justify-around py-3 text-[10px] text-gray-400 z-50">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'inicio' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">🏠</span>
          Início
        </button>

        <button
          onClick={() => setActiveTab('buscar')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'buscar' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">🔍</span>
          Buscar
        </button>

        <button
          onClick={() => setActiveTab('biblioteca')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'biblioteca' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">📚</span>
          Sua Biblioteca
        </button>
      </nav>

    </div>
  );
};

export default MobilePortfolio;