import mongoose, { Schema } from 'mongoose'

const notification_schema=new Schema({
    receiver:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    Content:{
        type:String,
        required:true
    },
    BidId:{
        type: Schema.Types.ObjectId,
        ref:"AllBid"
    },
    sender:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    type: {
  type: String,
  enum: [
    "NEW_BID",
    "OUTBID",
    "NEW_MESSAGE",
    "AUCTION_WON",
    "AUCTION_LOST",
    "AUCTION_ENDING",
  ],
  required: true,
},
isRead:{
    type:Boolean
}

},{timestamps:true})

export const Notification=mongoose.model("Notification",notification_schema)