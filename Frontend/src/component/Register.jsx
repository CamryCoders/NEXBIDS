import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api.js'
import { use } from 'react'

function Register(){
const Navigate=useNavigate()
const [showpass,setshowpass]=useState(false)
const [username,setusername]=useState("")
const [email,setemail]=useState("")
const [password,setpassword]=useState("")
const [message,setmessage]=useState("")
const [registered,setregistered]=useState(false)
const [clicked,setclicked]=useState(false)

const register=async (e)=>{
  setclicked(true)

    e.preventDefault()
    setregistered(true)
    setmessage("🔃")
    setTimeout(async() => {
      try {
    const response=await api.post(
        "/register",
        {
            username,
      email,
      password
    })
    console.log(response)
    if(response.status===200){
      
      setmessage(response.data.message)
      setTimeout(() => {
         Navigate("/Login")
      }, 1000);
       
    }
} catch (error) {
  setregistered(true)
      setmessage(error.response.data.message)
      setemail("")
      setusername("")
      setclicked(false)
      setTimeout(() => {
        setregistered(false)
      }, 1000);
   
}
    }, 2000);
    

}

 const eyeOpenIconSvg = (
        <>
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/>);

        </>)
    const eyeClosedIconSvg = (
    <>
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>);

    </>)
    const change=()=>{
        setshowpass(!showpass)
    }
const moveToLogin=()=>{
Navigate("/Login")

}

    return (

        <div class="w-full max-w-md z-10 animate-fade-in space-y-6 mx-auto px-4">
  
  <div class="flex flex-col items-center gap-2 text-center mb-2">
    <div class="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-black shadow-[0_0_20px_rgba(99,102,241,0.2)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14 13-7.5 7.42a1 1 0 1 1-1.42-1.42L12.5 11.5"/><path d="m11.12 6.12 4.24 4.24"/><path d="m15.36 3.29 4.25 4.24a1 1 0 0 1 0 1.42l-4.24 4.24a1 1 0 0 1-1.42 0L9.7 9.18a1 1 0 0 1 0-1.42l4.24-4.24a1 1 0 0 1 1.42 0Z"/></svg>
    </div>
    <span class="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
      NEX<span class="text-cyan-400">BID</span>
    </span>
  </div>

  <div class="border border-white/10 bg-gradient-to-b from-[#13131F] to-[#0D0D14] rounded-[24px] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
    
    <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

    <div class="mb-6 space-y-1">
      <h2 class="text-2xl font-bold tracking-tight text-white">Create Account</h2>
      <p class="text-xs text-slate-400">Register a new node terminal to start live bidding.</p>
    </div>

    <form action="#" method="POST" class="space-y-5" onsubmit="event.preventDefault();">
      
      <div class="space-y-2">
        <label for="username" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Username</label>
        <div class="relative">
          <input 
          value={username}
          readOnly={clicked}
          onChange={(e)=>{
setusername(e.target.value)
          }}
            type="text" 
            id="username" 
            name="username"
            placeholder="e.g., Alex_K" 
            required
            class="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="email" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
        <div class="relative">
          <input 
          readOnly={clicked}
          value={email}
          onChange={(e)=>{
            setemail(e.target.value)
          }}
            type="email" 
            id="email" 
            name="email"
            placeholder="alex@velocity.bid" 
            required
            class="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label for="password" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
        <div class="relative">
          <input 
          readOnly={clicked}
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
            type={showpass?"text":"password"} 
            id="password" 
            name="password"
            placeholder="••••••••••••" 
            required
            class="w-full pl-4 pr-12 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
          />
          <button 
          onClick={change}
            type="button" 
            id="togglePassword"
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
            aria-label="Toggle password visibility"
          >
            <svg id="eyeIcon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            {showpass?eyeOpenIconSvg:eyeClosedIconSvg}<circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <div class="flex items-start gap-2.5 py-1">
        <input 
          type="checkbox" 
          id="terms" 
          name="terms" 
          required
          class="mt-0.5 w-4 h-4 rounded border-white/10 bg-white/[0.02] text-cyan-500 accent-cyan-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
        />
        <label for="terms" class="text-xs font-medium text-slate-400 select-none cursor-pointer leading-tight">
          I accept the cryptographic trading framework terms & escrow policies.
        </label>
      </div>

      <button 
      onClick={register}
        type="submit" 
        class={`w-full relative group overflow-hidden px-6 py-4 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-[size:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transform active:scale-[0.99] flex items-center justify-center gap-2 ${clicked?"border-3 border-indigo-300 animate-pulse":""}`}
      >
        {registered?message:"Initialize Registration"}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>

    </form>

    <div class="mt-6 pt-5 border-t border-white/5 text-center">
      <button 
      onClick={moveToLogin}
      class="text-xs text-slate-500">
        Already registered? <a href="#" class="font-bold text-cyan-400 hover:underline">Access terminal login</a>
      </button>
    </div>

  </div>

  <div class="flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-wide text-slate-600 uppercase text-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 
    AES-256 Quantum Shield Enforced
  </div>

</div>
    )
}

export {Register}