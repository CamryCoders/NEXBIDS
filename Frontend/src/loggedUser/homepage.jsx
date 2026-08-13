import React,{ useEffect } from "react"
import { GenerateToken } from "../fire_config/Permission.jsx"
import{api} from '../utils/api.js'
import { useNavigate } from "react-router";
import {
  Shirt,
  Footprints,
  Smartphone,
  Utensils,
  CookingPot,
  Refrigerator,
  Laptop,
  Sofa,
  Dumbbell,
  BookOpen,
  Car,
  Gem,
  Baby,
  ShoppingBag
} from "lucide-react";
import { useState } from "react";
import { Page } from "../usable/upcoming_bid.jsx";
import { Pr_page } from "../usable/premium_bid.jsx";




function Homepage(){
const Navigate=useNavigate()
const redirectpage=(category)=>{
    Navigate(`/create_auction/${category}`)
}

    useEffect(()=>{
        try {
            const fxn=async()=>{
    const res1=await api.get("/bid/upcomingBid")
    const res2=await api.get("/bid/PremiumBid")
    console.log(res1,res2)
    return {
        "res1" :res1.data.data , 
        "res2":  res2.data.data}
}
fxn().then((res)=>{
    setup_bid(res.res1)
    setpr_bid(res.res2)
    
})
        } catch (error) {
            
        }

},[])
const [up_bid,setup_bid]=useState("")
const [pr_bid,setpr_bid]=useState("")
    const [icon,seticon]=useState([{name:Shirt,
        purpose:"Clothes",
        
        color:"#f5f3ff"

    },{name:Utensils,
        purpose:"Utensils",
        color:"#fed7aa"

    },{name: Refrigerator,
        purpose:"Appliances",
        color:"#a5f3fc"

    },{name:Laptop,
        purpose:"Electronics",
        color:"#f1f5f9"

    },{name:Sofa,
        purpose:"Furniture",
        color:"#fef3c7"

    },{name:BookOpen,
        purpose:"Books",
        color:"#fecdd3"

    },{name:Footprints,
        purpose:"Footwear",
        color:"#fde68a"

    }])

    return(

        <>
        <GenerateToken/>
        <div className="bg-slate-950 text-slate-100 min-h-screen w-full font-sans">

    {/* 1. HERO SECTION (1/4 Page height on desktop, Left: Text, Right: Image) */}
    <section className="w-full min-h-[35vh] lg:min-h-[25vh] bg-slate-900 border-b border-slate-800 px-6 py-8 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Text Information */}
        <div className="w-full lg:w-1/2 space-y-3">
            <span className="inline-block px-3 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold rounded-full uppercase tracking-wider">
                Next-Gen Bidding
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Discover, Bid, & Win <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent">Rare Collectibles</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
                Join thousands of verified collectors on the world's premier real-time auction platform. Transparent bids, authenticated items, and instant settlements.
            </p>
        </div>

        {/* Right Side: Image Showcase */}
        <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-56 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80" 
                alt="Bidding Platform Showcase" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-slate-300 font-medium">Real-time Verified Bidding Engine</span>
            </div>
        </div>

    </section>

    {/* MAIN CONTENT CONTAINER */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* 2. CATEGORIES SECTION (Horizontally Scrollable) */}
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-wide">Explore Categories</h2>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll &rarr;</span>
            </div>

            
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
                
                {/* Category Item Example (Duplicate as needed) */}
                <div className="flex-none bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300 w-48 group">
                    {/* ICON PLACEHOLDER AREA */}
                    <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                        {/* Add your Icon SVG here */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.006-2.001a4.5 4.5 0 1 1 5.006 2.001m0 0a15.998 15.998 0 0 0 3.388 1.62m-5.006-2.001a15.998 15.998 0 0 1 3.388-1.62m-3.388 1.62L12 12" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">Digital Art</h3>
                        <p className="text-[11px] text-slate-500">1,240 Items</p>
                    </div>
                </div>

                
                {
                    icon.map((Item)=>{
                        const Icons=Item.name
                        return <div key={Item} className="flex-none bg-slate-900 border border-slate-800 hover:border-violet-500/50 p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300 w-48 group">
                    <div
                    onClick={(()=>{
redirectpage(Item.purpose)
                    })}
                    className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                        <Icons size={20} color= {Item.color}/>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">{Item.purpose} </h3>
                        <p className="text-[11px] text-slate-500">850 Items</p>
                    </div>
                </div>

                    })

                }

                

                

            </div>
        </section>


        {/* 3. UPCOMING AUCTIONS SECTION (Horizontally Scrollable) */}
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-wide">Upcoming Auctions</h2>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll &rarr;</span>
            </div>

           
            <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
                
                
               {up_bid?up_bid.map((bid)=>{
                return <Page key={bid._id} details={bid}/>

               }):<></> }

                
                

            </div>
        </section>


        {/* 4. LIVE AUCTIONS SECTION (Horizontally Scrollable) */}
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>
                    <h2 className="text-xl font-bold text-white tracking-wide">Premium Live Auctions</h2>
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll &rarr;</span>
            </div>

            
            <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
                
                {/* Live Card Example 1 */}
                {
                    pr_bid?pr_bid.map((bid)=>{
                        return <Pr_page key={bid._id} details={bid} />
                    }):<></>
                }

                {/* Live Card Example 2 */}
                

            </div>
        </section>

    </main>

</div>
        </>
    )
}
export {Homepage}