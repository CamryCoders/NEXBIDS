import mongoose from "mongoose";

const conversation_schema=new mongoose.Schema({
participants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
BidId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"AllBid"
},

lastmessage:{
    type:String,
    required:true
}
})

export const Conversation= new mongoose.model("Conversation",conversation_schema)
