import React,{useState} from "react";
import { useEffect } from "react";
import {Link,NavLink} from 'react-router-dom'
import { api } from "../utils/api.js";


function Header(){
  const [count,setcount]=useState(0)

  useEffect(()=>{
    const fxn=async()=>{
      const res=await api.get("/bid/Unread_notification")
      console.log(res.data.data)
      return res.data.data
    }
    fxn().then((res)=>{
      setcount(res.length)
    })
  },[])

    return(

        <header class="w-full max-w-6xl mx-auto px-4 pt-4 sm:pt-6">
  <div class="md:flex overflow-x-hidden bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl px-4 sm:px-6 py-3.5 shadow-xl shadow-slate-100/40  md:items-center md:justify-between gap-4">
    
    <div class="flex items-center gap-2.5 group cursor-pointer select-none">
      <div class="p-2 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-400 to-purple-500 text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.42a1 1 0 1 1-1.42-1.42L12.5 11.5"/><path d="m11.12 6.12 4.24 4.24"/><path d="m15.36 3.29 4.25 4.24a1 1 0 0 1 0 1.42l-4.24 4.24a1 1 0 0 1-1.42 0L9.7 9.18a1 1 0 0 1 0-1.42l4.24-4.24a1 1 0 0 1 1.42 0Z"/></svg>
      </div>
      <span class="text-lg font-black tracking-tight text-slate-800">
        NEX<span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-600">Bid</span>
      </span>
    </div>

    <nav class=" flex lg:w-3/5 w-full overflow-x-auto scrollbar-none md:w-full items-center md:justify-between gap-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100 font-bold  text-[10px] sm:text-xs tracking-wide">
      
      <a
      href="/user/home"
      class="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-slate-900 rounded-xl transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Home
      </a>

      <a
      href="/user/bid/createAuction"
       class="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-indigo-600 rounded-xl hover:bg-indigo-50/50 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        Create Auction
      </a>

      <a
      href="/user/bid"
       className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500/10 to-orange-500/10 text-rose-600 rounded-xl transition-all duration-200 shadow-sm border border-rose-100/40">
        <span class="sm:w-1.5 sm:h-1.5 w-1 h-1 rounded-full bg-rose-500 animate-ping"></span>
        Live Auction
      </a>

      <a
      href="/user/specbid"
       class="flex relative  items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-amber-500 rounded-xl hover:bg-amber-50/50 transition-all duration-200">
<div className={`absolute right-4 top-1 left-1 bg-indigo-700 rounded-full w-5 h-5 items-center justify-center ${count?"text-slate-100":"hidden"} flex text-white`}>{count}</div>
<svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M12 2a6 6 0 0 0-6 6v3.586l-.707.707A1 1 0 0 0 6 14h12a1 1 0 0 0 .707-1.707L18 11.586V8a6 6 0 0 0-6-6zM10 20a2 2 0 0 0 4 0H10z"/>
</svg>
        Notification
      </a>

      <a
      href="/user/profile"
       class="flex items-center gap-1.5 px-3.5 py-2 text-slate-600 hover:text-cyan-600 rounded-xl hover:bg-cyan-50/50 transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Profile
      </a>

    </nav>

    <div class="flex items-center gap-2">
      <div class="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100 text-xs font-black">
        ⚡ 2,450 pts
      </div>
      
      <button class="hidden p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
    </div>

  </div>
</header>
    )
}

export {Header}