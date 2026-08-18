import { AllBid } from "../models/Bid.model.js"
import { ApiError } from "../utils/Apierror.js"
import { User } from "../models/user.model.js"
import { BidHistory } from "../models/Bidhistory.model.js"
import { seller_notification } from "../notification/send_notification.js"
import { User_notification } from "../notification/send_notification_toUser.js"
import { ReturnDocument } from "mongodb"



const updateBid=(io,socket)=>{

socket.on("place_bid",async(data)=>{

const {bidId,bid_amount}=data
const userId=socket.user._id

if(!bidId){
    throw new ApiError(404,"Getting no bidId")
}

if(!userId){
    throw new ApiError(400,"No user in socket.io")
}

const curr_user=await User.findById(userId)

if(!curr_user){
    throw new ApiError(409,"NO such User found")
}



const curr_bid=await AllBid.findOneAndUpdate(
    {
        _id:bidId,
        highestBid:{$lt:bid_amount}


    }
    ,
    {
        $set:{
highestBid:bid_amount,
winner:userId
        }
    },
    {
        returnDocument:'before'
    }
)
await BidHistory.create({
    BidId:bidId,
    Bidder:userId,
    amount:bid_amount,
    username:socket.user.username

})
await seller_notification({
    tokens:data.tokens,
    bidId:bidId,
    amount:bid_amount,
    sellerId:data.sellerId,
    user:socket.user})
    if(curr_bid.winner.toString()!==userId.toString()){
await User_notification({
    tokens:data.prev_user_token,
    bidTitle:data.bidtitle,
    amount:bid_amount,bidId,
    user:socket.user})
    }

const last5Bids = await BidHistory.find({BidId:bidId})
  .sort({ createdAt: -1 })
  .limit(5)
  .populate("amount", "username");

    io.emit("update_bid",{
        amount:bid_amount,
        user_name:curr_user.username,
        user_image:curr_user.avatar
    })

io.emit("top_5_bid",{
    bidders:last5Bids
})


})


}
export {updateBid}