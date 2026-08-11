import { useEffect } from "react"
import { useState } from "react"
function Page({details}){
     const [hours, sethours] = useState(0)
      const [minute, setminute] = useState(0)
      const [second, setsecond] = useState(0)
      

     const timer = () => {
    const interval = setInterval(() => {

      const remaining = details.Later - Date.now()

      sethours(Math.floor(remaining / (1000 * 60 * 60)))
      const part = Math.floor(remaining / 1000) % 3600

      setminute(Math.floor(part / 60))
      setsecond(Math.floor(part % 60))


      if (remaining <= 0) {
        clearInterval(interval)
      }

    }, 1000)
    
   

  }
   useEffect(()=>{
        
        timer()
    },[])
    return (
        <div className="flex-none w-72 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all duration-300">
                    <div className="h-44 w-full bg-slate-800 relative overflow-hidden">
                        <img 
                        src={details.productImages[0].url}
                            alt="Product" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                            Upcoming
                        </span>
                    </div>

                    <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-white truncate">{details.title} </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed overflow-ellipsis">
                            {details.Description}
                        </p>
                        
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                            <span className="text-xs text-slate-500">Starts in:</span>
                            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
                                {hours}h : {minute}m : {second}s
                            </span>
                        </div>
                    </div>
                </div>
    )
}
export {Page}
