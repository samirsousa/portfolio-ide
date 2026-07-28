import React from 'react';

interface StatusBarProps {
  activeFileName: string;
  onToggleMode: () => void;
  onOpenCommandPalette: () => void;
  currentTheme: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeFileName,
  onToggleMode,
  onOpenCommandPalette,
  currentTheme,
}) => {
  return (
    <footer className="h-6 bg-[#007acc] text-white text-xs flex items-center justify-between px-3 select-none z-10">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 font-mono">
          <span>git: main*</span>
        </span>
        <span className="hidden sm:inline font-mono">UTF-8</span>
        <span className="font-mono">{activeFileName}</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCommandPalette}
          className="hover:bg-[#005999] px-2 py-0.5 rounded transition-colors text-[11px] font-mono bg-black/20"
        >
          ⌨️ Ctrl + K (Paleta)
        </button>

        <button
          onClick={onToggleMode}
          className="hover:bg-[#005999] px-2 py-0.5 rounded transition-colors font-semibold"
        >
          📄 Modo Leitura (RH)
        </button>

        <span className="hidden sm:inline font-mono uppercase text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
          {currentTheme}
        </span>
      </div>
    </footer>
  );
};