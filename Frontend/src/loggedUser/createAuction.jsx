import React,{ useEffect, useState } from "react"
import { api } from "../utils/api.js"
import { SellerBidComponent } from "../usable/sellerbidcomponent.jsx"
import { Loader } from "../usable/loading.jsx" 
import { useNavigate } from "react-router"
import { PassportLoader } from "../usable/passportLoader.jsx"


function CreateAuction() {
  const [open, setopen] = useState(true)
  const [title, settitle] = useState("")
  const [Description, setDescription] = useState("")
  const [duration, setduration] = useState("")
  const [height, setheight] = useState("")
  const [weight, setweight] = useState("")
  const [width, setwidth] = useState("")
  const [color, setcolor] = useState("")
  const [startingPrice, setstartingPrice] = useState("")
  const [model, setmodel] = useState("")
  const [images,setimages]=useState()
  const [success,setsuccess]=useState(false)
  const [mybid,setmybid]=useState([])
  const [loader,setloader]=useState(true)
  const [Later,setLater]=useState(0)
  const [clicked,setclicked]=useState(false)
  const [error,seterror]=useState("")
  const [loading,setloading]=useState(false)
  const [Category,setCategory]=useState("")

  const Navigate=useNavigate()

  useEffect(()=>{
    try {
      const mybid=async()=>{
const allbid=await api.get("/bid/mybid")
      console.log(allbid.data.data)
      return allbid.data.data
      }
      mybid().then((response)=>{
        setmybid(response)
        setloader(false)
console.log(response)
      }).catch((error)=>{
        console.log(error.message)
      })
      
    } catch (error) {
      console.log(error.message)
    }
  },[])

async function createbid(e){
 console.log(clicked,loading)
  try {
     
     setclicked(true)
     setloading(true)
     if(startingPrice>=!15000){
setLater(0)
     }
    
if(!duration.includes(":")){
  setduration("Required Proper format")
  setTimeout(() => {
    setduration("")
  }, 2000);
}
const formData=new FormData()

formData.append("title",title)
formData.append("duration",duration)
formData.append("Description",Description)
formData.append("startingPrice",startingPrice)
formData.append("width",width)
formData.append("weight",weight)
formData.append("height",height)
formData.append("color",color)
formData.append("model",model)
formData.append("Later",Later)
formData.append("Category",Category)
images.forEach((file)=>{
  formData.append("productimages",file)
})
const response=await api.post("/bid/createAuction",
  formData
)
setsuccess(true)
console.log(response)
if(response){
  const res=await api.get(`/create_auction/${response.data.data[0]._id}`,
    {
title:response.data.data[0].title
    }
    
  )
  console.log(res)
}

    
  } catch (error) {
    setloading(false)
    
    console.log(error.message)
    seterror(error.message)
    setclicked(false)
  }
}







  if (open) {
    return (
    <>
     
      

      
 {!loader?

  (mybid.map((bid)=>(
  <SellerBidComponent key={bid._id}
title={bid.title}
duration={bid.Duration}
highest_bid={bid.highestBid}
BidId={bid._id}
thumbnail={bid.productImages[0].url}


  />
))):<Loader/>}
   

      
        

      <button className="
        
        fixed
    bottom-4 right-4
    md:bottom-6 md:right-6
    px-4 py-3
     rounded-full
     bg-slate-900
     text-white
     shadow-lg
     hover:scale-105
     transition
         md:h-15 md:w-35 lg:h-1/10 lg:w-1/10 bg-gradient-to-r from-blue-400  to-indigo-600 text-bold rounded-2xl shadow-sm shadow-slate-300 font-bold "
           onClick={((e) => {
             e.preventDefault()
             setopen(!open)
           })}
         >

           Create Auction
         </button>
       </>

  


    )
  } else {

    return (
      <>
<div class={`fixed inset-0 backdrop-blur-sm z-5000 justify-center items-center bg-black/30 w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 relative overflow-hidden select-none ${loading ? "hidden" : ''}`}>

    <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600"></div>

    <div class="mb-6 space-y-1 flex justify-between">
      <div>
        <h2 class="text-2xl font-black tracking-tight text-slate-800">Mint New Auction</h2>
        <p class="text-xs font-medium text-slate-400">Deploy a new lot item token directly into the live bidding pool.</p>
      </div>
      <div
        onClick={() => setopen(true)}
        className="w-8 h-8 rounded-xl hover:bg-red-200 transition-colors duration-300 cursor-pointer flex items-center justify-center">
        <img src="https://img.icons8.com/?size=48&id=T9nkeADgD3z6&format=png" alt="Close" />
      </div>
    </div>

    <form id="createAuctionForm" action="#" method="POST" class="space-y-5" onSubmit={(e) => e.preventDefault()}>

      {/* Product Gallery Assets */}
      <div class="space-y-1.5">
        <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Product Gallery Assets</label>
        <label for="gallery-upload" class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl cursor-pointer transition-all group">
          <div class="flex flex-col items-center justify-center pt-4 pb-3 text-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-400 group-hover:text-indigo-500 transition-colors mb-1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            <p class="text-xs font-extrabold text-slate-700">Drop item images or click to browse</p>
            <p class="text-[10px] text-slate-400 font-semibold mt-0.5">Select multiple files (PNG, JPG up to 10MB)</p>
          </div>
          <input
            onChange={(e) => setimages([...e.target.files])}
            id="gallery-upload" type="file" multiple class="hidden" accept="image/*" />
        </label>
      </div>

      {/* Asset Title & Duration */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="sm:col-span-2 space-y-1.5">
          <label for="item-title" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Asset Title</label>
          <input
            readOnly={clicked}
            value={title}
            onChange={(e) => settitle(e.target.value)}
            type="text" id="item-title" placeholder="e.g., Cybernetic Vanguard Blade #02" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>
        <div class="space-y-1.5">
          <label for="item-duration" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Duration (HH:MM)</label>
          <input
            readOnly={clicked}
            value={duration}
            onChange={(e) => setduration(e.target.value)}
            type="text" id="item-duration" placeholder="24:30" pattern="^[0-9]+:[0-5][0-9]$" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-[10px] font-black text-center text-slate-800 placeholder-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300" />
        </div>
      </div>

      {/* Dimensions & Weight */}
      <div class="grid grid-cols-3 gap-4">
        <div class="space-y-1.5">
          <label for="item-width" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Width</label>
          <input
            readOnly={clicked}
            value={width}
            onChange={(e) => setwidth(e.target.value)}
            type="text" id="item-width" placeholder="12 cm" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>
        <div class="space-y-1.5">
          <label for="item-height" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Height</label>
          <input
            readOnly={clicked}
            value={height}
            onChange={(e) => setheight(e.target.value)}
            type="text" id="item-height" placeholder="45 cm" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>
        <div class="space-y-1.5">
          <label for="item-weight" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Weight</label>
          <input
            readOnly={clicked}
            value={weight}
            onChange={(e) => setweight(e.target.value)}
            type="text" id="item-weight" placeholder="1.4 kg" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>
      </div>

      {/* Model, Category & Color Block */}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="space-y-1.5">
          <label for="item-model" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Model / Batch</label>
          <input
            readOnly={clicked}
            value={model}
            onChange={(e) => setmodel(e.target.value)}
            type="text" id="item-model" placeholder="Alpha-V2" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>

        {/* Category Choice Selection */}
        <div class="space-y-1.5">
          <label for="item-category" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
          <select
            disabled={clicked}
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
            id="item-category"
            required
            class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer">
            <option value="" disabled selected>Select Category</option>
            <option value="digital_art">Digital Art</option>
            <option value="Clothes">Clothes</option>
            <option value="Utensils">Utensils</option>
            <option value="Appliances">Appliances</option>
            <option value="Electronics">Electronics</option>
            <option value="Furnitures">Furnitures</option>
            <option value="Books">Books</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        <div class="space-y-1.5">
          <label for="item-color" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Color</label>
          <input
            readOnly={clicked}
            value={color}
            onChange={(e) => setcolor(e.target.value)}
            type="text" id="item-color" placeholder="Obsidian Black" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>
      </div>

      {/* Description */}
      <div class="space-y-1.5">
        <label for="item-desc" class="block text-xs font-bold text-slate-500 uppercase tracking-wider">Item Description</label>
        <textarea
          readOnly={clicked}
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          id="item-desc" rows="3" placeholder="Provide complete conditions structural details, certificates data, and historical background specs..." required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"></textarea>
      </div>

      {/* Price & Delayed Start */}
      <div class="space-y-1.5 flex justify-between items-end gap-3">
        <div class="w-full">
          <label for="item-startingPrice" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Starting Price</label>
          <input
            readOnly={clicked}
            value={startingPrice}
            onChange={(e) => setstartingPrice(e.target.value)}
            type="number" id="item-startingPrice" placeholder="e.g 2400" required class="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all" />
        </div>

        <div className={`w-1/3 ${startingPrice >= 15000 ? "" : "hidden"}`}>
          <label htmlFor="hours" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hours Later</label>
          <select
            onChange={(e) => setLater(e.target.value)}
            name="hours" className="w-full px-3 py-3 border border-indigo-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500">
            <option value="0" className="bg-slate-100 font-semibold">Now</option>
            <option value="1" className="bg-violet-100 font-semibold">1 hour</option>
            <option value="4" className="bg-violet-200 font-semibold">4 hours</option>
            <option value="6" className="bg-violet-300 font-semibold">6 hours</option>
            <option value="8" className="bg-violet-400 font-semibold">8 hours</option>
            <option value="16" className="bg-violet-500 font-semibold">16 hours</option>
            <option value="24" className="bg-violet-600 font-semibold">24 hours</option>
            <option value="48" className="bg-violet-700 font-semibold">48 hours</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={(e) => {
          console.log("uploading start");
          e.preventDefault();
          createbid();
        }}
        type="submit" class="w-full py-4 rounded-xl text-sm font-black text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 bg-[size:150%_auto] hover:bg-right transition-all duration-300 shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-[0.99]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
        Deploy Live Auction Container
      </button>

    </form>
  </div>

  {/* Modal Section */}
  <div id="creationSuccessModal" class={`${loading ? '' : "hidden"} fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in`}>
    <div class="bg-white rounded-[28px] p-6 max-w-sm w-full border border-slate-100 shadow-2xl text-center space-y-4">
      {success ? (
        <>
          <div class="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>

          <div class="space-y-1">
            <h3 class="text-lg font-black text-slate-800">Auction Created Successfully</h3>
            <p class="text-xs font-medium text-slate-400 leading-relaxed">Your lot node has been broadcasted to the terminal framework network. Bidders can now place real-time parameters.</p>
          </div>
        </>
      ) : (
        <PassportLoader />
      )}

      {(error || success) && (
        <button
          onClick={() => {
            setopen(false);
            setsuccess(false);
            Navigate("/user/bid");
          }}
          class="w-full group py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors">
          {error ? error : "View Active Container Log"}
        </button>
      )}
    </div>
  </div>




       
      </>
    )
  }
}
export { CreateAuction }