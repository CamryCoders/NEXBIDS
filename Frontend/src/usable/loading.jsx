import React,{useState,useEffect} from 'react'


function Loader({Message}){
  const [flag,setflag]=useState(false)

  useEffect(()=>{
if(Message!=""&&Message!=null){
    setflag(true)
  }

  },[Message])
  

    return (
        <div class="flex flex-col items-center justify-center min-h-[300px] w-full p-6 select-none">
  
  <div class="relative w-16 h-16 flex items-center justify-center">
    
    <div class="absolute inset-0 rounded-full border-4 border-slate-100 border-t-indigo-500 border-r-cyan-400 animate-spin [animation-duration:0.8s]"></div>
    
    <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-100 to-indigo-100 animate-pulse flex items-center justify-center">
      <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
    </div>
    
  </div>

  <div class="mt-5 text-center space-y-1">
    <h4 class="text-sm font-black tracking-tight text-slate-800">Synchronizing Node</h4>
    <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
      {flag?Message:"Connecting to Live Feed"}
    </p>
  </div>

</div>
    )
}
export {Loader}