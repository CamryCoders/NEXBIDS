import { useState,useEffect } from "react";
import {Trash2} from 'lucide-react'
import { api } from "../utils/api.js";

 function NotificationCard({type,content,time,isRead,id,className}) {
console.log(id,isRead)
const delete_notification=async(id)=>{
  try {
     const res=await api.delete(`delete_notification/${id.toString()}`)
  } catch (error) {
    console.log(error.message)
  }
 

}

  return (
    <div className={`max-w-md w-full bg-slate-300 m-5 backdrop-blur-md border border-slate-200/80 rounded-2xl p-4 shadow-xl shadow-slate-200/60 relative flex items-start gap-3.5 hover:border-indigo-200 transition-all duration-300 ${className}`}>
      
    
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>

      
      <div className="flex-1 min-w-0 pr-12 pb-2 relative">
        <span>
 <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">
          {type}
        </h4>
        </span>
        <span
        onClick={delete_notification}
        className="absolute top-5 right-5 hover:bg-white w-13 h-13 rounded-full ">
<Trash2 size={20} color="Black"/>
        </span>
       
        <p className="text-xs text-black mt-1 leading-relaxed line-clamp-2 ">
          {content} <span className="font-semibold text-slate-800">$14,250</span> on your listing.
        </p>
        <span className="text-[10px] font-medium text-indigo-700  mt-2 block">
            <p>
  {new Date(time).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })}
</p>
       
        </span>
      </div>

      
      <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 ${isRead?"hidden":""} text-emerald-600 text-[10px] font-bold tracking-wider uppercase`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className={`relative inline-flex rounded-full h-2  w-2 bg-emerald-500`}></span>
        </span>
        New
      </div>

    </div>
  );
}
export {NotificationCard}