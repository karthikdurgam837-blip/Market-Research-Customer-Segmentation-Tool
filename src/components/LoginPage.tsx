import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, BarChart3, ShieldCheck, TrendingUp, Users, Activity, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginPageProps {
  onLogin: (user: { name: string; role: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('analyst@marketmind.ai');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallingEmail, setFallingEmail] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFallingEmail(null);
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation: success only if email matches exactly
      if (email === 'analyst@marketmind.ai' && password === 'password123') {
        onLogin({ name: 'Market Analyst', role: 'Premium Admin' });
      } else {
        setError('ACCESS_DENIED: Security credentials do not match our database.');
        setFallingEmail(email); // Trigger the falling effect
        setEmail(''); // Clear for drama
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setError(null);
    setFallingEmail(null);
    setEmail('analyst@marketmind.ai');
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Falling Email Effect Overlay */}
      <AnimatePresence>
        {fallingEmail && (
          <motion.div 
            initial={{ y: -20, opacity: 1 }}
            animate={{ 
              y: 1200, 
              opacity: 0, 
              rotate: [0, 45, 90],
              x: [0, 50, -50]
            }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="fixed top-[45%] left-1/2 -translate-x-1/2 z-[100] text-red-500 font-mono font-bold text-xl pointer-events-none select-none blur-[1px]"
          >
            {fallingEmail}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Left Column: Graphics & Brand */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tighter uppercase italic">MarketMind</span>
          </div>

          <h1 className="text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
            Precision <span className="text-blue-500">Customer</span> Analytics Engine
          </h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Uncover hidden patterns, segment your audience with AI, and drive growth through data-backed strategies.
          </p>

          {/* Floating Data Graphic */}
          <div className="grid grid-cols-2 gap-6 relative">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">Revenue Growth</span>
              </div>
              <div className="text-3xl font-bold text-white">+32.4%</div>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[70%]" />
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-sm font-bold text-slate-300 uppercase tracking-widest">New Segments</span>
              </div>
              <div className="text-3xl font-bold text-white">12</div>
              <div className="mt-2 flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="h-4 w-1.5 rounded-full bg-blue-400/40" />)}
              </div>
            </motion.div>

            {/* Decorative Connection Line */}
            <div className="absolute -bottom-10 -right-10 opacity-20">
              <Activity className="w-32 h-32 text-blue-500 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-10 text-white">
             <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8" />
             </div>
             <h2 className="text-2xl font-bold italic tracking-tighter">MARKETMIND</h2>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
              <p className="text-slate-400">Strategic intelligence is waiting for you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div 
                    key="error-box"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex flex-col items-center gap-3 text-center"
                  >
                    <div className="bg-red-500/20 p-2 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-xs font-bold text-red-200 tracking-wider">
                      {error}
                    </p>
                    <button 
                      type="button" 
                      onClick={handleReset}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-red-400 transition-all shadow-lg shadow-red-500/20"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Try Again
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="login-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-1">Access Email</label>
                      <div className="relative group">
                        <Mail className="w-5 h-5 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-slate-900 border ${fallingEmail ? 'border-red-500/50 ring-2 ring-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-slate-800'} text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm`}
                          placeholder="analyst@marketmind.ai"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 px-1">Security Key</label>
                      <div className="relative group">
                        <Lock className="w-5 h-5 text-slate-600 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-slate-500">
                      <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors">
                        <input type="checkbox" className="rounded-md border-slate-800 bg-slate-900 text-blue-600 focus:ring-0 focus:ring-offset-0" defaultChecked />
                        Stay Auth
                      </label>
                      <a href="#" className="hover:text-blue-400 transition-colors">Reset Key?</a>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-70 group"
                    >
                      {isLoading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Initialize Dashboard
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white uppercase overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i+10}/32/32`} alt="user" referrerPolicy="no-referrer" />
                    </div>
                  ))}
               </div>
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  Encrypted Access
               </div>
            </div>
          </div>
          
          <p className="text-center mt-10 text-slate-600 text-xs font-bold uppercase tracking-[0.3em]">
            Precision Analytics Platform v4.2
          </p>
        </motion.div>
      </div>
    </div>
  );
};

