import React from 'react';
import { 
  VscFiles, 
  VscSearch, 
  VscSourceControl, 
  VscDebugStart, 
  VscExtensions, 
  VscAccount, 
  VscSettingsGear 
} from 'react-icons/vsc';
import { SiPython } from 'react-icons/si';

export const ActivityBar: React.FC = () => {
  return (
    <aside className="w-12 bg-[#333333] flex flex-col justify-between items-center py-2 select-none z-20 shrink-0">
      {/* Ícones do Topo */}
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <button className="p-2 text-white hover:text-white transition-colors border-l-2 border-[#007acc]">
          <VscFiles className="w-5 h-5" />
        </button>

        <button className="p-2 hover:text-white transition-colors relative">
          <VscSearch className="w-5 h-5" />
        </button>

        <button className="p-2 hover:text-white transition-colors relative">
          <VscSourceControl className="w-5 h-5" />
          <span className="absolute top-1 right-1 bg-[#007acc] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            8
          </span>
        </button>

        <button className="p-2 hover:text-white transition-colors">
          <VscDebugStart className="w-5 h-5" />
        </button>

        <button className="p-2 hover:text-white transition-colors relative">
          <VscExtensions className="w-5 h-5" />
          <span className="absolute top-1 right-1 bg-[#007acc] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            1
          </span>
        </button>

        {/* Ícone do Python Clássico (Substituiu a cobrinha verde) */}
        <button className="p-2 hover:text-white transition-colors" title="Python Extension">
          <SiPython className="w-5 h-5 text-[#3776ab] hover:text-[#ffd43b] transition-colors" />
        </button>
      </div>

      {/* Ícones do Rodapé */}
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <button className="p-2 hover:text-white transition-colors relative">
          <VscAccount className="w-5 h-5" />
          <span className="absolute top-1 right-1 bg-[#007acc] text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
            1
          </span>
        </button>

        <button className="p-2 hover:text-white transition-colors">
          <VscSettingsGear className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

export default ActivityBar;