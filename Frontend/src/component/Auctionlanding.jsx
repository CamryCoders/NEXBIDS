import React, { useState, useEffect, } from 'react';
import { Gavel, Activity, Users, ShieldCheck, ArrowRight, Menu, X, Coins, Clock, Sparkles } from 'lucide-react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

export default function AuctionLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [liveBid, setLiveBid] = useState({ price: 1425, user: "Alex_K", time: "Just now" });

 const Navigate=useNavigate()
  useEffect(() => {
    const mockBids = [
      { price: 1450, user: "CryptoWhale", time: "Just now" },
      { price: 1475, user: "Priya_Sharma", time: "Just now" },
      { price: 1500, user: "GavelMaster", time: "Just now" },
      { price: 1550, user: "Elena_R", time: "Just now" }
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setLiveBid(mockBids[index]);
      index = (index + 1) % mockBids.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

const move=()=>{
    Navigate("/Login")
}
const moveToRegister=()=>{
    Navigate("/Register")
}


  return (

<>
 <div className="relative min-h-screen w-full bg-[#0A0A0F] text-slate-100 overflow-x-hidden font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Ambient Premium Glow Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/0 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tl from-cyan-500/15 to-emerald-500/0 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-violet-600/10 blur-[150px] pointer-events-none" />

      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

    
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0A0F]/70 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300">
              <Gavel className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              NEX<span className="text-cyan-400">BID</span>
            </span>
          </div>

        
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#live" className="hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Live Auctions</a>
            <a href="#how-it-works" className="hover:text-white transition-colors duration-200">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors duration-200">Premium Tiers</a>
          </div>

         
          <div className="hidden md:flex items-center gap-4">
            <button
            onClick={move}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200">
              Login
            </button>
            <button
            onClick={moveToRegister}
            className="relative group overflow-hidden px-6 py-2.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-[size:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              Register Now
            </button>
          </div>

          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[#0A0A0F]/95 border-b border-white/5 backdrop-blur-xl px-6 py-6 space-y-6 transition-all duration-300 ease-in-out">
            <div className="flex flex-col gap-4 text-base font-medium">
              <a href="#live" className="text-cyan-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>Live Auctions</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white">How It Works</a>
              <a href="#features" className="text-slate-300 hover:text-white">Premium Tiers</a>
            </div>
            <div className="h-[1px] bg-white/5 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <button
              onClick={(()=>{
                Navigate("/Login")
              })}
              className="w-full py-3 rounded-xl border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/5">
                Login
              </button>
              <button
               onClick={(()=>{
                Navigate("/Register")
              })}
              className="w-full py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-indigo-500">
                Register
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-16 pb-24 flex flex-col lg:flex-column lg:text-center items-center justify-between gap-16 min-h-[calc(100vh-80px)]">
        
        {/* Left Content Column */}
        <div className="flex-1 space-y-8 text-center flex flex-col items-center z-10">
          
          {/* Live System Status Badges */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 bg-white/[0.03] border border-white/10 p-1.5 pr-4 rounded-full backdrop-blur-md animate-fade-in">
            <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase px-2.5 py-1 rounded-full tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live
            </span>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-4">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-indigo-400" /> 14,820 Active Bidders</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-cyan-400" /> 0.3s Match Engine</span>
            </span>
          </div>

          {/* Main Hero Typography */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Bid Smarter. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 filter drop-shadow-[0_2px_20px_rgba(34,211,238,0.2)]">
                Win Faster.
              </span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
              Experience the world's most elegant, sub-millisecond realtime digital auction platform. Bid securely on ultra-premium digital assets, high-end collectibles, and luxury commodities.
            </p>
          </div>

          {/* The Exact Two CTAs Required */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button className="w-full sm:w-auto relative group overflow-hidden px-8 py-4 rounded-2xl text-base font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-[size:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
              Get Started (Register)
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-200 border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center">
              Login to Console
            </button>
          </div>

          {/* Trust Factors / Indicators */}
          {/* <div className="pt-4 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-white/5">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">$42M+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Volume Swapped</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">99.99%</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Uptime SLA</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">&lt; 5ms</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Order Latency</p>
            </div>
          </div> */}

        </div>

        {/* Right Complex Interactive Live UI Column */}
        {/* <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center items-center relative z-10"> */}
          
          {/* Decorative Glowing Backdrop Box */}
          {/* <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-[32px] blur-3xl transform rotate-3 scale-95 pointer-events-none" /> */}

          {/* Core Feature Showcase Item Panel */}
          {/* <div className="w-full max-w-lg border border-white/10 bg-gradient-to-b from-[#13131F] to-[#0D0D14] rounded-[28px] p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group"> */}
            
            {/* Top Interactive Glass Header */}
            {/* <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Hyperion Yacht Club #042</h3>
                  <p className="text-xs text-slate-500 font-medium">Premium Digital Ownership Lot</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold rounded-lg flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin [animation-duration:4s]" /> 04m 12s
              </span>
            </div> */}

            {/* Simulated Live Asset Display Box */}
            {/* <div className="relative my-5 aspect-[4/3] rounded-2xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-black border border-white/5 overflow-hidden flex flex-col items-center justify-center p-8 group-hover:border-white/10 transition-colors"> */}
              
              {/* Asset Glowing Graphic */}
              {/* <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] relative">
                <Gavel className="w-10 h-10 text-black stroke-[2.5]" />
                <div className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-25 [animation-duration:2s]" />
              </div> */}

              {/* Realtime Bid Indicator Ribbon */}
              {/* <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-black tracking-wider text-slate-400">Current Vault Price</p>
                  <p className="text-lg font-black text-emerald-400 flex items-center gap-1">
                    <Coins className="w-4 h-4" /> {liveBid.price.toLocaleString()} USDC
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase font-bold text-cyan-400 animate-pulse">● Highest Bidder</p>
                  <p className="text-xs font-bold text-white tracking-wide">{liveBid.user}</p>
                </div>
              </div> */}
            {/* </div> */}

            {/* Quick Live Bid Interactive Simulation Ticker */}
            {/* <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-semibold">
                <span>Recent Smart Contract Activity</span>
                <span className="text-slate-600">Updated: {liveBid.time}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs transition-all duration-300 transform scale-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono font-medium text-slate-300">{liveBid.user}</span>
                  </div>
                  <span className="font-bold text-emerald-400">+{liveBid.price} USDC</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-transparent text-xs opacity-40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                    <span className="font-mono font-medium text-slate-400">OxThor_99</span>
                  </div>
                  <span className="font-bold text-slate-400">+1,400 USDC</span>
                </div>
              </div>
            </div> */}

            {/* Micro Safe Seal Indicator */}
            {/* <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
              <ShieldCheck className="w-4 h-4 text-cyan-500" /> End-to-End Cryptographic Escrow Guarded
            </div> */}

          {/* </div> */}

          {/* Secondary Floating UI Mini Card for Depth */}
          {/* <div className="hidden sm:flex absolute -bottom-8 -left-12 border border-emerald-500/20 bg-[#0D0D14]/90 rounded-2xl p-4 shadow-xl backdrop-blur-xl items-center gap-3 animate-bounce [animation-duration:6s]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gas Fee Saver</p>
              <p className="text-xs font-extrabold text-white">0% Fees on Rollup</p>
            </div>
          </div> */}

        {/* </div> */}

      </main>
     
    </div>
 <Outlet/>
</>

    
    
  );
}