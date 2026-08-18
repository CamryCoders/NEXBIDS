import { useState,useEffect } from "react";
import { api } from "../utils/api";
import { useParams } from "react-router";
import { Loader } from "../usable/loading.jsx";

function Analysis(){
  const {bidId}=useParams()
  const [Bid,setBid]=useState([])
  const [Loading,setLoading]=useState(true)
  const [analysis,setanalysis]=useState([])
  const [highestBid,sethighestBid]=useState("")
  const [username,setusername]=useState("")
  const [percent,setpercent]=useState("")
  const [startingPrice,setstartingPrice]=useState("")
  const [Growth,setGrowth]=useState("")
  const [Bidder,setBidder]=useState("")
  const [border_bid,setborder_bid]=useState([])
  const [border_time,setborder_time]=useState([])
  const [avg,setavg]=useState("")
  


  
  useEffect(()=>{
const fxn=async()=>{
  const res=await api.get(`/bid/analysis/${bidId}`)
  console.log(res)
  return res.data.data
}
fxn().then((res)=>{
  setanalysis(res)
 setBidder(res[1][0].uniqueUsers[0].count)
 setborder_bid(res[1][0].bucket.map((item)=>item._id))
 setborder_time(res[1][0].bucket.map((item)=>item.latestTime))
 setavg(res[1][0].average[0].avg)
 
})

  },[])
useEffect(()=>{
  async function apibid() {
  
      const response = await api.get(`/bid/analysis_bidDetail/${bidId}`)
  console.log(response)
      return response.data.data[0]
  
    }

    apibid().then((res)=>{
      
setBid(res)
setusername(res.current_user[0]?.username)
sethighestBid(res.highestBid)
setstartingPrice(res.startingPrice)
setGrowth(Math.ceil((res.highestBid-res.startingPrice)*100/res.startingPrice))


setLoading(false)
    })
    
},[])
if (Loading){
  return <Loader/>
}
    return (
       
      <div class="max-w-7xl mx-auto space-y-6">
    
    
    <div class="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 md:p-5">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        
        
        <div class="flex flex-col justify-center items-center p-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Winner</span>
          <span class="text-base font-bold text-indigo-600 truncate max-w-[120px] mt-0.5">{username}</span>
        </div>

       
        <div class="flex flex-col justify-center items-center p-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Highest Bid</span>
          <span class="text-base font-black text-slate-900 mt-0.5">Rs{highestBid}</span>
        </div>

       
        <div class="flex flex-col justify-center items-center p-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Start Price</span>
          <span class="text-base font-bold text-slate-500 mt-0.5">Rs{startingPrice}</span>
        </div>

       
        <div class="flex flex-col justify-center items-center p-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Growth</span>
          <span class="inline-flex items-center gap-1 text-base font-black text-emerald-600 mt-0.5">
            {Growth}%
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
          </span>
        </div>

        
        <div class="flex flex-col justify-center items-center p-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Bidders</span>
          <span class="text-base font-bold text-slate-900 mt-0.5">{Bidder} People</span>
        </div>

       
        <div class="flex flex-col justify-center items-center p-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Avg Bid</span>
          <span class="text-base font-bold text-slate-900 mt-0.5">Rs {analysis?.length>=0?Math.ceil(avg):"Loading.."}  </span>
        </div>

      </div>
    </div>

  
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
    
      <div class="lg:col-span-8 space-y-6">
        
       
         
        
        
        <div class="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-base font-bold text-slate-900">Price vs. Time</h3>
              <p class="text-xs text-slate-500">Live auction escalation curve over 24 hours</p>
            </div>
            <span class="px-2.5 py-1 text-xs font-semibold bg-indigo-50 text-indigo-600 rounded-full">Live Trace</span>
          </div>

          
          <div class="h-52 flex items-end gap-2 pt-8 pb-2 border-b border-l border-slate-200 relative">
          
            <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div class="border-b border-dashed border-slate-400 w-full"></div>
              <div class="border-b border-dashed border-slate-400 w-full"></div>
              <div class="border-b border-dashed border-slate-400 w-full"></div>
            </div>

           {
            analysis.length>0?analysis[0].map((bar,i)=>{
return (
            <div  key={i} class={`flex-1  hover:bg-indigo-600 transition-colors flex justify-center rounded-t-lg text-slate-800 text-md font-semibold ${i==5?"bg-indigo-500":"bg-slate-300"} title="00:00 - $5k`} style={{ height: `${(i + 1) * 14}%` }}>Rs { i!=0?(bar.target).toFixed(1):(bar.target/1000).toFixed(1)}k</div>

)
            }):<></>
           }
           
           
          </div>
        
          <div class="flex justify-between text-[11px] font-medium text-slate-400 mt-2">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

       
        <div class="bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-base font-bold text-slate-900">Bidder Distribution vs. Price Range</h3>
              <p class="text-xs text-slate-500">Volume of participants per price bracket</p>
            </div>
            <span class="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">Histogram</span>
          </div>

         
          <div class="h-52 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-l border-slate-200">

{
  analysis.length>=1?analysis[1][0].bucket.map((analysis,i)=>{
return (
<div key={i} class={`w-full  hover:bg-emerald-500 transition-colors  rounded-t-md group relative  ${i==3?"bg-emerald-500":"bg-slate-200"}  `} style={{height:`${(analysis.count) * 10}%`}}>
              <span class={`opacity-0 group-hover:opacity-100 ${i==3?"opacity-100":""} absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-800 text-white py-0.5 px-1 rounded`}>{analysis.count}</span>
            </div>
)
  }):<></>
}

            
           
          </div>
         
          <div class="flex justify-between text-[11px] font-medium text-slate-500 mt-2">

            {
              border_bid.length>0?border_bid.map((item,i)=>{
return <span key={i}>{(border_bid[i]/1000).toFixed(1)}k - {i!=5?(border_bid[i+1]/1000).toFixed(1):""}k  </span>
              }):<></>
            }
            
           
          </div>
        </div>

      </div>

      
      <div class="lg:col-span-4 sticky top-6">
        <div class="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden p-4">
          <div class="relative group rounded-xl overflow-hidden bg-slate-100 aspect-square">
            <img 
            src={Bid?.productImages[0].url}
              alt="Auctioned Product" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
              Sold Out
            </div>
          </div>

          <div class="mt-4 space-y-2">
            <h2 class="text-lg font-bold text-slate-900">Limited Edition Timepiece</h2>
            <p class="text-xs text-slate-500 leading-relaxed">
              Rare collectible chronograph watch with original box and authentication documents. Verified by official appraisers.
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>

  
        
    )
}

export {Analysis}