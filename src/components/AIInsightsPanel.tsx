import React from 'react';
import { Customer } from '../types';
import { Sparkles, Loader2, Target, Lightbulb, Zap } from 'lucide-react';
import { getAIInsights, MarketInsight } from '../services/geminiService';

interface AIInsightsPanelProps {
  data: Customer[];
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ data }) => {
  const [insights, setInsights] = React.useState<MarketInsight[]>([]);
  const [loading, setLoading] = React.useState(false);

  const generateInsights = async () => {
    setLoading(true);
    
    const segmentSummary = data.reduce((acc: any, curr) => {
      acc[curr.segment] = (acc[curr.segment] || 0) + 1;
      return acc;
    }, {});
    
    const categoryCounts = data.reduce((acc: any, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const statsSummary = `
      Total Customers: ${data.length}
      Segments: ${JSON.stringify(segmentSummary)}
      Avg Spending: ₹${data.length > 0 ? (data.reduce((s, c) => s + c.totalSpending, 0) / data.length).toFixed(0) : 0}
      Categories: ${JSON.stringify(categoryCounts)}
    `;

    const result = await getAIInsights(statsSummary);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-300" />
            AI Strategic Insights
          </h2>
          <p className="text-blue-100/70 text-sm mt-1">Generative AI analysis of your current market segments</p>
        </div>
        <button 
          onClick={generateInsights}
          disabled={loading}
          className="px-6 py-2.5 bg-white text-blue-900 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
          {insights.length > 0 ? 'Regenerate' : 'Analyze Data'}
        </button>
      </div>

      {insights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                {idx === 0 ? <Target className="w-6 h-6" /> : idx === 1 ? <Lightbulb className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
              </div>
              <h4 className="font-bold text-lg mb-2">{insight.title}</h4>
              <p className="text-sm text-blue-100/80 mb-4">{insight.description}</p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">Strategy</p>
                <p className="text-sm italic">{insight.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border-2 border-dashed border-white/20 rounded-2xl">
          <p className="text-blue-200">Click "Analyze Data" for AI-powered business growth recommendations.</p>
        </div>
      )}
    </div>
  );
};
