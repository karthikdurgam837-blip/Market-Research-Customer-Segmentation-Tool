import React from 'react';
import { Customer } from '../types';
import { Search } from 'lucide-react';

interface DataTableProps {
  data: Customer[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const exportCSV = () => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(c => Object.values(c).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'market_research_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Analytical Customer Repository</h3>
          <p className="text-xs text-slate-500 font-medium">Export raw data for advanced Excel processing</p>
        </div>
        <button 
          onClick={exportCSV}
          disabled={data.length === 0}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Export CSV for Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] font-black tracking-[0.1em]">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Segment</th>
                <th className="px-6 py-4 text-right">Income</th>
                <th className="px-6 py-4 text-right">Total Spend</th>
                <th className="px-6 py-4">Last Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.slice(0, 50).map((customer) => (
                <tr key={customer.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-400">{customer.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="font-bold text-slate-900">{customer.name}</div>
                    <div className="text-[10px] opacity-60 uppercase font-bold">{customer.age}y, {customer.gender}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{customer.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${
                      customer.segment === 'High Value' ? 'bg-emerald-100 text-emerald-700' :
                      customer.segment === 'Loyal' ? 'bg-blue-100 text-blue-700' :
                      customer.segment === 'At Risk' ? 'bg-red-100 text-red-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-right font-medium">₹{(customer.income/100000).toFixed(1)}L</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">₹{customer.totalSpending.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-medium">{customer.lastPurchaseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-32 text-center">
            <div className="bg-slate-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-200">
               <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">No Matches Found</h4>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">None of your current customer records match the applied filters or search query.</p>
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing <span className="text-blue-600">{Math.min(data.length, 50)}</span> of <span className="text-slate-900">{data.length}</span> Records • Dataset Sync v1.4
        </div>
      )}
    </div>
  );
};
