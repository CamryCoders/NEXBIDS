import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../utils/api.js'
import { Loader } from './loading.jsx'
import { socket } from '../utils/socket.js'
import { Imageslider } from './image_swiper.jsx'
import { Allmessage } from './message.component.jsx'
import {ChatInterface} from './chat.jsx'


function SellerEachbidpage() {
  const sockets = useRef(null)
  const { BidId } = useParams()
  const [loader, setloader] = useState(true)
  const [bidDetail, setbidDetail] = useState([])
  const [warning, setwarning] = useState("")
  const [hours, sethours] = useState(0)
  const [minute, setminute] = useState(0)
  const [second, setsecond] = useState(0)
  const [liveamount, setliveamount] = useState(0)
  const [live_user, setlive_user] = useState("")
  const [live_user_image, setlive_user_image] = useState("")
  const [nextbid, setnextbid] = useState(0)
  const [images, setimages] = useState([])
  const [open, setopen] = useState(false)
  const [seller, setseller] = useState("")
  const [sellerId, setsellerId] = useState("")
  const [message, setmessage] = useState("")
  const [chat,setchat]=useState("")

  const [flag,setflag]=useState(true)
  const [all_chat_user,setall_chat_user]=useState([])
  const [analysis_open,setanalysis_open]=useState(false)
  const [top5bidder,settop5bidder]=useState([])


useEffect(()=>{


},[])

useEffect(()=>{
   const fxn=(data)=>{
    console.log(data)
  settop5bidder(data.bidders)

}

socket.on("top_5_bid",fxn)

return ()=>{
  socket.off("top_5_bid",fxn)
}

},[])
 

     



  useEffect(() => {
    apibid().then(async(response) => {
      console.log("fetched")
      console.log(response)
      setlive_user(response[0]?.current_user[0]?.username)
      setliveamount(response[0].highestBid)
      setbidDetail(response)
      setseller(response[0].seller[0].username)
      setsellerId(response[0].seller[0]._id)
      setimages(response[0].productImages)

      console.log(response[0])
const top5bid=await api.get(`bid/top5bid/${BidId}`)
settop5bidder(top5bid.data.data)
      setloader(false)
      
    }).catch((error) => {
      console.log(error)
      setloader(true)
      // setmessage("Facing Error while loading the page")
    })
  }, [])
  useEffect(() => {

 const msg = {
      BidId: BidId,
      sellerId: sellerId,
      
    }
      socket.on("update_bid", (data) => {
          console.log(data)
          setlive_user(data.user_name)
          setliveamount(data.amount)
        })

    socket.on("connect", () => {
      console.log("connected", socket.id)
    })
    socket.on("disconnect",()=>{
      console.log("disconnected",socket.id)
    })

    
   
    socket.on("customertoseller", (data) => {
    console.log("message reached")
      console.log(data.content)
      
    })
   

    socket.emit("joinseller",msg)



  },[])
 
useEffect(()=>{
const fxn=async()=>{
  const res=await api.get(`/bid/analysis/${BidId}`)
  console.log(res)
}

//  return ()=>{
//   socket.disconnect()
//  }


},[])


  const timer = () => {
    const interval = setInterval(() => {

      const remaining = bidDetail[0].Duration - Date.now()

      sethours(Math.floor(remaining / (1000 * 60 * 60)))
      const part = Math.floor(remaining / 1000) % 3600

      setminute(Math.floor(part / 60))
      setsecond(Math.floor(part % 60))


      if (remaining <= 0) {
        clearInterval(interval)
      }

    }, 1000)

  }
  async function apibid() {

    const response = await api.get(`/bid/bidDetail/${BidId}`)

    return response.data.data

  }
  useEffect(() => {
    if (bidDetail.length != 0) {
      timer()
    }

  }, [bidDetail])
  const send_message = (value,customerId) => {
    
    const msg = {
      BidId: BidId,
      sellerId: sellerId,
      customerId:customerId,
      content: value,
      by:"seller"
    }
    socket.emit("sellertocustomer",msg)
    // setmessage("")
    
  }


  if (loader) {
    return (
      <Loader />
    )
  }

const all_msg_user=async()=>{
  try {
    const res=await api.get(`/bid/usermessage/${BidId}`)
    console.log(res)
    setall_chat_user(res.data.data)
    
  } catch (error) {
    console.log(error.message)
    
  }

}

  return (


    <>
      <div class="w-full max-w-6xl mx-auto px-4 py-8 select-none">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div class="lg:col-span-5 w-full space-y-4">
            <div class="w-full aspect-square bg-gradient-to-br from-slate-100 to-indigo-100/50 rounded-3xl border border-slate-200/60 p-8 flex items-center justify-center relative overflow-hidden shadow-xl shadow-slate-100/50">


              <div id="carousel-track" class="w-full h-full flex items-center justify-center text-indigo-500 transition-all duration-300">
                {/* <svg id="carousel-icon" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" class="transform transition-transform duration-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg> */}
                <Imageslider images={images} />
              </div>

              <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm z-1 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-cyan-500"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                <span id="watcher-count" class="text-slate-900 font-extrabold">142</span> item views
              </span>

             
            </div>
          </div>

          <div class="lg:col-span-7 space-y-6 flex flex-col justify-between self-stretch">

            <div class="space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-black text-indigo-600">S</div>
                  <p class="text-xs font-bold text-slate-500">Seller Node: <span class="text-slate-800 font-extrabold hover:underline cursor-pointer">{seller}</span></p>
                </div>
                <span class="px-2.5 py-1 bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span> Live Auction
                </span>
              </div>

              <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 leading-tight">
                {bidDetail[0].title} #098
              </h1>

              <p class="text-sm font-medium text-slate-500 leading-relaxed">
                {bidDetail[0].Description}
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3 sm:gap-4 bg-slate-50/70 border border-slate-200/60 p-4 rounded-2xl">

              <div class="space-y-0.5">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting Price</p>
                <p class="text-sm sm:text-base font-black text-slate-600">₨ {bidDetail[0].startingPrice}</p>
              </div>


              <div class="space-y-0.5 border-l border-slate-200 pl-3 sm:pl-4">
                <p class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Highest Bid
                </p>
                <p class="text-base sm:text-lg font-black text-emerald-600 tracking-tight">{liveamount ? liveamount : 0}</p>
                <p class="text-[10px] font-extrabold text-slate-500 tracking-wide truncate">{live_user}</p>
              </div>

              <div class="space-y-0.5 border-l border-slate-200 pl-3 sm:pl-4">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Clock Ends In</p>
                <p class="text-sm sm:text-base font-black text-rose-500 tracking-tight">{hours}h :{minute}m:{second}s</p>
              </div>

            </div>


            <div class="space-y-2.5">
              <h4 class="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-indigo-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                Top 5 Recent Higher Bids
              </h4>
              <div class="space-y-1.5">

 {
top5bidder.length>0?top5bidder.map((bidder,i)=>{
return <div key={i} class="flex  items-center justify-between p-2.5 rounded-xl bg-indigo-50/40 border border-indigo-100/50 text-xs">
                  <div class="flex items-center gap-2">
                    <span class={`w-5 h-5 rounded-md  text-[10px] font-black text-white flex ${i==0?"bg-indigo-600":"bg-slate-700"} items-center justify-center`}>{i+1}</span>
                    <span class="font-extrabold text-slate-700 transition-all duration-2000 opacity-100">{bidder.username}</span>
                    <span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 font-black text-[9px] uppercase rounded">{i==0?"Highest":""}</span>
                  </div>
                  <div class="text-right">
                    <span class={`font-black  ${i==0?"text-indigo-600":"text-slate-700"} mr-3`}>Rs{bidder.amount}</span>
                    <span class="text-slate-400 font-semibold text-[10px]">Just now</span>
                  </div>
                </div>
}):<></>

    }

               
              </div>
            </div>

            <div class="space-y-4 pt-2 fixed bottom-5 right-5 z-50">
              <div class="flex flex-col sm:flex-row items-center gap-3">

           {open?<ChatInterface
             customer_list={all_chat_user} 
             />:<></>

           }  
               
                <button
                  onClick={(() => {
                    all_msg_user()
                    setopen(!open)
                  })}
                  id="open-chat-btn" class="w-full sm:w-auto px-5 py-3.5  bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 transform transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Customer's Doubt
                </button>



              </div>
            </div>

          </div>
        </div>
      </div>


     

    </>
  )
}

export { SellerEachbidpage }