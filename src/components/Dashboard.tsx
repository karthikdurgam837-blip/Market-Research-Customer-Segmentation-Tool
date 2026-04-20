import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Customer } from '../types';
import { AIInsightsPanel } from './AIInsightsPanel';
import { PersonaProfiles } from './PersonaProfiles';
import { Filter, X } from 'lucide-react';

interface DashboardProps {
  data: Customer[];
}

export const Dashboard: React.FC<DashboardProps> = ({ data: initialData }) => {
  const [filters, setFilters] = React.useState({
    region: '',
    category: '',
    segment: ''
  });
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredData = initialData.filter(c => {
    return (
      (filters.region === '' || c.city === filters.region) &&
      (filters.category === '' || c.category === filters.category) &&
      (filters.segment === '' || c.segment === filters.segment)
    );
  });

  const data = filteredData;

  const cities = Array.from(new Set(initialData.map(c => c.city)));
  const categories = Array.from(new Set(initialData.map(c => c.category)));
  const segments = Array.from(new Set(initialData.map(c => c.segment)));

  // Aggregate data for charts
  const segmentData = data.reduce((acc: any, curr) => {
    const existing = acc.find((i: any) => i.name === curr.segment);
    if (existing) {
      existing.value += 1;
      existing.revenue += curr.totalSpending;
    } else {
      acc.push({ name: curr.segment, value: 1, revenue: curr.totalSpending });
    }
    return acc;
  }, []);

  const cityData = data.reduce((acc: any, curr) => {
    const existing = acc.find((i: any) => i.name === curr.city);
    if (existing) existing.value += 1;
    else acc.push({ name: curr.city, value: 1 });
    return acc;
  }, []).sort((a: any, b: any) => b.value - a.value);

  const categoryData = data.reduce((acc: any, curr) => {
    const existing = acc.find((i: any) => i.name === curr.category);
    if (existing) existing.value += 1;
    else acc.push({ name: curr.category, value: 1 });
    return acc;
  }, []).sort((a: any, b: any) => b.value - a.value);

  const COLORS = ['#0f172a', '#3b82f6', '#60a5fa', '#94a3b8', '#cbd5e1'];

  const stats = [
    { label: 'Total Customers', value: data.length, icon: 'Users' },
    { label: 'Total Revenue', value: `₹${(data.reduce((s, c) => s + c.totalSpending, 0) / 1000000).toFixed(2)}M`, icon: 'CreditCard' },
    { label: 'Avg Order Value', value: `₹${data.length > 0 ? (data.reduce((s, c) => s + c.avgOrderValue, 0) / data.length).toFixed(0) : 0}`, icon: 'ShoppingBag' },
    { label: 'Repeat Rate', value: `${data.length > 0 ? ((data.filter(c => c.type === 'Returning').length / data.length) * 100).toFixed(1) : 0}%`, icon: 'RefreshCw' },
  ];

  return (
    <div className="space-y-6">
      {/* AI Insights - Strategic Premium Feature */}
      <AIInsightsPanel data={data} />

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-4 flex-wrap">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showFilters ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
          </button>
          
          {(filters.region || filters.category || filters.segment) && (
            <button 
              onClick={() => setFilters({ region: '', category: '', segment: '' })}
              className="flex items-center gap-1 text-xs font-bold text-blue-600 uppercase tracking-wider hover:text-blue-800"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>
        <p className="text-xs font-medium text-slate-400">
          Showing <span className="text-slate-900">{data.length}</span> of {initialData.length} records
        </p>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-50 border border-slate-200 rounded-xl">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Region</label>
            <select 
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Regions</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Category</label>
            <select 
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Segment</label>
            <select 
              value={filters.segment}
              onChange={(e) => setFilters({...filters, segment: e.target.value})}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">All Segments</option>
              {segments.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Segment */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Revenue by Customer Segment</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Customer Segment Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Analysis */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Customer Count by Region</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Preference */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Category Preference Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Persona Analysis */}
      <PersonaProfiles />
    </div>
  );
};
