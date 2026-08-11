import React, {useState} from 'react'
import { api } from '../utils/api.js'
import { useParams } from 'react-router'

function NewPassword(){
const [password,setpassword]=useState("")
const [confpassword,setconfpassword]=useState("")
const [success,setsuccess]=useState(false)
const {token}=useParams()

const resetpassword=async (e)=>{
e.preventDefault()
try {
  console.log("entered")
  const response= await api.post(`/resetPassword/${token}`,{
  password:password,
  confirmPassword:confpassword

})
console.log(response)
if(response.status===200){
setsuccess(true);
}
} catch (error) {
  console.log("error",error.response)
}




}

    return(

        <>
        <div class="w-full max-w-md mx-auto border border-slate-200/80 bg-white/70 rounded-[24px] p-8 shadow-xl backdrop-blur-xl relative overflow-hidden">
  
  <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500"></div>

  <div class="mb-6 space-y-1">
    <h2 class="text-2xl font-black tracking-tight text-slate-900">Secure New Password</h2>
    <p class="text-xs text-slate-500">Set your new authentication key to regain terminal control.</p>
  </div>

  <form action="#" method="POST" class="space-y-5" id="passwordForm">
    
    <div class="space-y-1.5">
      <label for="new-password" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">New Password</label>
      <input 
      value={password}
      onChange={(e)=>{
setpassword(e.target.value)
      }}
        type="password" 
        id="new-password" 
        name="password"
        placeholder="••••••••••••" 
        required
        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
      />
    </div>

    <div class="space-y-1.5">
      <label for="confirm-password" class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Confirm New Password</label>
      <input 
      value={confpassword}
      onChange={(e)=>{
setconfpassword(e.target.value)
      }}
        type="password" 
        id="confirm-password" 
        name="confirm_password"
        placeholder="••••••••••••" 
        required
        class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200"
      />
    </div>

    <button 
    onClick={resetpassword}
      
      class="w-full relative group overflow-hidden px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-[size:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-indigo-500/20 transform active:scale-[0.99] flex items-center justify-center gap-2"
    >
      Save Security Keys
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-0.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
    </button>

  </form>
</div>

<div id="successModal" class={` ${success?"":"hidden"} fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in`}>
  <div class="bg-white rounded-[24px] p-6 max-w-sm w-full border border-slate-100 shadow-2xl text-center space-y-4 transform scale-95 transition-all duration-300">
    
    <div class="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    
    <div class="space-y-1">
      <h3 class="text-lg font-bold text-slate-900">Update Successful</h3>
      <p class="text-xs text-slate-500">Your password has been saved successfully. You can now access your bidding node safely.</p>
    </div>
    
    <button 
      onclick="document.getElementById('successModal').classList.add('hidden')"
      class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
    >
      Proceed to Dashboard
    </button>
  </div>
</div>


        </>
    )
}
export {NewPassword}