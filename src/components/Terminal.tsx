import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  outputLog?: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, outputLog = [] }) => {
  const [history, setHistory] = useState<string[]>([
    'Bem-vindo ao Terminal do Samir v1.0.0',
    'Digite "help" para ver a lista de comandos disponíveis.',
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // LIMPEZA RÁPIDA: Quando roda um novo script, limpa o log antigo e exibe a execução atual
  useEffect(() => {
    if (outputLog.length > 0) {
      setHistory(outputLog);
    }
  }, [outputLog]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `samir@portfolio:~$ ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Comandos disponíveis:',
          '  help      - Exibe esta lista de comandos',
          '  skills    - Mostra as principais tecnologias',
          '  contact   - Links de contato',
          '  sudo hire - Processa proposta de contratação 😉',
          '  clear     - Limpa o terminal'
        );
        break;
      case 'skills':
        newHistory.push('Linguagens: Python, SQL, C, Java, TypeScript', 'Ferramentas: Power BI, Git, Pandas, NumPy, ReactJS, PostgreSQL');
        break;
      case 'contact':
        newHistory.push('LinkedIn: linkedin.com/in/samir-firmino-573322265', 'E-mail: samir.sfmss@gmail.com');
        break;
      case 'sudo hire':
        newHistory.push('🚀 [ACROSS] Permissão concedida! Entrando em contato em 3, 2, 1...');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case '':
        break;
      default:
        newHistory.push(`Comando não encontrado: ${cmd}. Digite "help" para ver os comandos.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-36 shrink-0 bg-[#181818] border-t border-white/10 flex flex-col font-mono text-xs text-[#cccccc]">
      {/* Header do Terminal */}
      <div className="flex justify-between items-center bg-[#252526] px-4 py-1 text-[#858585] border-b border-white/10 select-none shrink-0">
        <div className="flex gap-4">
          <span className="text-white font-semibold border-b border-[#007acc] pb-0.5">TERMINAL</span>
          <span>OUTPUT</span>
          <span>DEBUG CONSOLE</span>
        </div>
        <button onClick={onClose} className="hover:text-white transition-colors">✕</button>
      </div>

      {/* Conteúdo do Terminal */}
      <div className="flex-1 p-3 overflow-y-auto space-y-1">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed">{line}</div>
        ))}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-green-500 font-bold shrink-0">samir@portfolio:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white font-mono"
            autoFocus
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};