
import React,{useEffect, useState} from 'react'
import { socket } from '../utils/socket.js'

function Allmessage({BidId,sellerId}){

    const [allmsg,setallmsg]=useState([])
    const [message,setmessage]=useState("")

useEffect(()=>{
    const fxn=async()=>{
        const res=await api.get(`/message/${BidId}/${sellerId}`)
        console.log(res)
    }

    fxn().then((response)=>{

    }).catch((error)=>{
        console.log(error.response)
    })

    socket.on("customertoseller", (data) => {
        console.log("message reached")
          console.log(data.message)
          
        })
},[])


return (
    <>
     <div

                  className={`fixed bottom-20 flex flex-col justify-between right-5 w-80  h-96  bg-gradient-to-br from-slate-100 to-indigo-200 rounded-xl flex z-20 sg:w-50 sg:h-60 bg-red-200 shadow-lg transition-all duration-300 origin-bottom-right ${true
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                    }`}
                >

                  <div className='w-full h-6/40 bg-slate-800 flex p-2 flex-1  rounded-xl  items-center'>
                    <div className='flex justify-between w-30  sg:h-12 rounded-2xl '>
                      <img src="https://cdn-icons-png.flaticon.com/128/5148/5148324.png" alt="" className='bg-white   border border-black rounded-full w-10 h-10 ' /> <span className='font-bold text-white'> </span>
                    </div>

                    <button
                      onClick={(() => {
                        setopen(false)
                      })}
                      className='relative justify-end ml-auto h-7/10 w-2/10 bg-red-200 rounded-full font-bold'>
                      Close
                    </button>
                  </div>

                  <div className=' w-98/100 h-full rounded-2xl bg-red-100  flex-4 m-1 shadow-md shadow-slate-500'>
                    
                  </div>
                  <div className='flex justify-between p-1 items-end border-brown-300 bg-blue flex-2 '>
                    <input
                      value={message}
                      onChange={((e) => {
                        setmessage(e.target.value)
                      })}
                      type="text"
                      placeholder='Message'
                      className='w-9/10 h-3/10 p-1 bg-white border-black rounded-3xl '
                    />
                    <div
                      onClick={((e)=>{
e.preventDefault()
send_message(message)
                      })}
                      className='flex w-2/10 h-3/10 bg-indigo-200 h-1/10 w-10 border-brown-400 rounded-3xl '>
                      <img className=' rounded-sg'
                        src="https://cdn-icons-png.flaticon.com/128/10426/10426419.png" alt="" />
                    </div>

                  </div>

                </div>
    </>
)

}
export {Allmessage}