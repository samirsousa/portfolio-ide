import React, { useState } from 'react';

interface MobilePortfolioProps {
  onSwitchToIde?: () => void;
}

export const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ onSwitchToIde }) => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'projetos' | 'experiencia' | 'contato'>('inicio');

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans flex flex-col justify-between pb-20">
      {/* Top Bar com botão de troca para IDE */}
      <div
        style={{ background: 'linear-gradient(180deg, #282828 0%, #121212 100%)' }}
        className="px-4 pt-4 flex justify-between items-center pb-4"
      >
        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Portfólio / Spotify Edition</span>
        {onSwitchToIde && (
          <button
            onClick={onSwitchToIde}
            className="flex items-center gap-1.5 text-[11px] bg-[#282828] text-white hover:bg-[#3e3e3e] border border-gray-700 px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-md"
          >
            <span>💻</span> Modo IDE
          </button>
        )}
      </div>

      {/* Conteúdo Principal */}
      <main className="px-4 flex-1 space-y-6">

        {/* Header do Artista / Desenvolvedor */}
        <div className="flex items-center gap-4 pt-2">
          <img
            src="./perfil.jfif"
            alt="Foto de Samir Firmino"
            className="w-20 h-20 rounded-full object-cover shadow-2xl border-2 border-[#1DB954]"
          />
          <div className="space-y-1">
            <span className="text-[10px] text-[#1DB954] font-bold uppercase tracking-widest flex items-center gap-1">
              ✓ Desenvolvedor Verificado
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">Samir Firmino</h1>
            <p className="text-xs text-gray-400">Análise de Dados & Automação | UniLaSalle</p>
          </div>
        </div>

        {/* Botão de Seguir / Contato Rápido */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/5521979284282"
            target="_blank"
            rel="noreferrer"
            className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs px-6 py-2.5 rounded-full transition-all active:scale-95 shadow-lg"
          >
            Seguir no WhatsApp
          </a>
          <a
            href="https://github.com/samirsousa"
            target="_blank"
            rel="noreferrer"
            className="border border-gray-600 hover:border-white text-white font-bold text-xs px-4 py-2.5 rounded-full transition-all"
          >
            GitHub
          </a>
        </div>

        {/* MUDANÇA DE ABAS */}
        {activeTab === 'inicio' && (
          <div className="space-y-6 pt-2">
            {/* Populares / Destaques */}
            <div>
              <h2 className="text-base font-bold mb-3">Mais Tocadas (Destaques)</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#282828] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm font-bold w-4">1</span>
                    <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center text-lg">📊</div>
                    <div>
                      <p className="text-xs font-semibold text-white">Krypton AI (TCC)</p>
                      <p className="text-[10px] text-gray-400">Python • Decision Support System</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#1DB954] bg-[#1DB954]/10 border border-[#1DB954]/30 px-2 py-0.5 rounded-full">Em Dev</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#282828] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm font-bold w-4">2</span>
                    <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center text-lg">🐾</div>
                    <div>
                      <p className="text-xs font-semibold text-white">Petflow</p>
                      <p className="text-[10px] text-gray-400">ReactJS • Node.js • PostgreSQL</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 rounded-full">Full Stack</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#282828] transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm font-bold w-4">3</span>
                    <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center text-lg">🤝</div>
                    <div>
                      <p className="text-xs font-semibold text-white">Deal Closer AI</p>
                      <p className="text-[10px] text-gray-400">Agente de IA • Vendas</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-blue-400 bg-blue-400/10 border border-blue-400/30 px-2 py-0.5 rounded-full">IA</span>
                </div>
              </div>
            </div>

            {/* Playlists / Tech Stack */}
            <div>
              <h2 className="text-base font-bold mb-3">Sua Biblioteca Tech</h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#181818] p-3 rounded-lg hover:bg-[#282828] transition-colors border border-gray-800">
                  <span className="text-[#1DB954] text-lg block mb-1">🐍</span>
                  <p className="font-bold text-white">Python & Dados</p>
                  <p className="text-[10px] text-gray-400 mt-1">Pandas, NumPy, ETL Pipelines</p>
                </div>
                <div className="bg-[#181818] p-3 rounded-lg hover:bg-[#282828] transition-colors border border-gray-800">
                  <span className="text-[#1DB954] text-lg block mb-1">🗄️</span>
                  <p className="font-bold text-white">SQL & BI</p>
                  <p className="text-[10px] text-gray-400 mt-1">Power BI, OracleDB, Postgres</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projetos' && (
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-[#1DB954]">Discografia de Projetos</h2>

            <div className="space-y-3">
              <div className="bg-[#181818] border border-gray-800 p-3.5 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-white">📊 Krypton AI</h3>
                  <span className="text-[10px] text-[#1DB954]">TCC / Python</span>
                </div>
                <p className="text-xs text-gray-400">Sistema de Apoio à Decisão para investimentos em criptomoedas com score de risco.</p>
              </div>

              <div className="bg-[#181818] border border-gray-800 p-3.5 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-white">🐾 Petflow</h3>
                  <span className="text-[10px] text-cyan-400">Full Stack</span>
                </div>
                <p className="text-xs text-gray-400">Gestão para pet shops em ReactJS, Node.js e PostgreSQL hospedado no Render.</p>
              </div>

              <div className="bg-[#181818] border border-gray-800 p-3.5 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-white">🤝 Deal Closer AI</h3>
                  <span className="text-[10px] text-blue-400">Agente IA</span>
                </div>
                <p className="text-xs text-gray-400">Agente de inteligência artificial para automação e apoio ao fechamento comercial.</p>
              </div>

              <div className="bg-[#181818] border border-gray-800 p-3.5 rounded-lg space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-white">👨‍🍳 DevChef</h3>
                  <span className="text-[10px] text-emerald-400">Web App</span>
                </div>
                <p className="text-xs text-gray-400">Aplicação web para recomendação de receitas personalizadas para desenvolvedores.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experiencia' && (
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-[#1DB954]">Experiência Profissional</h2>
            <div className="bg-[#181818] border border-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-white">Estagiário em Análise de Dados</h3>
                  <p className="text-xs text-[#1DB954]">Agência Nacional do Petróleo (ANP)</p>
                </div>
                <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">2024 - 2026</span>
              </div>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1 pt-2">
                <li>Otimização de rotinas resultando em redução de 10% nas horas mensais.</li>
                <li>Modelagem de banco de dados relacional em SQL.</li>
                <li>Dashboards interativos em Power BI com DAX e Power Query.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'contato' && (
          <div className="space-y-4 pt-2">
            <h2 className="text-base font-bold text-[#1DB954]">Conectar & Contato</h2>
            <div className="bg-[#181818] border border-gray-800 p-4 rounded-lg space-y-3">
              <div className="space-y-1 text-xs text-gray-300">
                <p><strong className="text-white">E-mail:</strong> samir.sfmss@gmail.com</p>
                <p><strong className="text-white">Telefone:</strong> +55 21 97928-4282</p>
                <p><strong className="text-white">Localização:</strong> Niterói, RJ</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="https://wa.me/5521979284282"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs py-2.5 rounded-full text-center block transition-all"
                >
                  💬 Chamar no WhatsApp
                </a>
                <a
                  href="mailto:samir.sfmss@gmail.com?subject=Contato%20via%20Portfólio"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-[#007acc] hover:bg-[#005999] text-white font-bold text-xs py-2.5 rounded-full text-center block transition-all"
                >
                  ✉️ Enviar E-mail
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mini Player Fixo na parte inferior */}
      <div className="fixed bottom-14 left-2 right-2 bg-[#282828] p-2.5 rounded-md flex items-center justify-between shadow-2xl border border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1DB954] rounded flex items-center justify-center text-black font-bold text-xs">
            ANP
          </div>
          <div>
            <p className="text-xs font-bold text-white">Análise de Dados & ETL</p>
            <p className="text-[10px] text-gray-400">Samir Firmino • Tocando agora</p>
          </div>
        </div>
        <div className="text-[#1DB954] text-sm pr-2">▶</div>
      </div>

      {/* Barra de Navegação Inferior (Estilo App Spotify) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#000000] border-t border-gray-800 flex justify-around py-2 text-[10px] text-gray-400">
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'inicio' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">🏠</span>
          Início
        </button>

        <button
          onClick={() => setActiveTab('projetos')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'projetos' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">🚀</span>
          Projetos
        </button>

        <button
          onClick={() => setActiveTab('experiencia')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'experiencia' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">💼</span>
          Experiência
        </button>

        <button
          onClick={() => setActiveTab('contato')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'contato' ? 'text-white font-bold' : ''}`}
        >
          <span className="text-base">✉️</span>
          Contato
        </button>
      </nav>
    </div>
  );
};

export default MobilePortfolio;