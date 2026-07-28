import React, { useState } from 'react';
import { FileItem } from '../data/filesData';
import { FileIcon } from './FileIcon';

interface CommandPaletteProps {
    isOpen: boolean;
    onClose: () => void;
    files: FileItem[];
    onSelectFile: (file: FileItem) => void;
    onSelectTheme: (theme: 'onedark' | 'dracula' | 'monokai') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
    isOpen,
    onClose,
    files,
    onSelectFile,
    onSelectTheme,
}) => {
    const [query, setQuery] = useState('');

    if (!isOpen) return null;

    const filteredFiles = files.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20 backdrop-blur-sm select-none"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#252526] border border-white/10 rounded-lg shadow-2xl w-full max-w-lg overflow-hidden text-xs text-gray-200"
            >
                <div className="p-2 border-b border-white/10">
                    <input
                        type="text"
                        autoFocus
                        placeholder="Digite para buscar um arquivo ou alterar tema..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-[#007acc]"
                    />
                </div>

                <div className="max-h-60 overflow-y-auto p-1">
                    <div className="px-2 py-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        Arquivos
                    </div>
                    {filteredFiles.map((file) => (
                        <button
                            key={file.id}
                            onClick={() => {
                                onSelectFile(file);
                                onClose();
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#04395e] hover:text-white rounded text-left transition-colors"
                        >
                            <FileIcon name={file.name} />
                            <span>{file.name}</span>
                        </button>
                    ))}

                    <div className="px-2 py-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-2 border-t border-white/5 pt-2">
                        Temas do VS Code
                    </div>
                    <button
                        onClick={() => {
                            onSelectTheme('onedark');
                            onClose();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#04395e] hover:text-white rounded text-left transition-colors"
                    >
                        <span>🎨</span>
                        <span>Mudar Tema: One Dark Pro</span>
                    </button>
                    <button
                        onClick={() => {
                            onSelectTheme('dracula');
                            onClose();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#04395e] hover:text-white rounded text-left transition-colors"
                    >
                        <span>🎨</span>
                        <span>Mudar Tema: Dracula</span>
                    </button>
                    <button
                        onClick={() => {
                            onSelectTheme('monokai');
                            onClose();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#04395e] hover:text-white rounded text-left transition-colors"
                    >
                        <span>🎨</span>
                        <span>Mudar Tema: Monokai</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;