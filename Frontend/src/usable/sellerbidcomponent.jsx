import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'

function SellerBidComponent({title,duration,BidId,highest_bid,thumbnail}){
        const Navigate=useNavigate()

    const [hours,sethours]=useState("")
     const [minute,setminute]=useState("")
      const [second,setsecond]=useState("")
      const [auction,setauction]=useState(true)
      const [time,settime]=useState("")
      const [label,setlabel]=useState("")
      const [start,setstart]=useState(false)



     


      useEffect(()=>{
 const interval=setInterval(()=>{
  
const remaining=duration-Date.now()

if(remaining<=0){
  const left=(Date.now()-duration)/1000
  if(left>24*3600){
    settime(Math.floor(left/(24*3600)))
    if(left>48*3600){
setlabel("days")
    }
    else{
      setlabel("day")
    }
  }
else if(left>3600){
settime(Math.floor(left/3600))
if(left>7200){
  setlabel("hours")
}
else{
  setlabel("hour")
}
}
else if(left>60){
settime(Math.floor(left/60))
}
setTimeout(() => {
  setstart(true)
}, 500);

  setauction(false)
   
}
else{
  setstart(true)
sethours(Math.floor(remaining/(1000*60*60)))
const part=Math.floor(remaining/1000)%3600

 setminute(Math.floor(part/60))
 setsecond(Math.floor(part%60))
}
 
  




    },1000)

return (()=>clearInterval(interval))
      },[])

  function getBidPage(){
    if(second<2&&minute<2&&hours<2){
Navigate(`/user/bid/analysis/${BidId}`)
    }else{
 Navigate(`/user/sellerbid/${BidId}`)
    }
 
  
  }




return (

    (start&&<div
    
    class="w-full max-w-3xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-3xl p-5 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-300">
  
  <div class="flex flex-col sm:flex-row gap-6 items-center">
    
    <div class="w-full sm:w-2/5 aspect-[4/3] sm:aspect-square bg-gradient-to-br from-cyan-50 to-indigo-50 rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden group select-none shrink-0">
      <img src= {thumbnail} alt="" className='object-contain w-full h-full'/>
      {/* <div class="relative p-6 bg-white rounded-2xl shadow-md border border-slate-100/50 transform group-hover:scale-105 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-indigo-500"><path d="M6 18h12M12 2v16M2 12h20"/></svg>
      </div> */}

      <span class="absolute top-3 left-3 bg-white/80 backdrop-blur-sm border border-slate-200/40 text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
        Premium Lot
      </span>
    </div>

    <div class="w-full sm:w-3/5 flex flex-col justify-between self-stretch space-y-4 pt-1 sm:pt-0">
      
      <div class="space-y-1 text-center sm:text-left">
        <span class="text-[11px] font-bold uppercase tracking-widest text-slate-400">Lot #2480</span>
        <h3 class="text-xl font-black tracking-tight text-slate-800 leading-snug hover:text-indigo-600 cursor-pointer transition-colors">
          {title}
        </h3>
      </div>

      <div class="grid grid-cols-2 gap-4 bg-slate-50/80 border border-slate-100 p-3.5 rounded-2xl">
        
        <div class="space-y-0.5 text-center sm:text-left">
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-rose-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Time Left
          </p>
          <p class={`text-base ${auction?"text-black":"text-red-300"} text-slate-700 font-bold tracking-tight`}>{auction?`${hours}Hr:${minute}m : ${second}s`:`Auction Ended`}</p>
        <p className='text-[10px] bg-slate-50 text-slate-500 font-medium'> {auction?"":`${time} ${label} ago`}
        </p>
        </div>

        <div class="space-y-0.5 text-center sm:text-left border-l border-slate-200/60 pl-2">
          <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Highest Bid
          </p>
          <p class="text-base font-black text-emerald-600 tracking-tight">₨{highest_bid}</p>
        </div>

      </div>

      <div class="flex flex-col sm:flex-row items-center gap-3 pt-1">
        
       

        <button
        onClick={getBidPage}
        class="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-[size:150%_auto] hover:bg-right text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200/50 transform active:scale-[0.98] transition-all duration-300 shrink-0 flex items-center justify-center gap-2 transition-all ">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m14 13-7.5 7.42a1 1 0 1 1-1.42-1.42L12.5 11.5"/><path d="m11.12 6.12 4.24 4.24"/><path d="m15.36 3.29 4.25 4.24a1 1 0 0 1 0 1.42l-4.24 4.24a1 1 0 0 1-1.42 0L9.7 9.18a1 1 0 0 1 0-1.42l4.24-4.24a1 1 0 0 1 1.42 0Z"/></svg>
         {auction?"Explore progress":"See Results"}
        </button>

      </div>

    </div>
  </div>

</div>)
)

 }

 export {SellerBidComponent}
