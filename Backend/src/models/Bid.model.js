import mongoose,{Schema} from "mongoose";

const BidSchema= new Schema({
createdBy:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
title:{
type:String,
required:true
},
startingPrice:{
    type:Number,
    required:true,
},
height:{
    type:String,
    required:true
},
width:{
    type:String,
    required:true

},
weight:{
    type:String,
    required:true
},
Duration:{
    type:Number,
    required:true
},
Later:{
    type:Number,
},
color:{
    type:String,
    required:true
},
Description:{
type:String,
required:true
},
productImages:[
    {
     url:String,
     public_id:String,
     
    }
],
winner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},

highestBid:{
    type:Number,
    default:0
},
Category:{
    type:String,
    required:true
},




})

export const AllBid=new mongoose.model("AllBid",BidSchema)