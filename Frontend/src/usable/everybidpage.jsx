import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../utils/api.js'
import { Loader } from './loading.jsx'
import { socket } from '../utils/socket.js'
import { Imageslider } from './image_swiper.jsx'


function Eachbidpage() {
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
  const [live_user_browser, setlive_user_browser] = useState("")
  const [nextbid, setnextbid] = useState(0)
  const [images, setimages] = useState([])
  const [open, setopen] = useState(false)
  const [seller, setseller] = useState("")
  const [sellerId, setsellerId] = useState("")
  const [message, setmessage] = useState("")
  const [chat,setchat]=useState('')
  const [tokens,settokens]=useState([])
  const [view_count,setview_count]=useState("")
  const [seller_live,setseller_live]=useState(false)
  const [top5bidder,settop5bidder]=useState([])
  const [notified,setnotified]=useState(false)

const chatref=useRef(null)
useEffect(()=>{
const fxn=async()=>{
  const res=await api.get(`/bid/top5bid/${BidId}`)
  
  return res.data.data
}
fxn().then((res)=>{
settop5bidder(res)
})

},[])


  function timeAgo(createdAt) {
  const now = new Date();
  const created = new Date(createdAt);

  const diff = now - created; 
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  if (days < 30) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}
useEffect(()=>{
if(chatref.current){
  chatref.current.ScrollTop=chatref.current.ScrollHeight;
}
},[chat])


  useEffect(() => {
    apibid().then(async(response) => {
      console.log("fetched")
      console.log(response)
      setlive_user(response[0]?.current_user[0]?.username)
            setlive_user_browser(response[0]?.current_user[0]?.Browser)

      setliveamount(response[0].highestBid)
      setbidDetail(response)
      setseller(response[0].seller[0].username)
      setsellerId(response[0].seller[0]._id)
      setimages(response[0].productImages)
      settokens(response[0].seller[0].Browser)

      console.log(response[0].seller[0].Browser)
socket.emit("joincustomer",{
  BidId:BidId,
  sellerId:response[0].seller[0]._id,
  })

const top5bid=await api.get(`bid/top5bid/${BidId}`)
settop5bidder(top5bid.data.data)
console.log(top5bid.data.data)
      setloader(false)
    }).catch((error) => {
      console.log(error)
      setloader(true)
      // setmessage("Facing Error while loading the page")
    })
  }, [])

useEffect(()=>{
const update_handler= async(data) => {
  
      console.log("data",data)
      
      setlive_user(data.user_name)
      setliveamount(data.amount)
     
      
    
      
    }
    socket.on("update_bid", update_handler)
return ()=>{
  socket.off("update_bid",update_handler)
}
},[])

 useEffect(()=>{
      const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App un-minimized / back in focus.");
        
       
        if (!socket.connected) {
          console.log("Socket is disconnected. Reconnecting now...");
          socket.connect(); 
        }
      }
    };
    },[])

  useEffect(() => {
    const handler=(data)=>{
     console.log(data.view)
    }
    
    socket.on("connect", () => {
     
      console.log("connected", socket.id)
    })
    socket.on("disconnect", () => {
      console.log("disconnected", socket.id)
    })
    socket.on("view_count",(data)=>{
       setview_count(data.view)
        console.log(data.view)
      })
    


socket.on("seller_live",(data)=>{
 
  setseller_live(data.live)
  
})

    socket.on("sellertocustomer", (data) => {
      console.log(data.message)
      setchat((prev)=>[...prev,{
        content:data.message,
        by:"seller"
      }])
    })
      
      

   

    // return ()=>socket.off("view_count",handler)

  }, [])
  const updatebid = async () => {

    if (nextbid <= liveamount) {
      setwarning(true)
      setnextbid("Please bid Higher Amount")
      setTimeout(() => {
        setwarning(false)
        setnextbid(0)
      }, 1000);
    } else {
      socket.emit("place_bid", {
        bidId: BidId,
        bid_amount: nextbid,
        tokens:tokens,
        sellerId:sellerId,
        prev_user_token:live_user_browser,
        bidtitle:bidDetail[0].title

      }
      )
    }


  }

  
useEffect(()=>{
  const fxn=(data)=>{
    console.log(data)
  settop5bidder(data.bidders)

}
const fxn1=(data)=>{
  console.log(data.message)
  setchat((prev)=>[...prev,{
    content:data.message,
    by:"me"
      
}])
setmessage("")
}
socket.on("top_5_bid",fxn)

socket.on("customertoseller",fxn1)

return ()=>{
  socket.off("customertoseller",fxn1)
  socket.off("top_5_bid",fxn)
}

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
  const send_message = (value) => {

    const msg = {
      BidId: BidId,
      sellerId: sellerId,
      content: value,
      by:"me"
    }
    socket.emit("custosel", msg)
    
    
    
  }

  const all_chat=async()=>{
    try {
      const res=await api.get(`/bid/all_message/${sellerId}`,{
        params:{
          BidId
        }
      })
      console.log(res)
      setchat(res.data.data)
      
    } catch (error) {
      console.log(error.message)
    }
  }

  if (loader) {
    return (
      <Loader />
    )
  }
  return (


    <>
      <div class="w-full max-w-6xl mx-auto px-4 py-8 select-none">

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div class="lg:col-span-5 w-full space-y-4">
            <div class="w-full aspect-square bg-gradient-to-br from-slate-100 to-indigo-100/50 rounded-3xl border border-slate-200/60 p-8 flex items-center justify-center relative overflow-hidden shadow-xl shadow-slate-100/50">


              <div id="carousel-track" class="w-full h-full flex items-center justify-center text-indigo-500 transition-all duration-300">
                <Imageslider images={images} />
              </div>

              <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm z-1 border border-slate-200 text-xs font-bold text-slate-700 px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-cyan-500"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                <span id="watcher-count" class="text-slate-900 font-extrabold">{view_count} </span> {view_count<=1?"view":"views"}
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

<details className='w-full bg-indigo-100 border-1 border-indigo-400 border-2 rounded-lg'>
<summary className='p-2 Font-Bold  sm:flex '>More Details</summary>
<div className='flex mb-3 '>
<span className='ml-3 font-Bold '>Width: <span className='p-1 font-playfair border border-rose-200 bg-white text-black font-serif italic text-md m-1  rounded-lg'>{bidDetail[0].width} cm</span> </span>
<span className='ml-3 font-Bold'>Height:<span className='p-1 border border-rose-200 bg-white text-black font-serif italic text-md m-1 rounded-lg'>{bidDetail[0].height}cm</span></span>
</div>

<div  className='flex mb-3'>
  <span className='ml-3 font-Bold'>Weight:<span className='p-1 border border-rose-200 bg-white text-black font-serif italic text-md m-2 rounded-lg'>{bidDetail[0].weight}</span></span>
<span className='ml-3  font-Bold'>Color:<span className='p-1 border border-rose-200 bg-white text-black font-serif italic text-md m-2 rounded-lg'>{bidDetail[0].color}</span></span>

</div>


</details>

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
                Top Recent Higher Bids
              </h4>
              <div class="space-y-1.5">

    {
top5bidder?top5bidder.map((bidder,i)=>{
return <div key={i} class="flex  items-center justify-between p-2.5 rounded-xl bg-indigo-50/40 border border-indigo-100/50 text-xs">
                  <div class="flex items-center gap-2">
                    <span class={`w-5 h-5 rounded-md  text-[10px] font-black text-white flex ${i==0?"bg-indigo-600":"bg-slate-700"} items-center justify-center`}>{i+1}</span>
                    <span class="font-extrabold text-slate-700 transition-all duration-2000 opacity-100">{bidder.username}</span>
                    <span class="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 font-black text-[9px] uppercase rounded">{i==0?"Highest":""}</span>
                  </div>
                  <div class="text-right">
                    <span class={`font-black  ${i==0?"text-indigo-600":"text-slate-700"} mr-3`}>Rs{bidder.amount}</span>
                    <span class="text-slate-400 font-semibold text-[10px]"> {timeAgo(bidder.createdAt)} </span>
                  </div>
                </div>
}):<></>

    }

                

              </div>
            </div>

            <div class="space-y-4 pt-2">
              <div class="flex flex-col sm:flex-row items-center gap-3">

                <div class="relative w-full sm:flex-1">
                  <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-sm font-black text-slate-400">$</span>
                  <input
                    value={nextbid}
                    onChange={((e) => {
                      setnextbid(e.target.value)
                    })}
                    type={warning ? "text" : "number"}
                    step="1"
                    // oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                    placeholder="Enter whole number (e.g. 4900)"
                    class="w-full pl-8 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm font-extrabold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                  />
                </div>


                <button
                  onClick={(()=>{
                    nextbid>liveamount?setnotified(true):setnotified(false)
                    updatebid()
                  })}

                  class="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-200 shrink-0 flex items-center justify-center gap-2 active:scale-95">
                  Place Secure Bid
                </button>

                <div

                  className={`fixed bottom-20 flex flex-col justify-between right-5 w-80  h-90  bg-gradient-to-br from-slate-100 to-indigo-200 rounded-xl  z-20 sg:w-50 sg:h-60 bg-red-200 shadow-lg transition-all duration-300 origin-bottom-right ${open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >
                  {/* <div className='w-full h-full relative flex '> */}

                    <div className='w-full h-6/50 bg-slate-800 flex p-2 flex-1  rounded-xl  items-center'>
                      <div className='flex justify-between w-30  sg:h-12 rounded-2xl '>
                        <img src="https://cdn-icons-png.flaticon.com/128/5148/5148324.png" alt="" className='bg-white   border border-black rounded-full w-10 h-10 ' /> 
                        <div>
<span className='font-bold text-white'>{seller} </span>
<h4 className={` ${seller_live?"text-green-400 font-bold animate-pulse":"text-red-400 "}`}>{seller_live?"Online":"Offline"}</h4>
                        </div>
                        
                      </div>

                      <button
                        onClick={(() => {
                          setopen(false)
                        })}
                        className='relative justify-end ml-auto h-7/10 w-2/13 bg-red-200 rounded-full font-bold text-sm'>
                        Close
                      </button>
                    </div>

                    <div ref={chatref} className=' overflow-y-auto scrollbar-none w-98/100 h-full p-3 rounded-2xl bg-red-300  flex-4 m-1 shadow-md shadow-slate-500'>
                    {
                      chat.length>0?chat.map((msg,index)=>{
                        return(

                          <div key={index} className= {`w-full mb-2 flex ${msg.by==="me"?"justify-end":""}`}>
                            <div className={`flex p-2  rounded-2xl items-center justify-center w-1/2 ${msg.by==="me"?"bg-indigo-300 text-white":"bg-white text-black"} rounded-tl-none text-sm shadow-md font-bold`}>
                                  {msg.content}
                            </div>


                          </div>
                        )
                      }):<></>
                    }
                  
                  </div>
                    <div className='flex justify-between p-1 items-end border-brown-300 bg-blue flex-1'>
                      <input
                        value={message}
                        onChange={((e) => {
                          setmessage(e.target.value)
                        })}
                        type="text"
                        placeholder='Message'
                        className='w-9/10 h-5/6 p-1 bg-white border-black rounded-3xl'
                      />
                      <div
                        onClick={((e) => {
                          e.preventDefault()
                          send_message(message)
                        })}
                        className={`flex flex-1 bg-indigo-200 h-5/6 w-10 hover:scale-90   border-brown-400 rounded-3xl `}>
                        <img className=' rounded-sg'
                          src="https://cdn-icons-png.flaticon.com/128/10426/10426419.png" alt="" />
                      </div>

                    </div>

                  {/* </div> */}


                </div>
                <button
                  onClick={(() => {
                    all_chat()
                    setopen(true)
                  })}
                  id="open-chat-btn" class="w-full sm:w-auto px-5 py-3.5  bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 transform transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Chat with Seller
                </button>



              </div>
            </div>

          </div>
        </div>
      </div>


      <div id="seller-chat-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-red-500 border-l border-red-200 shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out  flex flex-col justify-between">


        <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <h4 class="text-xs font-black text-slate-800">Secure Desk: Apex_Vaults</h4>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average response: 2m</p>
            </div>
          </div>
          <button id="close-chat-btn" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>


        <div class="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40 text-xs">
          <div class="bg-indigo-50 text-indigo-900 border border-indigo-100/50 p-3 rounded-2xl rounded-tl-none max-w-[85%] font-medium">
            Hello! Thanks for checking out Lot #098. The reserves are open and physical certificates are verified. Let me know if you have specific inquiries.
          </div>
        </div>


        <div class="p-3 border-t border-slate-100 bg-white">
          <div class="flex items-center gap-2">
            <input type="text" placeholder="Write premium message..." class="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
            <button class="p-2.5 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      </div>


    </>
  )
}

export { Eachbidpage }