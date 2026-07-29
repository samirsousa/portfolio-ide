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
        id: 'krypton-ai',
        name: 'krypton_ai.py',
        language: 'python',
        content: `# ==============================================================================
# Krypton AI - Decision Support System for Cryptocurrency Investments
# TCC - Bacharelado em Sistemas de Informação
# ==============================================================================

class KryptonAI:
    def __init__(self, asset_symbol: str = "BTC/USD"):
        self.symbol = asset_symbol
        self.status = "Em desenvolvimento"
        self.stack = ["Python", "ReactJS", "REST APIs", "SQL", "WebSockets"]
        self.risk_score = 0.0

    def calculate_risk_index(self, volatility: float, market_sentiment: float) -> float:
        """
        Calcula o score de risco do ativo integrando volatilidade e sentimento de mercado em tempo real.
        """
        self.risk_score = (volatility * 0.6) + ((1 - market_sentiment) * 0.4)
        return round(self.risk_score, 2)

krypton = KryptonAI("BTC/USD")
score = krypton.calculate_risk_index(volatility=0.45, market_sentiment=0.78)
print(f"krypton_ai status: ACTIVE | Risk Score [{krypton.symbol}]: {score}")
`,
    },
    {
        id: 'petflow',
        name: 'petflow.tsx',
        language: 'typescript',
        content: `import React from 'react';

// ==============================================================================
// Petflow - Sistema de Gestão Pet Shop (Full Stack)
// Stack: ReactJS + Node.js/Express + PostgreSQL (Render API)
// ==============================================================================

export const PetflowApp: React.FC = () => {
  const systemInfo = {
    frontend: "ReactJS + TypeScript + Tailwind CSS",
    backend: "Node.js com Express",
    database: "PostgreSQL Relacional",
    hosting: "API em Produção no Render"
  };

  return (
    <div className="petflow-container">
      <h1> Petflow System</h1>
      <p>Automação e gestão operacional para pet shops.</p>
      <ul>
        <li>Frontend: {systemInfo.frontend}</li>
        <li>Backend: {systemInfo.backend}</li>
        <li>Database: {systemInfo.database}</li>
        <li>Status: {systemInfo.hosting}</li>
      </ul>
    </div>
  );
};
`,
    },
    {
        id: 'deal-closer-ai',
        name: 'deal_closer_ai.py',
        language: 'python',
        content: `# ==============================================================================
# Deal Closer AI - Agente Inteligente Orientado a Vendas
# ==============================================================================

class DealCloserAI:
    def __init__(self):
        self.modelo = "Agente Comercial Orientado a Tomada de Decisão"
        self.foco = "Apoio ao Fechamento Comercial e Qualificação de Leads"

    def analyze_lead_intent(self, interaction_history: list) -> str:
        """
        Analisa o histórico do lead e categoriza a intenção de compra.
        """
        if "orçamento" in interaction_history and "urgente" in interaction_history:
            return "HIGH_PRIORITY_CLOSING"
        return "NURTURING"

agent = DealCloserAI()
status = agent.analyze_lead_intent(["solicitou demonstração", "orçamento", "urgente"])
print(f"Deal Status: {status}")
`,
    },
    {
        id: 'devchef',
        name: 'devchef.tsx',
        language: 'typescript',
        content: `import React from 'react';

// ==============================================================================
// DevChef - Gestão e Busca de Receitas Otimizadas para Devs (Full Stack)
// ==============================================================================

export const DevChefApp: React.FC = () => {
  return (
    <div className="devchef-app">
      <h1> DevChef</h1>
      <p>Aplicação web para busca e gestão de receitas personalizadas.</p>
    </div>
  );
};
`,
    },
    {
        id: 'supermercado',
        name: 'supermercado.c',
        language: 'c',
        content: `/*
 * ==============================================================================
 * Gerenciador de Supermercado
 * Controle de estoque e simulação de vendas operacionais
 * ==============================================================================
 */

#include <stdio.h>

int main() {
    printf(" Gerenciador de Supermercado v1.0\\n");
    printf("Sistema de controle de estoque e caixa inicializado.\\n");
    return 0;
}
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
  "web_e_ferramentas": ["ReactJS", "Node.js", "Express", "Git", "GitHub", "Docker", "n8n"]
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