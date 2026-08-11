import mongoose, {Schema} from "mongoose";
import { AllBid } from "./Bid.model.js";

const Bidhistory_schema=new Schema({
    BidId:{
        type:Schema.Types.ObjectId,
        ref:"AllBid",
        required:true
    },
    Bidder:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:Number,
         required:true
    },
    username:{
        type:String
    }

    

},{timestamps:true})

export const BidHistory=new mongoose.model("BidHistory",Bidhistory_schema)
