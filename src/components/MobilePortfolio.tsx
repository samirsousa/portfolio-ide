import React, { useState } from 'react';

interface MobilePortfolioProps {
  onSwitchToIde?: () => void;
}

export const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ onSwitchToIde }) => {
  const [activeTab, setActiveTab] = useState<'sobre' | 'experiencia' | 'projetos' | 'skills' | 'contato'>('sobre');

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans px-4 py-6 flex flex-col gap-6">
      {/* Botão para alternar para modo IDE no celular */}
      {onSwitchToIde && (
        <div className="flex justify-end">
          <button
            onClick={onSwitchToIde}
            className="flex items-center gap-1.5 text-[11px] bg-[#21262d] text-gray-300 hover:text-white border border-gray-700 px-3 py-1.5 rounded-full transition-all active:scale-95"
          >
            <span>💻</span> Modo IDE VS Code
          </button>
        </div>
      )}

      {/* Perfil Header Minimalista */}
      <header className="flex flex-col gap-3 border-b border-gray-800 pb-5">
        <div className="flex items-center gap-4">
          {/* Foto de Perfil */}
          <img
            src="./perfil.jfif"
            alt="Foto de Samir Firmino"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#007acc] shadow-md shrink-0"
          />
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Samir Firmino</h1>
            <p className="text-xs text-[#58a6ff] font-medium">@samirsousa</p>
            <p className="text-xs text-gray-400 mt-0.5">Análise de Dados & Automação | Sistemas de Informação</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          Estudante de Sistemas de Informação (UniLaSalle - RJ). Experiência em ETL com Python, SQL, Power BI e desenvolvimento web.
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>📍 Niterói, RJ</span>
          <span>•</span>
          <a href="https://github.com/samirsousa" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">
            GitHub
          </a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/samir-firmino-573322265" target="_blank" rel="noreferrer" className="text-[#58a6ff] hover:underline">
            LinkedIn
          </a>
        </div>
      </header>

      {/* Navegação por Abas */}
      <nav className="flex items-center gap-2 overflow-x-auto pb-2 text-xs border-b border-gray-800 scrollbar-none">
        {[
          { id: 'sobre', label: 'Sobre' },
          { id: 'experiencia', label: 'Experiência' },
          { id: 'projetos', label: 'Projetos' },
          { id: 'skills', label: 'Stack' },
          { id: 'contato', label: 'Contato' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${activeTab === tab.id
              ? 'bg-[#1f6feb] text-white font-medium'
              : 'bg-[#161b22] text-gray-400 hover:text-white border border-gray-800'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Conteúdo dos Cards */}
      <main className="flex-1 space-y-4">
        {activeTab === 'sobre' && (
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 space-y-3">
            <h2 className="text-sm font-semibold text-[#58a6ff] flex items-center gap-2">
              <span>Sobre Mim</span>
            </h2>
            <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
              <p>
                Atuo no desenvolvimento de soluções voltadas para análise de dados, automação de processos e integração de sistemas.
              </p>
              <p className="text-gray-400">
                Foco principal em pipelines ETL com Python (Pandas/NumPy), modelagem de bancos de dados relacionais e construção de dashboards estratégicos em Power BI.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'experiencia' && (
          <div className="space-y-3">
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white">Estagiário em Análise de Dados</h3>
                  <p className="text-xs text-[#58a6ff]">Agência Nacional do Petróleo (ANP)</p>
                </div>
                <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">2024 - 2026</span>
              </div>
              <ul className="text-xs text-gray-300 list-disc list-inside space-y-1 pt-2">
                <li>Atualização e histórico de dados relacionais em SQL.</li>
                <li>Automações com Python reduzindo rotinas manuais.</li>
                <li>Criação de dashboards no Power BI com DAX e Power Query.</li>
                <li>Otimização de rotinas resultando em redução de 10% nas horas de trabalho mensais.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'projetos' && (
          <div className="space-y-3">
            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>📊</span> SAD Criptomoedas (TCC)
                </h3>
                <span className="text-[10px] text-green-400 border border-green-500/30 px-2 py-0.5 rounded bg-green-500/10">Em dev</span>
              </div>
              <p className="text-xs text-gray-300">
                Sistema de Apoio à Decisão para investimentos em criptomoedas integrando APIs em tempo real e score de risco automatizado.
              </p>
            </div>

            <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🛒</span> Gerenciador de Supermercado
              </h3>
              <p className="text-xs text-gray-300">
                Sistema desenvolvido em linguagem C para controle de estoque e vendas com regras operacionais simuladas.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 space-y-4">
            <h2 className="text-sm font-semibold text-[#58a6ff]">Habilidades Técnicas</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0d1117] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-400 block mb-1">Linguagens</span>
                <span className="text-white font-medium">Python, SQL, C, Java</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-400 block mb-1">Dados & BI</span>
                <span className="text-white font-medium">Power BI, Pandas, OracleDB</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-400 block mb-1">Web</span>
                <span className="text-white font-medium">ReactJS, TypeScript, Node.js</span>
              </div>
              <div className="bg-[#0d1117] p-2.5 rounded-lg border border-gray-800">
                <span className="text-gray-400 block mb-1">Ferramentas</span>
                <span className="text-white font-medium">Git, GitHub, Docker, n8n</span>
              </div>
            </div>
          </div>
        )}

       {activeTab === 'contato' && (
  <div className="bg-[#161b22] border border-gray-800 rounded-xl p-4 space-y-3">
    <h2 className="text-sm font-semibold text-[#58a6ff]">Canais de Contato</h2>
    <div className="space-y-2 text-xs">
      <p className="text-gray-300"><strong className="text-white">E-mail:</strong> samir.sfmss@gmail.com</p>
      <p className="text-gray-300"><strong className="text-white">Telefone:</strong> +55 21 97928-4282</p>
      <p className="text-gray-300"><strong className="text-white">Localização:</strong> Niterói, RJ</p>
    </div>

   <div className="pt-1 flex flex-col gap-2">
  {/* Botão WhatsApp */}
  <a
    href="https://wa.me/5521979284282"
    target="_blank"
    rel="noreferrer"
    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium text-xs py-2 rounded-lg text-center block transition-colors"
  >
    💬 Chamar no WhatsApp
  </a>

  {/* Botão E-mail com Gradiente Gmail */}
  <a
    href="mailto:samir.sfmss@gmail.com?subject=Contato%20via%20Portfólio"
    target="_blank"
    rel="noreferrer"
    style={{ background: 'linear-gradient(90deg, #ea4335, #fbbc05, #34a853, #4285f4)' }}
    className="w-full text-white font-semibold text-xs py-2 rounded-lg text-center block transition-all active:scale-[0.98] shadow-md border border-white/10"
  >
    ✉️ Enviar E-mail
  </a>
</div>
  </div>
)}

      </main>
    </div>
  );
};

export default MobilePortfolio;