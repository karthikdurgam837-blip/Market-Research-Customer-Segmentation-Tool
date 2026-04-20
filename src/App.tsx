import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart3, 
  Database, 
  FileText, 
  Search,
  Download,
  Share2,
  ShieldCheck,
  LogOut,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { DataTable } from './components/DataTable';
import { PortfolioGuide } from './components/PortfolioGuide';
import { LoginPage } from './components/LoginPage';
import { mockCustomers } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'dataset' | 'portfolio'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  // Check for existing session
  useEffect(() => {
    const saved = localStorage.getItem('marketmind_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('marketmind_user');
      }
    }
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return mockCustomers;
    const query = searchQuery.toLowerCase();
    return mockCustomers.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.city.toLowerCase().includes(query) ||
      c.segment.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData);
    localStorage.setItem('marketmind_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('marketmind_user');
  };

  const logSearch = async (query: string) => {
    if (!query.trim()) return;
    try {
      await fetch('/api/search-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
    } catch (e) {
      console.error('Failed to log search', e);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      logSearch(searchQuery);
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden lg:flex flex-col border-r border-slate-800">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <BarChart3 className="w-6 h-6" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">MarketMind</span>
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <PieChartIcon className="w-5 h-5" />
            <span className="font-medium">Analytics Tool</span>
          </button>
          <button 
            onClick={() => setActiveTab('dataset')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'dataset' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Database className="w-5 h-5" />
            <span className="font-medium">Raw Dataset</span>
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Portfolio Guide</span>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center justify-between gap-3 text-sm bg-slate-800/50 p-4 rounded-xl group relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-white font-medium truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.role}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900">
              {activeTab === 'dashboard' && 'Market Research Dashboard'}
              {activeTab === 'dataset' && 'Customer Data Repository'}
              {activeTab === 'portfolio' && 'Project Submission Guide'}
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE DATA
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyPress}
                onBlur={() => logSearch(searchQuery)}
                placeholder="Search customers..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="max-w-7xl mx-auto pb-20">
            {activeTab === 'dashboard' && <Dashboard data={filteredCustomers} />}
            {activeTab === 'dataset' && <DataTable data={filteredCustomers} />}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Project Overview</h2>
                      <p className="mt-2 text-slate-600 leading-relaxed max-w-3xl">
                        This documentation serves as a bridge for students and analysts migrating their logic from Excel to a production-ready portfolio. 
                        Below you will find the exact formulas, README structures, and LinkedIn content requested in the project brief.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-tighter">Admin Controls</span>
                      </div>
                      <a 
                        href="/api/admin/download-history" 
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 transition-all font-sans no-underline whitespace-nowrap"
                      >
                        <Download className="w-3 h-3" />
                        Download Search Logs
                      </a>
                    </div>
                  </div>
                </div>
                <PortfolioGuide />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
