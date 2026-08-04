import React, { useState } from 'react';
// Importação dos ícones profissionais SVG (Spotify Style)
import { 
  IoPlaySharp, 
  IoPauseSharp, 
  IoPlaySkipBackSharp, 
  IoPlaySkipForwardSharp, 
  IoSearchOutline, 
  IoLibraryOutline, 
  IoHomeOutline, 
  IoLogoWhatsapp,
  IoHeartOutline,
  IoHeart 
} from "react-icons/io5";
import { FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";

interface MobilePortfolioProps {
  onSwitchToIde?: () => void;
}

interface Track {
  id: string;
  title: string;
  subtitle: string;
  techs: string;
  desc: string;
  iconUrl: string;
  mediaUrl?: string; // Link de vídeo/GIF para a prévia do projeto
  color: string;
  category: 'projetos' | 'experiencia';
}

const tracks: Track[] = [
  {
    id: 'petflow',
    title: 'Petflow',
    subtitle: 'Full Stack System',
    techs: 'React • Node.js • Express • PostgreSQL',
    desc: 'Sistema de gestão pet shop completo com API RESTful em produção no Render e banco PostgreSQL relacional.',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: 'from-cyan-900/80 via-slate-900 to-[#121212]',
    category: 'projetos',
  },
  {
    id: 'krypton-ai',
    title: 'Krypton AI',
    subtitle: 'TCC • Decision Support System',
    techs: 'Python • REST APIs • WebSockets • SQL',
    desc: 'Sistema de Apoio à Decisão para investimentos em criptomoedas com score de risco calculado em tempo real.',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'from-purple-900/80 via-slate-900 to-[#121212]',
    category: 'projetos',
  },
  {
    id: 'anp',
    title: 'Análise de Dados na ANP',
    subtitle: 'Agência Nacional do Petróleo • 2024 - 2026',
    techs: 'SQL • Python • Power BI • OracleDB',
    desc: 'Pipelines ETL, modelagem relacional SQL e dashboards no Power BI resultando em 10% de redução no tempo de processos mensais.',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqldeveloper/sqldeveloper-original.svg',
    color: 'from-emerald-900/80 via-slate-900 to-[#121212]',
    category: 'experiencia',
  },
  {
    id: 'deal-closer',
    title: 'Deal Closer AI',
    subtitle: 'Agente IA • Comercial',
    techs: 'Python • LLM APIs • Automations',
    desc: 'Agente inteligente de vendas focado em análise de intenção de compra e suporte ao fechamento comercial.',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: 'from-blue-900/80 via-slate-900 to-[#121212]',
    category: 'projetos',
  },
  {
    id: 'devchef',
    title: 'DevChef',
    subtitle: 'Web App Recomendador',
    techs: 'ReactJS • TypeScript • Node.js',
    desc: 'Aplicação web reativa para busca e gestão de receitas personalizadas otimizadas para rotinas de alto desempenho.',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: 'from-amber-900/80 via-slate-900 to-[#121212]',
    category: 'projetos',
  },
];

export const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ onSwitchToIde }) => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'biblioteca'>('inicio');
  const [activeFilter, setActiveFilter] = useState<'tudo' | 'projetos' | 'experiencia'>('tudo');
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [isPlayerDismissed, setIsPlayerDismissed] = useState(false); // Controle de exibição do Mini Player
  const [showVideoPreview, setShowVideoPreview] = useState(false);
  const [likedTracks, setLikedTracks] = useState<string[]>(['petflow', 'anp']);
  const [searchQuery, setSearchQuery] = useState('');

  // Estados para capturar gesto de swipe/arraste para baixo
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedTracks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setShowVideoPreview(false);
    setIsPlayerDismissed(false); // Reexibe o player caso estivesse oculto
  };

  // Manipuladores de Toque para arrastar para baixo e fechar
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diffY = touchEndY - touchStartY;

    // Se arrastou mais de 40px para baixo
    if (diffY > 40) {
      setIsPlayerDismissed(true);
    }
    setTouchStartY(null);
  };

  const filteredTracks = tracks.filter((t) => {
    const matchesFilter =
      activeFilter === 'tudo' ||
      (activeFilter === 'projetos' && t.category === 'projetos') ||
      (activeFilter === 'experiencia' && t.category === 'experiencia');

    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.techs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans flex flex-col justify-between pb-36 select-none relative overflow-hidden">
      
      {/* 1. Header Fixo com Troca para IDE & Filtros */}
      <header className="px-4 pt-4 pb-2 space-y-3 sticky top-0 bg-[#121212]/95 backdrop-blur-md z-30 border-b border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="./perfil.jfif"
              alt="Samir Firmino"
              className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-lg"
            />
            <span className="text-xl font-bold tracking-tight text-white">
              {activeTab === 'inicio' ? 'Início' : activeTab === 'buscar' ? 'Buscar' : 'Sua Biblioteca'}
            </span>
          </div>

          {onSwitchToIde && (
            <button
              onClick={onSwitchToIde}
              className="flex items-center gap-1.5 text-[11px] bg-[#282828] text-gray-200 hover:text-white border border-gray-700/60 px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-md font-medium"
            >
              <span>💻</span> Modo IDE
            </button>
          )}
        </div>

        {/* Pílulas de Filtro na Home */}
        {activeTab === 'inicio' && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none text-xs font-medium">
            {(['tudo', 'projetos', 'experiencia'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap capitalize transition-all ${
                  activeFilter === filter ? 'bg-[#1DB954] text-black font-bold' : 'bg-[#282828] text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 2. Conteúdo Dinâmico por Aba */}
      <main className="px-4 flex-1 space-y-6 pt-2">
        
        {/* ABA: INÍCIO */}
        {activeTab === 'inicio' && (
          <>
            {/* Dashboard de Métricas & KPIs de Carreira (Foco em Dados) */}
            <div>
              <h2 className="text-lg font-bold text-white mb-2.5 flex items-center gap-2">
                <span>📈</span> Dashboard de Impacto
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#181818] p-3 rounded-lg border border-emerald-500/30 space-y-1">
                  <span className="text-xs text-gray-400 font-medium">Horas na ANP</span>
                  <p className="text-xl font-black text-[#1DB954]">-10%</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Redução de tempo em rotinas de dados</p>
                </div>

                <div className="bg-[#181818] p-3 rounded-lg border border-blue-500/30 space-y-1">
                  <span className="text-xs text-gray-400 font-medium">Pipelines ETL</span>
                  <p className="text-xl font-black text-blue-400">+5</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Automações em Python (Pandas)</p>
                </div>

                <div className="bg-[#181818] p-3 rounded-lg border border-purple-500/30 space-y-1">
                  <span className="text-xs text-gray-400 font-medium">Bancos de Dados</span>
                  <p className="text-xl font-black text-purple-400">4</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Postgres, OracleDB, SQLServer, MySQL</p>
                </div>

                <div className="bg-[#181818] p-3 rounded-lg border border-amber-500/30 space-y-1">
                  <span className="text-xs text-gray-400 font-medium">Relatórios & BI</span>
                  <p className="text-xl font-black text-amber-400">+15</p>
                  <p className="text-[10px] text-gray-400 leading-tight">Dashboards com DAX & Power Query</p>
                </div>
              </div>
            </div>

            {/* Seção Recentes em Grade de 2 Colunas */}
            <div>
              <h2 className="text-lg font-bold text-white mb-2.5">Mais Tocados</h2>
              <div className="grid grid-cols-2 gap-2">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    className={`p-2 rounded-md flex items-center gap-2.5 cursor-pointer transition-all active:scale-95 border ${
                      currentTrack.id === track.id
                        ? 'bg-[#282828] border-[#1DB954]/50'
                        : 'bg-[#282828]/60 hover:bg-[#383838] border-transparent'
                    }`}
                  >
                    <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center shrink-0 p-2 border border-white/10">
                      <img src={track.iconUrl} alt={track.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="truncate flex-1">
                      <p className={`text-xs font-bold truncate ${currentTrack.id === track.id ? 'text-[#1DB954]' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">{track.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Destaque Principal: Experiência ANP */}
            <div 
              style={{ background: 'linear-gradient(90deg, rgba(2, 44, 34, 0.6) 0%, #181818 100%)' }}
              className="p-4 rounded-xl border border-emerald-500/20 space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#1DB954] tracking-widest flex items-center gap-1">
                  ✓ Estágio Ativo
                </span>
                <span className="text-[10px] text-gray-400 bg-black/40 px-2 py-0.5 rounded">2024 - 2026</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Agência Nacional do Petróleo (ANP)</h3>
                <p className="text-xs text-[#1DB954]">Estagiário em Análise de Dados & Automação</p>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Desenvolvimento de pipelines ETL em Python, modelagem de banco de dados relacional SQL e dashboards no Power BI resultando em 10% de ganho operacional mensal.
              </p>
              <button
                onClick={() => handleSelectTrack(tracks.find((t) => t.id === 'anp')!)}
                className="bg-[#1DB954] text-black font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 transition-transform active:scale-95 shadow-lg"
              >
                <IoPlaySharp size={14} /> Tocar Detalhes da Experiência
              </button>
            </div>

            {/* Carrossel da Stack Tech */}
            <div>
              <h2 className="text-lg font-bold text-white mb-2.5">Sua Biblioteca Tech</h2>
              <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
                {[
                  { name: 'Python & ETL', detail: 'Pandas, NumPy, Automation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                  { name: 'SQL & Data', detail: 'PostgreSQL, OracleDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
                  { name: 'React & Node', detail: 'TypeScript, Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
                  { name: 'Linguagem C', detail: 'Estrutura de Dados & Ponteiros', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
                  { name: 'JavaScript', detail: 'ES6+, Async, DOM Manipulation', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
                ].map((item, idx) => (
                  <div key={idx} className="w-32 bg-[#181818] p-3 rounded-md shrink-0 border border-gray-800/80">
                    <div
                      style={{ background: 'linear-gradient(135deg, rgba(29, 185, 84, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)' }}
                      className="w-full aspect-square rounded mb-2 flex items-center justify-center p-4 border border-white/5"
                    >
                      <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-400 truncate leading-tight">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações de Contato Rápidas */}
            <div className="pt-2 pb-6">
              <h2 className="text-lg font-bold text-white mb-2.5">Conectar Profissionalmente</h2>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/5521979284282?text=Fala%20Samir,%20vi%20seu%20portf%C3%B3lio%20estilo%20Spotify%20e%20gostaria%20de%20conversar!"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs py-3.5 rounded-full text-center flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
                >
                  <IoLogoWhatsapp size={16} /> WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/samir-firmino-573322265"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#007acc] hover:bg-[#005999] text-white font-bold text-xs py-3.5 rounded-full text-center flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
                >
                  <FaLinkedinIn size={16} /> LinkedIn
                </a>
              </div>
            </div>
          </>
        )}

        {/* ABA: BUSCAR */}
        {activeTab === 'buscar' && (
          <div className="space-y-4 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="O que você quer analisar hoje? (Ex: Python, SQL, React)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#282828] text-white text-xs px-4 py-3 rounded-lg border border-gray-700 outline-none focus:border-[#1DB954] transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3.5 text-xs text-gray-400">
                  ✕
                </button>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-300">Resultados da Busca</h3>
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  className="bg-[#181818] p-3 rounded-lg border border-gray-800 flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#282828] rounded p-2 border border-white/5">
                      <img src={track.iconUrl} alt={track.title} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{track.title}</p>
                      <p className="text-[10px] text-gray-400">{track.techs}</p>
                    </div>
                  </div>
                  <IoPlaySharp className="text-[#1DB954]" size={16} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABA: SUA BIBLIOTECA */}
        {activeTab === 'biblioteca' && (
          <div className="space-y-4 pt-1">
            <h2 className="text-base font-bold text-white">Seus Projetos Salvos</h2>
            <div className="space-y-2">
              {tracks
                .filter((t) => likedTracks.includes(t.id))
                .map((track) => (
                  <div
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    className="bg-[#181818] p-3 rounded-lg border border-gray-800 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#282828] rounded p-2 border border-white/5">
                        <img src={track.iconUrl} alt={track.title} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{track.title}</p>
                        <p className="text-[10px] text-[#1DB954] font-medium">✓ Salvo na Biblioteca tech</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => toggleLike(track.id, e)} 
                      className="p-1 active:scale-125 transition-transform"
                    >
                      {likedTracks.includes(track.id) ? (
                        <IoHeart size={20} className="text-[#1DB954]" />
                      ) : (
                        <IoHeartOutline size={20} className="text-gray-400 hover:text-white" />
                      )}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

      </main>

      {/* 3. Mini Player Fixo no Rodapé (Arrastar p/ baixo ou clicar no ✕ fecha) */}
      {!isPlayerDismissed && (
        <div
          onClick={() => setIsPlayerExpanded(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ bottom: '64px' }}
          className="fixed left-2 right-2 bg-[#212121] rounded-lg overflow-hidden shadow-2xl border border-white/10 z-40 cursor-pointer transition-all active:scale-98"
        >
          {/* Indicador sutil de puxar para baixo */}
          <div className="w-8 h-1 bg-gray-600/60 rounded-full mx-auto my-1"></div>

          <div className="px-2.5 pb-2.5 pt-0.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate flex-1">
              <div className="w-10 h-10 bg-[#121212] rounded p-1.5 shrink-0 border border-white/10">
                <img src={currentTrack.iconUrl} alt="Icon" className="w-full h-full object-contain" />
              </div>
              <div className="truncate flex-1">
                <p className="text-xs font-bold text-white truncate">{currentTrack.title} — {currentTrack.subtitle}</p>
                <p className="text-[10px] text-[#1DB954] font-medium truncate">Análise de Dados Jr / TI</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 pr-1">
              <button
                onClick={(e) => toggleLike(currentTrack.id, e)}
                className="p-1 active:scale-125 transition-transform"
              >
                {likedTracks.includes(currentTrack.id) ? (
                  <IoHeart size={18} className="text-[#1DB954]" />
                ) : (
                  <IoHeartOutline size={18} className="text-gray-400 hover:text-white" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                className="text-white active:scale-90 transition-transform p-1"
              >
                {isPlaying ? <IoPauseSharp size={20} /> : <IoPlaySharp size={20} />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayerDismissed(true);
                }}
                className="text-gray-400 hover:text-white p-1 text-xs font-bold"
                title="Fechar Player"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL EXPANSÍVEL: Full Screen Now Playing + Preview Profissional */}
      {isPlayerExpanded && (
        <div
          style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 50%, #121212 100%)' }}
          className="fixed inset-0 z-50 p-6 flex flex-col justify-between animate-in slide-in-from-bottom duration-300"
        >
          {/* Header do Modal */}
          <div className="flex justify-between items-center text-xs text-gray-300 z-10 shrink-0">
            <button onClick={() => setIsPlayerExpanded(false)} className="text-white text-2xl p-1 active:scale-90 transition-transform">
              ✕
            </button>
            <span className="uppercase tracking-widest text-[10px] font-bold text-white/80">Tocando do Portfólio</span>
            <button 
              onClick={(e) => toggleLike(currentTrack.id, e)} 
              className="p-1 active:scale-125 transition-transform"
            >
              {likedTracks.includes(currentTrack.id) ? (
                <IoHeart size={24} className="text-[#1DB954]" />
              ) : (
                <IoHeartOutline size={24} className="text-gray-300 hover:text-white" />
              )}
            </button>
          </div>

          {/* Área Central: Capa ou Vídeo/GIF de Demonstração */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-5 w-full min-h-0 py-4">
            
            {/* Container da Mídia (Aspecto Quadrado Profissional) */}
            <div className="w-full max-w-sm aspect-square bg-[#1e1e1e] rounded-2xl p-4 border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden shrink-0">
              {showVideoPreview && currentTrack.mediaUrl ? (
                <img
                  src={currentTrack.mediaUrl}
                  alt="Demonstração do Projeto"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-32 h-32">
                  <img src={currentTrack.iconUrl} alt="Logo Tech" className="w-full h-full object-contain" />
                </div>
              )}
            </div>

            {/* Texto e Tags de Sintaxe */}
            <div className="w-full text-left space-y-1 shrink-0 px-1">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-extrabold text-white tracking-tight truncate">{currentTrack.title}</h2>
                {currentTrack.mediaUrl && (
                  <button
                    onClick={() => setShowVideoPreview(!showVideoPreview)}
                    className="text-[10px] bg-black/40 text-gray-300 border border-gray-700 px-3 py-1 rounded-full font-semibold"
                  >
                    {showVideoPreview ? '🖼️ Capa' : '🎬 Preview'}
                  </button>
                )}
              </div>
              <p className="text-xs font-medium text-[#1DB954]">{currentTrack.techs}</p>
              <p className="text-[11px] text-gray-300 leading-relaxed font-sans pt-1.5">{currentTrack.desc}</p>
            </div>
          </div>

          {/* Player Controls & Timeline (Estilo Nativo) */}
          <div className="space-y-5 shrink-0 pt-2 z-10 px-1">
            <div className="space-y-1.5">
              <div className="w-full bg-gray-700/60 h-1 rounded-full overflow-hidden">
                <div className="bg-white h-full w-2/3"></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>01:45</span>
                <span>02:30</span>
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
              <button
                onClick={() => {
                  const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
                  const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
                  setCurrentTrack(tracks[prevIndex]);
                  setShowVideoPreview(false);
                }}
                className="text-gray-300 hover:text-white active:scale-75 transition-transform"
              >
                <IoPlaySkipBackSharp size={30} />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-3xl font-bold shadow-xl active:scale-95 transition-transform"
              >
                {isPlaying ? <IoPauseSharp size={38} /> : <IoPlaySharp size={38} className="pl-1" />}
              </button>

              <button
                onClick={() => {
                  const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
                  const nextIndex = (currentIndex + 1) % tracks.length;
                  setCurrentTrack(tracks[nextIndex]);
                  setShowVideoPreview(false);
                }}
                className="text-gray-300 hover:text-white active:scale-75 transition-transform"
              >
                <IoPlaySkipForwardSharp size={30} />
              </button>
            </div>

            <a
              href="mailto:samir.sfmss@gmail.com?subject=Contato%20via%20Portf%C3%B3lio%20Spotify"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#1DB954] text-black font-bold text-xs py-3.5 rounded-full text-center flex items-center justify-center gap-2"
            >
              <FaRegEnvelope size={16} /> Enviar E-mail para o Desenvolvedor Jr
            </a>
          </div>
        </div>
      )}

      {/* 5. Barra de Navegação Inferior (Rodapé Estilo Nativo) */}
      <nav 
        style={{ height: '60px' }}
        className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-sm border-t border-gray-800/80 flex justify-around py-2.5 text-[10px] text-gray-400 z-50 px-2"
      >
        <button
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center gap-1.5 ${activeTab === 'inicio' ? 'text-white font-bold' : ''}`}
        >
          <IoHomeOutline size={20} />
          Início
        </button>

        <button
          onClick={() => setActiveTab('buscar')}
          className={`flex flex-col items-center gap-1.5 ${activeTab === 'buscar' ? 'text-white font-bold' : ''}`}
        >
          <IoSearchOutline size={20} />
          Buscar
        </button>

        <button
          onClick={() => setActiveTab('biblioteca')}
          className={`flex flex-col items-center gap-1.5 ${activeTab === 'biblioteca' ? 'text-white font-bold' : ''}`}
        >
          <IoLibraryOutline size={20} />
          Biblioteca
        </button>
      </nav>

    </div>
  );
};

export default MobilePortfolio;