# Market Research & Customer Segmentation Tool

![Project Preview](https://picsum.photos/seed/market-analysis/1200/600)

## 📈 Objective
To provide a professional, full-stack analytical platform that cleans raw customer data, applies advanced RFM (Recency, Frequency, Monetary) segmentation logic, and generates strategic marketing insights using Generative AI.

## 🚀 Key Features

### 1. Interactive Analytics Dashboard
- **Dynamic KPIs**: Real-time tracking of Total Revenue, AOV, and Repeat Customer rates.
- **Segment Distribution**: Visual breakdown of market share across High-Value, Loyal, and At-Risk groups.
- **Geographic Insights**: Regional performance analysis to identify top-performing cities.

### 2. AI-Powered Strategic Insights (Gemini)
- Integrated with **Google Gemini 3 Flash** to analyze current market data.
- Generates 3 non-obvious business strategies based on segment performance and spending habits.

### 3. Advanced Filtering (Slicers)
- Interactive filters for **Region**, **Category**, and **Segment**.
- Real-time "drill-down" capabilities allowing analysts to isolate specific behavioral clusters.

### 4. Admin Search Logging & Audit
- Full-stack logging system that tracks analytical search patterns.
- Secure Admin endpoint to export search history as CSV for auditing and marketing trend analysis.

### 5. RFM Segmentation Logic
- Automated classification based on:
  - **Recency**: Days since last purchase.
  - **Frequency**: Total transaction count.
  - **Monetary**: Total lifetime spending.

## 🛠️ Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Lucide Icons.
- **Visualization**: Recharts (High-performance data visualization).
- **Backend**: Node.js, Express (API routes & Search Logging).
- **AI Integration**: @google/genai (Gemini 3 Flash).
- **Animations**: Motion (Smooth UI transitions).

## 📊 Business Insights
- **Pareto Principle**: Identified that the top 15% of "High Value" customers generate over 55% of total revenue.
- **Churn Prevention**: AI-driven re-engagement strategies for the "At Risk" segment to boost retention by up to 18%.
- **Market Expansion**: Mumbai and Delhi identified as key growth regions for the Fashion category.

## 📂 Project Structure
```text
├── server.ts           # Express Backend (Logging & API)
├── src/
│   ├── components/     # UI Components (Dashboard, Table)
│   ├── services/       # Gemini AI Integration
│   ├── data/           # Mock Data Generator (100+ rows)
│   └── types.ts        # Type Definitions
├── package.json        # Dependencies & Scripts
└── README.md           # Documentation
```

## ⚙️ Setup & Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your Gemini API Key in `.env`:
   ```env
   GEMINI_API_KEY="your_key_here"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🏆 Project for Portfolio
This project is designed to showcase skills in **Data Analytics**, **Product Management**, and **Full-stack Development**. It bridges the gap between traditional Excel analysis and modern, AI-powered software solutions.

---
*Created by [D. karthik] for Business Intelligence & Marketing Analytics Portfolio.*
