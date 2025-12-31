import React, { useMemo } from 'react';
import {
  Cpu,
  Globe,
  Zap,
  Shield,
  Activity,
  ArrowRight,
  Terminal
} from 'lucide-react';

function App() {
  // Generate stable random data for visualizations
  const hudBars = useMemo(() => Array.from({ length: 20 }, () => ({
    height: Math.random() * 100,
    opacity: Math.max(0.2, Math.random())
  })), []);

  const tickerData = useMemo(() => {
    const tickers = ["BTC/USD", "ETH/USD", "SOL/USD", "XRP/USD", "USDT/USD", "NAS100", "SPX500", "GOLD"];
    return tickers.map(ticker => ({
      name: ticker,
      change: (Math.random() * 5).toFixed(2),
      isPositive: Math.random() > 0.3
    }));
  }, []);

  return (
    <div className="min-h-screen bg-elias-950 text-slate-300 font-sans selection:bg-elias-accent selection:text-black overflow-x-hidden">

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(30,41,59,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.3)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed w-full z-50 border-b border-elias-800 bg-elias-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-elias-accent/10 border border-elias-accent text-elias-accent flex items-center justify-center rounded">
              <Cpu size={24} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-mono font-bold text-white tracking-widest">ELIAS</span>
              <span className="text-[10px] text-elias-accent uppercase tracking-[0.2em]">CAPITAL</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            <a href="#technology" className="hover:text-elias-accent transition-colors">Technology</a>
            <a href="#performance" className="hover:text-elias-accent transition-colors">Performance</a>
            <a href="#security" className="hover:text-elias-accent transition-colors">Security</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SYSTEM OPERATIONAL
            </div>
            <button className="border border-elias-800 hover:border-elias-accent hover:text-elias-accent hover:bg-elias-accent/5 px-6 py-2 text-sm font-mono font-bold transition-all">
              LOGIN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-elias-gold/20 bg-elias-gold/5 text-elias-gold text-xs font-mono mb-8">
                <Zap size={12} />
                <span>V4.2 ENGINE LIVE</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-none mb-8">
                Autonomous <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-elias-accent to-rose-600">Alpha Generation</span>
              </h1>
              <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
                Deploy high-frequency capital strategies powered by our proprietary neural lattice. Zero latency. Infinite scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-elias-accent text-black px-8 py-4 font-bold flex items-center justify-center gap-2 hover:bg-white transition-all">
                  INITIATE DEPLOYMENT
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-elias-800 text-slate-300 font-mono hover:border-elias-accent hover:text-elias-accent transition-all flex items-center justify-center gap-2">
                  <Terminal size={18} />
                  READ PROTOCOLS
                </button>
              </div>
            </div>

            {/* HUD Visualization */}
            <div className="relative">
              <div className="relative z-10 border border-elias-800 bg-elias-900/50 backdrop-blur-sm p-6 rounded-lg shadow-2xl shadow-elias-accent/5">
                <div className="flex justify-between items-center mb-6 border-b border-elias-800 pb-4">
                  <div className="text-xs font-mono text-elias-accent">LIVE_TELEMETRY</div>
                  <Activity size={16} className="text-emerald-500" />
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between items-center p-3 bg-elias-950/50 rounded border border-elias-800">
                    <span className="text-slate-400">Total Volatility</span>
                    <span className="text-white">12.4%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-elias-950/50 rounded border border-elias-800">
                    <span className="text-slate-400">Yield Optimization</span>
                    <span className="text-emerald-400">+8.92%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-elias-950/50 rounded border border-elias-800">
                    <span className="text-slate-400">Risk Vectors</span>
                    <span className="text-elias-gold">MINIMAL</span>
                  </div>

                  <div className="h-32 mt-4 flex items-end justify-between gap-1 overflow-hidden opacity-50">
                    {hudBars.map((bar, i) => (
                      <div
                        key={i}
                        className="w-full bg-elias-accent/50"
                        style={{
                          height: `${bar.height}%`,
                          opacity: bar.opacity
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Decor */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-elias-accent/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-rose-600/20 rounded-full blur-[100px]" />
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-24 border-t border-elias-800 bg-elias-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Planetary Mesh",
                desc: "Distributed node network ensuring 100% uptime and microsecond execution across all major markets."
              },
              {
                icon: Cpu,
                title: "Neural Core",
                desc: "Self-optimizing algorithmic strategies that adapt to market conditions in real-time."
              },
              {
                icon: Shield,
                title: "Quantum Grade",
                desc: "Military-spec encryption and multi-sig vaults protecting assets at the hardware level."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 border border-elias-800 bg-elias-950/50 hover:border-elias-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-elias-800/50 rounded flex items-center justify-center text-white mb-6 group-hover:bg-elias-accent group-hover:text-black transition-colors">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker Strip */}
      <div className="border-t border-b border-elias-800 bg-black py-4 overflow-hidden flex">
        <div className="flex animate-[slide_20s_linear_infinite] gap-12 whitespace-nowrap px-6 font-mono text-sm text-slate-500">
          {tickerData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span className="text-white font-bold">{item.name}</span>
              <span className={item.isPositive ? "text-emerald-500" : "text-red-500"}>
                {item.isPositive ? "+" : "-"}
                {item.change}%
              </span>
            </div>
          ))}
          {/* Dupe for seamless loop */}
          {tickerData.map((item) => (
            <div key={item.name + '_dup'} className="flex items-center gap-2">
              <span className="text-white font-bold">{item.name}</span>
              <span className={item.isPositive ? "text-emerald-500" : "text-red-500"}>
                {item.isPositive ? "+" : "-"}
                {item.change}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 border-t border-elias-800 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Cpu size={24} className="text-elias-accent" />
              <span className="font-mono font-bold text-white tracking-widest text-lg">ELIAS CAPITAL</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8">
              The architecture of modern wealth. Automated, secure, and infinitely scalable.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="ENTER_EMAIL_ADDRESS"
                className="bg-elias-900 border border-elias-800 px-4 py-3 text-sm font-mono text-white focus:border-elias-accent focus:outline-none w-full max-w-xs"
              />
              <button className="bg-elias-800 hover:bg-elias-accent hover:text-black text-white px-4 py-3 font-mono text-sm font-bold transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>

          <div>
            <div className="font-mono text-xs text-elias-gold mb-6 uppercase tracking-wider">Platform</div>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Neural Engine</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Market Access</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Audit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs text-elias-gold mb-6 uppercase tracking-wider">Company</div>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Elias</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carrers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-elias-900 text-center text-xs text-slate-600 font-mono">
          SYSTEM_ID: EC-992024 • © {new Date().getFullYear()} ELIAS CAPITAL LTD.
        </div>
      </footer>
    </div>
  );
}

export default App;
