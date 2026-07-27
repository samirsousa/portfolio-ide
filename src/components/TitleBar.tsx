import React from 'react';

export const TitleBar: React.FC = () => {
  return (
    <header className="h-9 bg-black/50 text-[#cccccc] text-xs flex items-center justify-between px-3 border-b border-white/10 select-none font-sans z-30 cursor-default">
      {/* Menu Superior Esquerdo (Apenas Texto) */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 text-gray-300 text-xs">
          <span className="px-1.5 py-0.5">Arquivo</span>
          <span className="px-1.5 py-0.5">Editar</span>
          <span className="px-1.5 py-0.5">Seleção</span>
          <span className="px-1.5 py-0.5">Exibir</span>
          <span className="px-1.5 py-0.5">Acessar</span>
          <span className="px-1.5 py-0.5">Executar</span>
          <span className="px-1.5 py-0.5">Terminal</span>
          <span className="px-1.5 py-0.5">Ajuda</span>
        </div>
      </div>

      {/* Centro: Barra de Busca Estática */}
      <div className="flex items-center gap-2 flex-1 max-w-md mx-4">
        <div className="hidden sm:flex items-center gap-1 text-gray-400">
          <span className="p-0.5">←</span>
          <span className="p-0.5">→</span>
        </div>
        <div className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1 text-gray-400 flex items-center justify-between text-xs shadow-inner">
          <span className="truncate">🔍 portfolio samir</span>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400 font-mono hidden sm:inline">
            Ctrl + K
          </span>
        </div>
      </div>

      {/* Canto Direito: Ícones e Controles de Janela Estáticos */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-3 text-gray-400">
          <span className="p-1">🔲</span>
          <span className="p-1">📄</span>
        </div>

        {/* Botões Minimizar, Maximizar, Fechar Estáticos */}
        <div className="flex items-center gap-3 text-gray-400">
          <span className="text-xs">―</span>
          <span className="text-xs">🗖</span>
          <span className="text-xs">✕</span>
        </div>
      </div>
    </header>
  );
};