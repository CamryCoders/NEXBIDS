import {mongoose} from 'mongoose'
import {BidHistory} from "../models/Bidhistory.model.js"
import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { AllBid } from '../models/Bid.model.js';
import { ApiResponse } from '../utils/Apiresponse.js';

const AnalysisPage=async(req,res)=>{
    console.log("analysis")
const user=req.user
if(!user){
    throw new ApiError(402,"User not found")
}
const {bidId}=req.params

const particular_Bid=await AllBid.findById(bidId)

const Bids=await BidHistory.find({BidId: new mongoose.Types.ObjectId(bidId)})

if(!Bids){
    throw new ApiError(409,"No such Bid found")
}
const startPr=particular_Bid.startingPrice
const finalPr=particular_Bid.highestBid
const diff=Math.trunc((finalPr-startPr)/7)
let target=[]


for(let i=0;i<7;i++){
    target.push(startPr+i*diff)
}


let i=0
let end=Bids.length

let newtargetArr=target.map((target,j)=>{
    if(j!=0){
     
 while(i>=end){
    mid=Math.trunc((i+end)/2)
    if(target==Bids[i].amount){
        return {
            target:target/1000,
            time:Bids[i].createdAt
        }
    }
    if(target>Bids[i].amount) i=mid
    else end=mid
}
return {
    target:target/1000,
    time:Bids[i].createdAt

}
    }else{
        return{
            target:startPr,
    time: "00:00:00"
        }
    }
   
})
target.push(finalPr)
console.log
const range_graph=await BidHistory.aggregate([
    {
        $match:{
            BidId:new mongoose.Types.ObjectId(bidId)
        }
    },
    { $facet:{
        bucket:[
             {$bucket: {
            groupBy:"$amount",
            boundaries:target,
           default: finalPr,

            output:{
                count:{$sum:1},
                latestCreatedAt: { $max: "$createdAt" }
            }
        }
    }],
        average:[
  
   {
     $group:{
        _id:null,
            avg:{
                $avg:"$amount"
            }

        }
   }
   
        ],
         uniqueUsers: [
      {
        $group: {
          _id: null,
          uniqueUser: { $addToSet: "$Bidder" }
        }
      },
      {
        $project: {
          _id: 0,
          count: { $size: "$uniqueUser" }
        }
      }
    ]
        
    },
 
   
       
    },
  
   
    
])


let all_res=[]
all_res.push(newtargetArr)
all_res.push(range_graph)

return res.status(200).json(
    new ApiResponse(200,[newtargetArr,range_graph,particular_Bid.createdAt],"ALl Graphs Fetched Successfully")
)

}
export {AnalysisPage}