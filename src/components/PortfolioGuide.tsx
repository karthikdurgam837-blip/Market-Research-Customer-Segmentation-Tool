import React from 'react';
import { Copy, CheckCircle2, Github, Linkedin, FileText, Layout, FileSpreadsheet, ListTodo } from 'lucide-react';

export const PortfolioGuide: React.FC = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections = [
    {
      id: 'excel-formulas',
      title: 'Advanced Excel Formulas',
      icon: <FileSpreadsheet className="w-5 h-5 text-blue-600" />,
      content: `Use these key formulas for the "Segmentation Logic" sheet:
- Total Revenue: =SUM(tblTransactions[Amount])
- Segment Classification: 
  =IFS(
    AND([@TotalSpending]>50000, [@PurchaseFreq]>5), "High Value",
    [@PurchaseFreq]>7, "Loyal",
    AND([@Recency]>90, [@PurchaseFreq]<2), "At Risk",
    TRUE, "Potential"
  )
- Dynamic Title: ="Market Report for " & TEXT(TODAY(), "MMM YYYY")`,
    },
    {
      id: 'readme-content',
      title: 'GitHub README.md Template',
      icon: <Github className="w-5 h-5 text-slate-900" />,
      content: `# Market Research & Customer Segmentation Tool

## 📈 Objective
Analyze customer behavior and segment them into actionable groups (Loyal, At-Risk, High-Value) using RFM analysis and demographic profiling.

## 🛠️ Tools Used
- **Advanced Excel**: Power Query, Pivot Tables, XLOOKUP, Data Visualization.
- **Customer Analytics**: RFM (Recency, Frequency, Monetary) Modelling.

## 📊 Key Highlights
- Cleaned and processed 100+ raw customer transaction records.
- Performed multi-variant segmentation based on income and spending habits.
- Built interactive dashboard with Slicers, Timelines, and Automated KPIs.

## 💡 Business Insights
- High-Value segment contributes to 65% of total revenue but only 15% of the customer base.
- Targeted discounts to "Bargain Seekers" increased retention by 12%.`,
    },
    {
      id: 'linkedin-post',
      title: 'LinkedIn Showcase Content',
      icon: <Linkedin className="w-5 h-5 text-blue-700" />,
      content: `🚀 Just wrapped up a data-driven project: "Market Research & Customer Segmentation Tool"!

In today's competitive landscape, understanding your customer is everything. I built this tool to bridge the gap between raw data and strategic marketing.

Key Features:
✅ Dynamic RFM Analysis (Recency, Frequency, Monetary)
✅ Automated Dashboard with real-time KPI updates
✅ Segment-wise Revenue & Category Preference Analysis

By identifying "At-Risk" segments early, businesses can deploy proactive retention strategies and optimize marketing spend.

Check out my full project on GitHub: [Your Link Here]

#CustomerAnalytics #MarketResearch #DataScience #Excel #BusinessIntelligence #AnalyticsProject`,
    },
    {
        id: 'resume-bullet',
        title: 'Resume & ATS Optimization',
        icon: <FileText className="w-5 h-5 text-emerald-600" />,
        content: `**Market Research Analyst | Project**
- Developed an automated Customer Segmentation Tool in Excel, analyzing 100+ customer records to identify 5 critical market segments.
- Utilized RFM Modelling and Pivot Tables to uncover trends, resulting in identifying segments responsible for 60% of top-line growth.
- Designed an interactive KPI Dashboard with Slicers and dynamic visualizations for executive-level reporting.`,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
      {sections.map((section) => (
        <div key={section.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              {section.icon}
              <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">{section.title}</h4>
            </div>
            <button 
              onClick={() => copyToClipboard(section.content, section.id)}
              className="p-1.5 hover:bg-slate-200 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied === section.id ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
          <div className="p-6 flex-grow">
            <pre className="text-sm font-mono text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
              {section.content}
            </pre>
          </div>
        </div>
      ))}
      <div className="md:col-span-2 bg-blue-900 text-blue-50 p-8 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ListTodo className="w-6 h-6" />
            Final Implementation Checklist
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
                'Dataset has 100+ rows with consistent Customer IDs',
                'Segments calculated using IF/IFS/RFM logic',
                'Pivot Tables created for Segment vs Revenue',
                'Slicers linked to all Pivot Charts',
                'Color theme follows Corporate Blue palettes',
                'GitHub Repository name: Market-Research-Segmentation-Tool',
                'README includes screenshots of your Dashboard',
                'LinkedIn post mentions the "Business Impact" of insights'
            ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    {item}
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
