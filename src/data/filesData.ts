export interface FileItem {
  id: string;
  name: string;
  icon: string;
  language: string;
  content: string;
  category: string;
}

export const initialFiles: FileItem[] = [
  {
    id: 'sobre-mim',
    name: 'sobre_mim.py',
    icon: '🐍',
    language: 'python',
    category: 'principal',
    content: `# --- SOBRE MIM ---
class Desenvolvedor:
    def __init__(self):
        self.nome = "Samir Firmino"
        self.funcao = "Análise de Dados & Automação"
        self.faculdade = "Sistemas de Informação (UniLaSalle - RJ)"
        self.foco = ["SQL", "Python (ETL)", "Power BI", "Dashboards"]

    def resumo(self):
        return (
            "Estudante de Sistemas de Informação com foco em análise de dados, "
            "automações em Python, pipelines de ETL e modelagem de bancos de dados relacionais. "
            "Experiência prática na criação de dashboards estratégicos e otimização de processos."
        )

me = Desenvolvedor()
print(me.resumo())`
  },
  {
    id: 'experiencia',
    name: 'experiencia_anp.py',
    icon: '🛢️',
    language: 'python',
    category: 'experiencia',
    content: `# --- EXPERIÊNCIA PROFISSIONAL ---

def estagio_anp():
    empresa = "Agência Nacional do Petróleo (ANP)"
    cargo = "Estagiário de Análise de Dados e Automação"
    
    atividades = [
        "Desenvolvimento de scripts em Python para automação de rotinas e tratamento de dados",
        "Execução de pipelines ETL utilizando Pandas e NumPy",
        "Consultas complexas e atualização de histórico em banco de dados SQL corporativo",
        "Criação de dashboards interativos no Power BI para suporte a decisões estratégicas"
    ]
    
    return {
        "empresa": empresa,
        "cargo": cargo,
        "impacto": "Otimização de processos manuais e garantia de integridade dos dados."
    }`
  },
  {
    id: 'tcc-projeto',
    name: 'projeto_tcc_cripto.py',
    icon: '📊',
    language: 'python',
    category: 'projetos',
    content: `# --- PROJETO DE TCC / DESTAQUE ---

class CryptoDecisionSupportSystem:
    """
    Sistema de Apoio à Decisão para Investimentos em Criptomoedas
    utilizando Indicadores Técnicos e Score de Risco.
    """
    def __init__(self):
        self.stack = ["Python", "Pandas", "APIs Financeiras", "SQL"]
        self.objetivo = "Analisa ativos do mercado cripto e calcula scores de risco em tempo real."

    def gerar_relatorio(self):
        return "Automação de coleta de dados + Análise quantitativa de risco."`
  },
  {
    id: 'habilidades',
    name: 'habilidades.json',
    icon: '⚙️',
    language: 'json',
    category: 'principal',
    content: `{
  "hard_skills": {
    "linguagens": ["Python", "SQL"],
    "tratamento_dados": ["Pandas", "NumPy", "ETL Pipelines"],
    "visualizacao": ["Power BI", "Dashboards"],
    "bancos_de_dados": ["PostgreSQL", "SQL Server", "MySQL"],
    "ferramentas": ["Git", "GitHub", "VS Code", "Excel Avançado"]
  },
  "soft_skills": [
    "Pensamento Analítico",
    "Resolução de Problemas",
    "Trabalho em Equipe",
    "Comunicação Técnica"
  ]
}`
  },
  {
    id: 'contato',
    name: 'contato.sh',
    icon: '🐚',
    language: 'bash',
    category: 'principal',
    content: `#!/bin/bash
# --- CANAIS DE CONTATO ---

echo "=== VAMOS CONECTAR? ==="
echo "LinkedIn: https://linkedin.com/in/seu-perfil"
echo "GitHub:   https://github.com/seu-usuario"
echo "E-mail:   seu.email@exemplo.com"
echo "Local:    Niterói, RJ - Brasil"
`
  }
];