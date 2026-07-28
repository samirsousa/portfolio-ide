export interface FileItem {
    id: string;
    name: string;
    language: string;
    content: string;
}

export const initialFiles: FileItem[] = [
    {
        id: 'sobre-mim',
        name: 'sobre_mim.py',
        language: 'python',
        content: `# ==============================================================================
# Samir Firmino Martins de Sousa
# Estagiário em Análise de Dados & Automação | Sistemas de Informação (UniLaSalle)
# ==============================================================================

class SamirFirmino:
    def __init__(self):
        self.nome = "Samir Firmino Martins de Sousa"
        self.cargo = "Estagiário de TI / Análise de Dados"
        self.local = "Niterói, RJ - Brasil"
        self.faculdade = "Bacharelado em Sistemas de Informação (7º Período)"
        
        self.foco = [
            "Pipelines ETL (Python / Pandas / NumPy)",
            "Modelagem e Consultas Avançadas em SQL",
            "Criação de Dashboards Estratégicos no Power BI",
            "Automação de Processos & Integração de APIs"
        ]

    def resumo(self):
        return (
            "Estudante de Sistemas de Informação focado em resolver problemas reais "
            "através da análise de dados, otimização de consultas e automação de rotinas."
        )

me = SamirFirmino()
print(me.resumo())
`,
    },
    {
        id: 'experiencia',
        name: 'experiencia_anp.py',
        language: 'python',
        content: `# ==============================================================================
# Experiência Profissional - Agência Nacional do Petróleo (ANP)
# Período: Abril 2024 - Abril 2026
# ==============================================================================

class ExperienciaANP:
    def __init__(self):
        self.empresa = "Agência Nacional do Petróleo, Gás Natural e Biocombustíveis (ANP)"
        self.funcao = "Estagiário em Análise de Dados"
        self.tecnologias = ["SQL", "Python", "Power BI", "OracleDB", "DAX", "Power Query"]

    def impactos_e_conquistas(self):
        return {
            "eficiencia": "Redução de 10% no total de horas de trabalho mensais através de automação.",
            "banco_de_dados": "Modelagem de histórico e atualizações em tabelas relacionais SQL.",
            "dashboards": "Construção de relatórios interativos no Power BI para tomada de decisão.",
            "etl": "Desenvolvimento de rotinas de extração e carga de dados em Python."
        }

anp = ExperienciaANP()
`,
    },
    {
        id: 'tcc-projeto',
        name: 'projeto_tcc_cripto.py',
        language: 'python',
        content: `# ==============================================================================
# Projeto de TCC: Support Decision System - Criptomoedas
# ==============================================================================

class SAD_Criptomoedas:
    def __init__(self):
        self.nome = "Sistema de Apoio à Decisão para Investimento em Cripto"
        self.status = "Em desenvolvimento"
        self.stack = ["Python", "ReactJS", "REST APIs", "SQL", "WebSockets"]

    def detalhes(self):
        return (
            "Sistema voltado para análise técnica e fundamentalista de criptomoedas, "
            "coletando dados em tempo real para cálculo automatizado de score de risco."
        )
`,
    },
    {
        id: 'habilidades',
        name: 'habilidades.json',
        language: 'json',
        content: `{
  "desenvolvedor": "Samir Firmino",
  "linguagens": ["Python", "SQL", "C", "Java", "TypeScript", "JavaScript"],
  "dados_e_bi": ["Power BI (DAX / Power Query)", "Pandas", "NumPy", "ETL Pipelines"],
  "bancos_de_dados": ["SQL Server", "OracleDB", "PostgreSQL"],
  "web_e_ferramentas": ["ReactJS", "Node.js", "Git", "GitHub", "Docker", "n8n"]
}
`,
    },
    {
        id: 'contato',
        name: 'contato.sh',
        language: 'bash',
        content: `#!/bin/bash

# Canais de Contato
echo "E-mail:   samir.sfmss@gmail.com"
echo "Telefone: +55 21 97928-4282"
echo "LinkedIn: https://www.linkedin.com/in/samir-firmino-573322265"
echo "GitHub:   https://github.com/samirsousa"
echo "Local:    Niterói, RJ"
`,
    },
];