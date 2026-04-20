import React from 'react';
import { Users, Star, AlertTriangle, ShoppingCart, UserPlus } from 'lucide-react';

export const PersonaProfiles: React.FC = () => {
  const personas = [
    {
      name: 'High Value',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      desc: 'Top 10% spenders. Not price-sensitive.',
      traits: ['Premium brand affinity', 'High order frequency', 'Omnichannel shoppers'],
      color: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      tag: 'VIP'
    },
    {
      name: 'Loyal',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      desc: 'Regular buyers with high emotional connection.',
      traits: ['Consistent monthly visits', 'High satisfaction score', 'Referral sources'],
      color: 'bg-blue-50 border-blue-200 text-blue-900',
      tag: 'Advocates'
    },
    {
      name: 'Bargain Seeker',
      icon: <ShoppingCart className="w-6 h-6 text-emerald-500" />,
      desc: 'Price-elastic. Wait for discount cycles.',
      traits: ['Coupon usage > 80%', 'Low AOV', 'Category specific'],
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      tag: 'Value'
    },
    {
      name: 'At Risk',
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      desc: 'Lapsing customers. Haven\'t bought in 90+ days.',
      traits: ['Lapsed frequency', 'Decreased engagement', 'Competitor sensitivity'],
      color: 'bg-red-50 border-red-200 text-red-900',
      tag: 'Danger'
    }
  ];

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center gap-2">
        <div className="h-8 w-1 bg-blue-600 rounded-full" />
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Market Segment Personas</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {personas.map((p) => (
          <div key={p.name} className={`p-6 rounded-2xl border-2 transition-all hover:scale-[1.02] ${p.color}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                {p.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                {p.tag}
              </span>
            </div>
            <h4 className="text-lg font-bold mb-1">{p.name}</h4>
            <p className="text-sm opacity-80 mb-4 h-10">{p.desc}</p>
            <div className="space-y-2">
              {p.traits.map(t => (
                <div key={t} className="flex items-center gap-2 text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
