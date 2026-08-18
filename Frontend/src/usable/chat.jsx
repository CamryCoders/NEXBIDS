import React, { useState, useRef, useEffect } from 'react';
import { api } from '../utils/api.js';
import { all } from 'axios';
import { socket } from '../utils/socket.js';
import { use } from 'react';


export default function ChatInterface({customer_list,BidId}) {
  const [customer_detail,setcustomer_detail]=useState(customer_list)
  const [openindex,setopenindex]=useState(null)
  const [curr_user_chat,setcurr_user_chat]=useState("")
  const [curr_msg,setcurr_msg]=useState("")

  const [all_message,setall_message]=useState([])
  const [curr_userid,setcurr_userid]=useState("")
  const [curr_user_msg,setcurr_user_msg]=useState("")
  const useridRef=useRef(curr_userid)
useEffect(() => {
    useridRef.current = curr_userid;
  }, [curr_userid]);
  useEffect(()=>{
    
  const fxn=(data)=>{
    const activeUserId = useridRef.current;
    console.log(data.customer,activeUserId)
    console.log(data.customer==activeUserId)
    if(data.customer==activeUserId){
setall_message((prev)=>[...prev,{
      content:data.content,
      by:"me"}
    ])
    }
    
  }
    
  
  
    
  
        
  
socket.on("customertoseller",fxn)
return ()=>{
  socket.off("customertoseller",fxn)
}


  },[])






  const get_user_message=async(id)=>{
    
    try {
      const res=await api.get(`/bid/all_message/${id}`,
        {
          params:{
BidId
          }
          
        }
      )
      console.log(res)
      setall_message(res.data.data)
      
    } catch (error) {
      console.log(error.message)
    }
  }
 const sellertocustomer=()=>{
  console.log(customer_list[0].BidId)
console.log("customerId",curr_userid)
  socket.emit("seltocus",{
    bidId:customer_list[0].BidId,
    customerId:useridRef.current,
    content:curr_user_msg
   
  })
 
setcurr_user_msg("")
setall_message((prev)=>[...prev,{
 content:curr_user_msg,
    by:"seller"

}])
 
 }

 

  return (
    <>
   <div class="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/50 overflow-hidden select-none">
  
  <div class="hidden md:flex h-[600px] w-full">
    
    <div class="w-80 border-r border-slate-200/60 flex flex-col shrink-0 bg-white">
      <div class="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 class="text-sm font-black text-slate-800 tracking-tight flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-indigo-500"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Active Consoles
        </h3>
      </div>
      <div className='gap-1'>
 {
        customer_list.map((user,index)=>{
          return <div key={index}
           onClick={((e)=>{
            
            setcurr_userid(user.participants[0]._id)
        setcurr_user_chat(user.participants[0].username)
          get_user_message(user.participants[0]._id)
        })}
          class="flex-1 overflow-y-auto p-2 space-y-1">
        <div class="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/50 text-slate-800 border border-transparent">
          <div class="w-10 h-10 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center shrink-0">
            <img src={user.participants[0].avatar?user.participants[0].avatar:"https://cdn-icons-png.flaticon.com/128/1077/1077012.png"} alt="" className='w-full rounded-2xl h-full' />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-black truncate text-slate-800"> {user.participants[0].username}</h4>
            {/* <p class="text-[11px] text-indigo-600 truncate font-semibold mt-0.5">{user}</p> */}
          </div>
        </div>
      </div>
        })
      }
      </div>
     
      
      
      
    </div>

    <div class="flex-1 flex flex-col justify-between bg-slate-50/30">
      <div class="p-4 border-b border-slate-100 bg-white">
        <h4 class="text-xs font-black text-slate-800">{curr_user_chat}</h4>
      </div>
      
      <div class="flex-1 p-4 overflow-y-auto space-y-4">
        <div class=" items-start gap-2.5 max-w-[100%]">
{

  
  all_message.map((msg,index)=>{
    return(
   <div key={index} className= {`${msg.by==="me"?"justify-start":"justify-end"} w-full  flex`}>
<div class={`max-w-[100px] text-black border border-slate-200/60 p-3 rounded-2xl ${msg.by==="me"?"bg-indigo-400 text-white":"text-black bg-white"} rounded-tl-none font-medium text-xs shadow-sm`}>
          {msg.content}
          </div>

    </div>
    )
  })
}

          
          
        </div>
      </div>
      
      <div class="p-3.5 border-t border-slate-100 bg-white flex gap-2">
        <input
        value={curr_user_msg}
        onChange={((e)=>{
setcurr_user_msg(e.target.value)
        })}
        type="text" placeholder="Type a secure message node..." class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white"/>
        <button
         onClick={(()=>{
            sellertocustomer()
          })}
        class="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>

  </div>

  <div class="block md:hidden p-4 space-y-3 bg-white sm:w-full w-60  h-120">
    <h3 class="text-sm font-black text-slate-800 tracking-tight px-1 mb-3">Active Consoles</h3>
    <div className='overflow-y-auto scrollbar-none w-full h-8/10 cursor-pointer'>
       {
      customer_list.map((user,index)=>{
        return <details
       key={index}
          open={openindex === index}
          onToggle={(e) => {
            if (e.target.open) {
              setopenindex(index);
            } else {
              setopenindex(null);
            }
          }}
          
       
        id={user._id} class="group border border-slate-200/70 rounded-2xl bg-slate-50/50 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary
       onClick={((e)=>{
        setcurr_userid(user.participants[0]._id)
       console.log(user.participants[0]._id)
          get_user_message(user.participants[0]._id)
        })}
      class="flex items-center justify-between p-3.5 bg-white cursor-pointer select-none list-none active:bg-slate-50">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="w-10 h-10 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center shrink-0">
                        <img src={user.participants[0].avatar?user.participants[0].avatar:"https://cdn-icons-png.flaticon.com/128/1077/1077012.png"} alt="" className='w-full h-full rounded-2xl' />

          </div>
          <div class="min-w-0 flex-1">
            <h4 class="text-xs font-black text-slate-800 truncate block pr-2">{user.participants[0].username}</h4>
            <p class="text-[10px] text-slate-400 font-medium mt-0.5 truncate">{user.lastmessage}</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-2"><polyline points="6 9 12 15 18 9"/></svg>
       
      
      </summary>
      
      <div class="border border-slate-100 p-4 space-y-4 bg-slate-50/40">
        <div class=" items-start gap-2.5 ">
          {all_message.map((msg,index)=>{
            return <div key={index} class={` text-black border border-slate-200/60 p-3 rounded-2xl ${msg.by==="me"?"bg-indigo-500 text-white":"bg-white"} rounded-tl-none font-medium text-xs shadow-sm`}>
              {msg.content}
          </div>
          })

      }
          
           
          
        </div>
        <div class="flex items-center gap-2 pt-1">
          <input
          value={curr_user_msg}
          onChange={((e)=>{
setcurr_user_msg(e.target.value)
          })}
          type="text" placeholder="Reply directly..." class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-indigo-500"/>
          <button
          onClick={(()=>{
            
            sellertocustomer()
          })}
          class="p-2 bg-indigo-600 text-white rounded-xl shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </details>


      })
    }
    

    </div>
   
    
    
   
  </div>
</div>
    
    </>
   
  );
}
export{ChatInterface}