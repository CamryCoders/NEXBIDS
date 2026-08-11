import { AllBid } from "../models/Bid.model.js"
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.js"

const Sendmessage=(io,socket)=>{

    socket.on("custosel",async(data)=>{
const roomId=`${data.BidId}:${data.sellerId}:${socket.user?._id.toString()}`


const conversation=await Conversation.findOne({
    participants:{$all:[socket.user?._id.toString(),data.sellerId]},
     BidId:data.BidId

})

if(!conversation){
    const conversations=await Conversation.create({
        participants:[socket.user?._id.toString(),data.sellerId],
         BidId:data.BidId,
        lastmessage:data.content,
        

    })
    const savemsg=await Message.create({
    conversationId:conversations._id,
    BidId:data.BidId,
    seller:data.sellerId,
    customer:socket.user._id.toString(),
    content:data.content,
    by:"me"
})
  await Conversation.findByIdAndUpdate(conversations._id,{
    lastmessage:data.content
  })
  io.to(`${data.BidId}:${data.sellerId}`).emit("customertoseller",savemsg)
  io.to(`${data.BidId}:${data.sellerId}:${socket.user?._id.toString()}`).emit("customertoseller",{
message:data.content,
by:"me",
customer:socket.user?._id.toString()
})
console.log("server sent custosel")
}else{
    const savemsg=await Message.create({
    conversationId:conversation._id,
    BidId:data.BidId,
    seller:data.sellerId,
    customer:socket.user._id.toString(),
    content:data.content,
    by:"me"
})
console.log("else",savemsg)
await Conversation.findByIdAndUpdate(conversation._id,{
    lastmessage:data.content
  })
  io.to(`${data.BidId}:${data.sellerId}`).emit("customertoseller",{
    content:data.content,
    by:"me",
    customer:socket.user?._id.toString()
  })
 io.to(`${data.BidId}:${data.sellerId}:${socket.user?._id.toString()}`).emit("customertoseller",{
message:data.content,
by:"me",
})
console.log("server sent custosel")
}







    })

    socket.on("seltocus",async(data)=>{
        console.log(" seltocus",data.bidId, data.customerId.toString())
        const roomId=`${data.bidId}:${socket.user?._id.toString()}:${data.customerId}`

const conversation=await Conversation.findOne({
    participants:{$all:[socket.user?._id.toString(),data.customerId]},
    BidId:data.bidId
})

if(!conversation){
    const conversations=await Conversation.create({
        participants:[data.customerId,socket.user?._id.toString()],
         BidId:data.bidId,
        lastmessage:data.content
    })
    const savemsg=await Message.create({
    conversationId:conversations._id,
    BidId:data.bidId,
    seller:socket.user._id.toString(),
    customer:data.customerId,
    content:data.content,
    by:"seller"
})
io.to(roomId).emit("sellertocustomer",{
    message:data.content,
    by:"seller"
})
io.to(`${data.bidId}:${socket.user._id.toString()}`).emit("sellertocustomer",{
    content:data.content,
    by:"seller"
})

}else{
    console.log("mesage.socket ",conversation._id,data.content)
const savemsg=await Message.create({
    conversationId:conversation._id,
    BidId:data.bidId,
    seller:socket.user._id.toString(),
    customer:data.customerId,
    content:data.content,
    by:"seller"
})
const check = await Message.findById(savemsg._id);
console.log(check);
console.log(savemsg)
}



io.to(roomId).emit("sellertocustomer",{
    message:data.content,
    by:"seller"
})
io.to(`${data.bidId}:${socket.user._id.toString()}`).emit("sellertocustomer",{
    content:data.content,
    by:"seller"
})


    })
}
export {Sendmessage}