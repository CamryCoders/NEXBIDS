import { useState,useEffect } from "react"
import {  useNavigate } from "react-router"
function Pr_page({details}){
    const Navigate=useNavigate()
function getBidPage(){
  Navigate(`/user/bid/${details._id}`)
  
  }




    return (
        <div className="flex-none w-72 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-rose-500/40 transition-all duration-300">
                    <div className="h-44 w-full bg-slate-800 relative overflow-hidden">
                        <img 
src={details.productImages[0].url}                            alt="Product" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
                            ● Live Now
                        </span>
                    </div>

                    <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-white truncate">{details.title} </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed overflow-ellipsis">
                            {details.Description}
                        </p>
                        
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                            <div>
                                <span className="block text-[10px] text-slate-500">Current Bid</span>
                                <span className="text-sm font-bold text-emerald-400">Rs{details.highestBid}</span>
                            </div>
                            <button
                            onClick={(()=>{
                                getBidPage()
                            })}
                            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                                Place Bid
                            </button>
                        </div>
                    </div>
                </div>
    )

}
export {Pr_page}