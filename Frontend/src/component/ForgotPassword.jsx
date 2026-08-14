import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import { api } from '../utils/api'

function ForgotPassword(){
  const [sent,setsent]=useState(false)
  const [active,setactive]=useState(false)
  const [error,seterror]=useState("")
const [email,setemail]=useState("")
const Navigate=useNavigate()
const moveToLogin=()=>{
    Navigate("/Login")
}
const sendmail=async(e)=>{
e.preventDefault()
setactive(true)
try{
const response=await api.post("/forgotpassword",{
    email,
}
)
if(response.status===200){
  setemail("")
  setactive(false)
  setsent(true)
    console.log("email sent")
}



}catch(error){
  setemail("")
  setactive(false)
seterror(error.message)
}

}

    return(
        <>
        <div class="w-full max-w-md mx-auto border border-white/10 bg-gradient-to-b from-[#13131F] to-[#0D0D14] rounded-[24px] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
  
  <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

  <div class="mb-6 space-y-1">
    <h2 class="text-2xl font-bold tracking-tight text-white">Reset Key</h2>
    <p class="text-xs text-slate-400">Enter your secure email to receive an authentication recovery link.</p>
  </div>

  <form action="#" method="POST" class="space-y-5" onsubmit="event.preventDefault();">
    
    <div class="space-y-2">
      <label for="reset-email" class="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
      <input 
      value={email}
      onChange={(e)=>{
setemail(e.target.value)
      }}
        type="email" 
        id="reset-email" 
        name="email"
        placeholder="alex@velocity.bid" 
        required
        class="w-full px-4 py-3.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm font-medium text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/70 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-300"
      />
    </div>

    <button
    onClick={sendmail}
      type="submit" 
      class={`w-full relative group overflow-hidden px-6 py-4 rounded-xl ${active?"border-2 animate-pulse border-rose-200":""} text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-[size:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transform active:scale-[0.99] flex items-center justify-center gap-2`}
    >



      <span className='relative z-10'>
        {error?error:(active?"Sending Link":(sent?"Reset Link Sent Successfully":"Send Reset Link"))}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </button>

  </form>

  <div class="mt-6 pt-5 border-t border-white/5 text-center">
    <button 
    onClick={moveToLogin}
    href="#" class="text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors">
      ← Back to Console Login
    </button>
  </div>

</div>
        </>
    )
}
export {ForgotPassword}