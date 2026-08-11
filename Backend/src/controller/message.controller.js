import { Message } from "../models/message.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import mongoose from "mongoose";
import { Conversation } from "../models/conversation.model.js";
import { asyncHandler } from "../utils/asynchandler.js";

const allusermessage=asyncHandler(async(req,res)=>{
    console.log("entered in message")
const user=req.user
if(!user){
    throw new ApiError(404,"User not found")
}

const {bidId}=req.params

const conversations = await Conversation.find({
  participants: user._id,
  BidId:bidId
}).populate("participants", "username avatar");
console.log(conversations)
// const usermessage=await Message.aggregate([{
//     $match:{
//         BidId:new mongoose.Types.ObjectId(bidId),
//         seller:req.user._id
//     }
// },{
//     $lookup:{
//         from:"users",
//         localField:"customer",
//         foreignField:"_id",
//         as:"customerDetail",
//         pipeline:[{
//             $project:{
//                 _id:1,
//                 avatar:1,
//                 username:1
//             }
//         }]
//     }
// }])

console.log(conversations)
return res.status(200).json(
    new ApiResponse(200,conversations,"all user fetched successfully")
)

})
const all_message=asyncHandler(async(req,res)=>{
    const seller_id=req.user._id
    const {customer_id}=req.params
    console.log(customer_id,req.user._id)


    const convers=await Conversation.findOne({
        participants:{
            $all:[new mongoose.Types.ObjectId(customer_id),seller_id]
        }
    })
    console.log("convers",convers)
    if(!convers){
        throw new ApiError(404,"No such message with this user found")
    }
    const messages=await Message.aggregate([{
        $match:{conversationId:new mongoose.Types.ObjectId(convers._id)}
    },
])


return res.status(200).json(
    new ApiResponse(200,messages,"All message fetched Successfully")
)
})
export {allusermessage,
    all_message
}