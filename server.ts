import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { GoogleGenAI } from "@google/genai";

interface SearchLog {
  timestamp: string;
  query: string;
}

const searchHistory: SearchLog[] = [];

// Initialize Gemini
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to log search queries
  app.post('/api/search-log', (req, res) => {
    const { query } = req.body;
    if (query) {
      searchHistory.push({
        timestamp: new Date().toISOString(),
        query
      });
      console.log(`[Search Logged]: ${query}`);
    }
    res.json({ success: true });
  });

  // Proxy Gemini requests
  app.post('/api/ai/insights', async (req, res) => {
    const { statsSummary } = req.body;
    
    if (!ai) {
      return res.status(503).json({ error: "Gemini API key not configured on server" });
    }

    try {
      const prompt = `You are an expert Marketing Strategist. Analyze these customer metrics and provide 3 specific, non-obvious business strategies.
      
      METRICS SUMMARY:
      ${statsSummary}
      
      FORMAT: Return ONLY a JSON array of objects with keys: "title", "description", "strategy". Do not include markdown formatting or backticks.`;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = result.text || '[]';
      res.json(JSON.parse(text));
    } catch (error) {
      console.error("Gemini Server Error:", error);
      res.status(500).json({ error: "Failed to generate AI insights" });
    }
  });

  // Admin API to download search history as CSV
  app.get('/api/admin/download-history', (req, res) => {
    const headers = 'Timestamp,Search Query\n';
    const csvContent = searchHistory.map(log => `${log.timestamp},${log.query}`).join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=search_history.csv');
    res.status(200).send(headers + csvContent);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
