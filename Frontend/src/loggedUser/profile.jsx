import { use, useEffect, useState } from "react";
import {api} from "../utils/api.js"
import { useNavigate } from "react-router";

function Profile(){
  const [email,setemail]=useState("")
  const [alt_email,setalt_email]=useState("")
  const [image_url,setimage_url]=useState("")
  const [Mob_no,setMob_no]=useState("")
  const [Username,setUsername]=useState("")
  const [auction,setauction]=useState("")
  const [user_detail,setuser_detail]=useState("")
  const [percent,setpercent]=useState([])
  const [auction,setauction]=useState(0)
const Navigate=useNavigate()
useEffect(()=>{
  const completed=[email,alt_email,image_url,Mob_no,Username].filter(value=> value!==null &&value!==undefined &&value!=="").length
  setpercent(Math.round((completed/6)*100))
})

  useEffect(()=>{
    const user= async()=>{
      const res=await api.get("/user_profile")
      console.log(res.data.data)
      return res.data.data
    }
    user().then((res)=>{
      setuser_detail(res)
      setUsername(res.username)
      setemail(res.email)
      setimage_url(res.avatar)
      setMob_no(res.Mob_no)
      
      
      setauction(res.Total_Bid)
     
     
    })
    
  },[])

  const save_change=async()=>{
    const res=await api.post("/save_change",
      {
        email:email,
        Username,
        alt_email,
        Mob_no


      }
    )
    console.log(res.data)

  }
  const upload_avatar=async(file)=>{

    const formdata= new FormData()
    formdata.append("avatar",file)
   try {
     const res=await api.post("/upload_avatar",
       formdata
     )
     console.log(res.data)
     if(res.status==200){
      window.location.reload()
     }
   } catch (error) {
    console.log(error.message)
   }
    
  }
  const logout=async()=>{
    const res=await api.post("/logout_user")

   if(res){
    Navigate("/Login")
   }

  }
  





    return(
      
  <div class="max-w-4xl mx-auto space-y-8">
    
   
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
       
        <div class="md:col-span-1 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6">
          <label class="block text-sm font-semibold text-gray-700 mb-3 text-center">Profile Photo</label>
          <div class="relative group w-28 h-28">
            <img src={image_url?image_url:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"} alt="Profile Preview" class="w-28 h-28 rounded-full object-cover border-2 border-gray-200 shadow-sm" />
            
           
            <label for="profile-image-input" class="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs text-center p-2">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>Upload</span>
            </label>
            <input
             onChange={((e)=>{
                  console.log(e.target.files)

upload_avatar(e.target.files[0])
                })}
            type="file" id="profile-image-input" class="hidden" accept="image/*" />
          </div>
          <span class="text-xs text-gray-500 mt-2">Click to change</span>
        </div>

        
        <div class="md:col-span-3 flex flex-col sm:flex-row items-center justify-around gap-4 pl-0 md:pl-4">
          <div class="text-center sm:text-left">
            <h2 class="text-xl font-bold text-gray-900">Profile Completion</h2>
            <p class="text-sm text-gray-500 mt-1">Complete your profile to unlock all auction features.</p>
          </div>

         
          <div class="relative w-28 h-28 rounded-full flex items-center justify-center shadow-inner" style={{background: `conic-gradient( #2f26d8 0% ${percent}%, #e5e7eb ${percent}% 100%)`}}>
            
            <div class="w-22 h-22 w-[84px] h-[84px] bg-white rounded-full flex flex-col items-center justify-center">
              <span class="text-2xl font-black text-indigo-600">{(percent.length)*10}</span>
              <span class="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Done</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-3">Account Information</h3>
      
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
          value={Username}
          onChange={((e)=>{
            setUsername(e.target.value)
          })}
          type="text" id="username" name="username"  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm" placeholder="Enter username" />
        </div>

       
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
          value={email}
          onChange={((e)=>{
            setemail(e.target.value)
          })}
          type="email" id="email" name="email"  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm" placeholder="Enter email" />
        </div>

        
        <div>
          <label for="alt-email" class="block text-sm font-medium text-gray-700 mb-2">Alternate Email</label>
          <input 
          value={alt_email}
          onChange={((e)=>{
            setalt_email(e.target.value)
          })}
          type="email" id="alt-email" name="alt-email"  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm" placeholder="Enter secondary email" />
        </div>
         <div>
          <label for="Mobile No." class="block text-sm font-medium text-gray-700 mb-2">Mobile No</label>
          <input 
          onChange={((e)=>{
            setMob_no(e.target.value)
          })}
          type= "number" id="alt-email" name="Mobile No." value={Mob_no} class="w-1/2 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm" />
        </div>

        
        <div>
          <label for="auctions-count" class="block text-sm font-medium text-gray-700 mb-2">Auctions Created</label>
          <input
           readOnly={true}
          type="number" id="auctions-count" name="auctions-count" value={auction} readonly class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 font-semibold text-sm cursor-not-allowed" />
        </div>

        <div class="md:col-span-2 flex justify-end">
          <button
          onClick={(()=>{
            save_change()
          })}
          type="button" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors">Save Changes</button>
        </div>
      </form>
    </div>

   
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Frequently Asked Questions</h3>
      
      <div class="space-y-3">
        
        <details class="group border border-gray-200 rounded-lg p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
          <summary class="flex justify-between items-center font-medium text-gray-800 text-sm">
            <span>How do I create a new auction?</span>
            <span class="transition group-open:rotate-180 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </summary>
          <p class="mt-3 text-xs leading-relaxed text-gray-600">
            Navigate to your main dashboard and click on the "Create Auction" button. Fill in the required product details, starting bid price, and duration.
          </p>
        </details>

        
        <details class="group border border-gray-200 rounded-lg p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
          <summary class="flex justify-between items-center font-medium text-gray-800 text-sm">
            <span>Can I change my registered email address?</span>
            <span class="transition group-open:rotate-180 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </summary>
          <p class="mt-3 text-xs leading-relaxed text-gray-600">
            Yes, you can update your primary email from the input field above and click "Save Changes". A verification link will be sent to confirm your new email.
          </p>
        </details>

        
        <details class="group border border-gray-200 rounded-lg p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
          <summary class="flex justify-between items-center font-medium text-gray-800 text-sm">
            <span>What happens when my profile completion reaches 100%?</span>
            <span class="transition group-open:rotate-180 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </summary>
          <p class="mt-3 text-xs leading-relaxed text-gray-600">
            A fully verified profile receives a verified seller badge and higher bidding limits across all live auctions on the platform.
          </p>
        </details>
      </div>
    </div>

   
    <div class="flex justify-end pt-2">
      <a 
      onClick={(()=>{
        logout()
      })}
      href="#logout" class="inline-flex items-center gap-2 px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-lg border border-red-200 transition-colors shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        Logout
      </a>
    </div>

  </div>


    )
}
export {Profile}