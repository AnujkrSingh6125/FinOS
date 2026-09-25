import { MultiAgentScenario } from "@/types/analysis";
import { MOCK_MULTI_AGENT_SCENARIOS } from "@/lib/mock/analysis";

export const analysisApi = {
  /**
   * Fetch all pre-configured multi-agent analysis scenarios.
   */
  async getScenarios(): Promise<MultiAgentScenario[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...MOCK_MULTI_AGENT_SCENARIOS]), 150);
    });
  },

  /**
   * Fetch a specific scenario by ID.
   */
  async getScenarioById(id: string): Promise<MultiAgentScenario | null> {
    const scenario = MOCK_MULTI_AGENT_SCENARIOS.find((s) => s.id === id);
    return scenario ? { ...scenario } : null;
  },

  /**
   * Execute custom multi-agent analysis based on user prompt.
   */
  async runMultiAgentAnalysis(prompt: string): Promise<MultiAgentScenario> {
    // Check if prompt matches an existing scenario
    const clean = prompt.toLowerCase();
    const matched = MOCK_MULTI_AGENT_SCENARIOS.find(
      (s) => clean.includes("rbi") || clean.includes("rate") || clean.includes("hike")
    );

    if (matched && !clean.includes("chip") && !clean.includes("semiconductor")) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ ...matched, userPrompt: prompt }), 800);
      });
    }

    const techMatched = MOCK_MULTI_AGENT_SCENARIOS.find(
      (s) => clean.includes("chip") || clean.includes("semi") || clean.includes("nvidia") || clean.includes("tech")
    );

    if (techMatched) {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ ...techMatched, userPrompt: prompt }), 800);
      });
    }

    // Dynamic fallback scenario
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `custom-${Date.now()}`,
          title: "Multi-Agent Synthesis: Comprehensive Capital Assessment",
          description: `Collaborative multi-agent analysis evaluating: "${prompt}"`,
          category: "Macroeconomic",
          userPrompt: prompt,
          involvedAgentIds: ["macro", "investment", "risk", "portfolio", "news"],
          signals: [
            {
              agentId: "macro",
              agentName: "Macro Economy Agent",
              verdict: "Optimized",
              confidence: 92,
              finding: "Macroeconomic telemetry supports ongoing stability with low sovereign debt volatility.",
              rationale: "Yield curve dynamics indicate moderate growth with steady consumer purchasing power.",
              timestamp: new Date().toLocaleTimeString(),
              dataPoint: "Inflation Target: 4.0% | FX Vol: 4.2%",
            },
            {
              agentId: "risk",
              agentName: "Risk Agent",
              verdict: "Low Risk",
              confidence: 96,
              finding: "Aggregate downside variance is well within risk budgets; 99% VaR is capped.",
              rationale: "Diversification across fixed income and equities dampens single-asset shocks.",
              timestamp: new Date().toLocaleTimeString(),
              dataPoint: "Beta: 0.88 | Sharpe: 2.18",
            },
            {
              agentId: "portfolio",
              agentName: "Portfolio Agent",
              verdict: "Bullish",
              confidence: 95,
              finding: "Underlying portfolio cash flow generation remains positive (+24.95% return YTD).",
              rationale: "Core positions (TCS, HDFC Bank, Reliance) exhibit strong balance sheet moats.",
              timestamp: new Date().toLocaleTimeString(),
              dataPoint: "NAV: ₹88.71L | Cash: 4.0%",
            },
            {
              agentId: "investment",
              agentName: "Investment Agent",
              verdict: "Bullish",
              confidence: 90,
              finding: "Recommend continuing systematic capital deployment into fundamentally undervalued tranches.",
              rationale: "Valuation multiples are reasonable relative to historical 5-year averages.",
              timestamp: new Date().toLocaleTimeString(),
              dataPoint: "Forward P/E: 21.4x | ROE: 18.2%",
            },
          ],
          consensusVerdict: "Unified Consensus: High Confidence Allocation — No Tactical Intervention Needed",
          consensusScore: 93,
          riskLevel: "Low",
          unifiedInsights: [
            "All 5 participating agents reached strong consensus on capital safety and market positioning.",
            "No single position breaches institutional concentration or regulatory guidelines.",
            "Liquidity is optimal to absorb near-term macro surprises.",
          ],
          actionPlan: {
            immediate: ["Maintain strategic asset weights according to current IPS."],
            mediumTerm: ["Re-evaluate factor loading at next month-end reconciliation."],
          },
          explainability: {
            graphRAGContext: "Executed GraphRAG entity resolution over active holdings and latest macro signals.",
            decisionEngineWeighting: [
              { agent: "Risk Agent", weight: 0.30 },
              { agent: "Macro Economy Agent", weight: 0.25 },
              { agent: "Portfolio Agent", weight: 0.25 },
              { agent: "Investment Agent", weight: 0.20 },
            ],
            auditId: `FINOS-AUDIT-${Date.now()}`,
          },
        });
      }, 900);
    });
  },
};
