import React from 'react';
import { FileItem } from '../data/filesData';

interface SidebarProps {
  files: FileItem[];
  activeFileId: string;
  onSelectFile: (file: FileItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ files, activeFileId, onSelectFile }) => {
  return (
    <aside className="w-64 bg-black/20 text-[#cccccc] flex flex-col border-r border-white/10 select-none">
      <div className="p-3 text-xs font-bold uppercase tracking-wider text-gray-400">
        Explorador
      </div>
      <div className="px-3 py-1 text-xs text-gray-400 font-semibold flex items-center gap-1">
        <span>▼</span> portfolio-samir
      </div>
      <nav className="mt-1 flex-1">
        {files.map((file) => {
          const isActive = file.id === activeFileId;
          return (
            <button
              key={file.id}
              onClick={() => onSelectFile(file)}
              className={`w-full text-left px-6 py-1.5 text-sm flex items-center gap-2 hover:bg-white/10 transition-colors ${
                isActive ? 'bg-white/20 text-white font-medium' : ''
              }`}
            >
              <span>{file.icon}</span>
              <span>{file.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};