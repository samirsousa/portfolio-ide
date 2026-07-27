import React from 'react';
import { FileItem } from '../data/filesData';
import { FileIcon } from './FileIcon';

interface SidebarProps {
  files: FileItem[];
  activeFileId: string;
  onSelectFile: (file: FileItem) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  files,
  activeFileId,
  onSelectFile,
  isOpen,
  onToggle,
}) => {
  const handleFileClick = (file: FileItem) => {
    onSelectFile(file);
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`bg-[#252526] text-[#cccccc] flex-col border-r border-white/10 select-none z-40 transition-all duration-300 ease-in-out shrink-0
          fixed md:relative top-0 bottom-0 left-0
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 w-64 md:w-60'}
        `}
      >
        <div className="px-4 py-3 md:py-2.5 text-[11px] font-bold tracking-wider text-gray-400 uppercase flex items-center justify-between border-b border-white/5">
          <span>EXPLORADOR</span>
          <button
            onClick={onToggle}
            className="md:hidden text-gray-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        <div className="p-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 mb-2 px-2 flex items-center gap-1.5">
            <span className="text-[10px]">▼</span>
            <FileIcon name="folder" isFolder={true} isOpen={true} />
            <span>portfolio-samir</span>
          </div>

          <div className="flex flex-col gap-0.5">
            {files.map((file) => {
              const isActive = file.id === activeFileId;

              return (
                <button
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  className={`w-full flex items-center gap-2 px-3 py-1.5 rounded text-xs text-left transition-colors ${
                    isActive
                      ? 'bg-[#37373d] text-white font-medium'
                      : 'hover:bg-[#2a2d2e] text-gray-300'
                  }`}
                >
                  <FileIcon name={file.name} />
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};