
import { updateBid } from "./updatebid.socket.js"
import { Sendmessage } from "./message.socket.js"
const initIo=(io)=>{
    console.log("Socket module loaded");
    const viewers=new Map()
    const sellerOnline=new Map()

    
io.on("connection",(socket)=>{
console.log("a user connected",socket.id)

socket.on("joincustomer",(data)=>{
const roomId=`${data.BidId}:${data.sellerId}:${socket.user?._id.toString()}`
console.log("new customerjoined",data.sellerId)
    socket.join(roomId)
    socket.join(data.BidId)
    if (!viewers.has(data.BidId)){
        viewers.set(data.BidId,new Set())
    }
    viewers.get(data.BidId).add(socket.user?._id.toString())
    io.to(data.BidId).emit("view_count",{
        view:viewers.get(data.BidId).size
    })
    io.to(data.BidId).emit("seller_live",{
        live:sellerOnline.get(data.sellerId)
    })
    
    console.log(roomId,"customer joined")
    console.log(sellerOnline.get(data.sellerId))
})
socket.on("joinseller",(data)=>{
    socket.join(socket.user._id.toString())
    if(!sellerOnline.has(socket.user._id.toString())){
        sellerOnline.set(socket.user._id.toString(),true)
    }
    
    socket.join(`${data.BidId}:${socket.user._id.toString()}`)
    console.log("seller joined")
     io.to(data.BidId).emit("seller_live",{
        live:sellerOnline.get(socket.user._id.toString())
    })
    console.log("server sent message",sellerOnline.get(socket.user._id.toString()))
})


    updateBid(io,socket)
Sendmessage(io,socket)

    // socket.join(data.sellerId)
})


}

export {initIo}