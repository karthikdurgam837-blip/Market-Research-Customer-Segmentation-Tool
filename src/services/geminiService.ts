export interface MarketInsight {
  title: string;
  description: string;
  strategy: string;
}

export const getAIInsights = async (statsSummary: string): Promise<MarketInsight[]> => {
  try {
    const response = await fetch('/api/ai/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statsSummary })
    });

    if (!response.ok) throw new Error('API server error');
    
    return await response.json();
  } catch (error) {
    console.error("Gemini Proxy Error:", error);
    return [
      {
        title: "Retain High-Value Customers",
        description: "Your High-Value segment is small but critical.",
        strategy: "Launch a tiered loyalty program focusing on exclusive early access."
      },
      {
        title: "Re-engage At-Risk Users",
        description: "Significant churn risk detected in the At-Risk segment.",
        strategy: "Deploy automated 'We Miss You' email campaigns with a high-value discount."
      }
    ];
  }
};
