import {mongoose} from 'mongoose'
import { ApiError } from '../utils/Apierror.js'
import { Notification } from '../models/Notification.model.js'
import { ApiResponse } from '../utils/Apiresponse.js'
import { asyncHandler } from '../utils/asynchandler.js'

const all_notification=asyncHandler(async(req,res)=>{
    const user=req.user
    if(!user){
        throw new ApiError(402,"User not found")
    }
    const notification=await Notification.find({receiver:user._id})
 const read_notification=await Notification.updateMany({receiver:user._id},
        {
            $set:{
                isRead:true
            }
        }
    )
    res.status(200).json(
        new ApiResponse(200,notification,"ALl Notification fetched Successfully")
    )

})
const Unread_notification=asyncHandler(async(req,res)=>{
    const user=req.user
    if(!user){
        throw new ApiError(402,"User not found")
    }

    const unread_notification=await Notification.aggregate([
        {
            $match:{
                receiver:new mongoose.Types.ObjectId(user._id),
                isRead:false
            }
        }
    ])
   

    res.status(200).json(
        new ApiResponse(200,unread_notification,"All Unread Notification Fetched Successfully")
    )
})

const delete_notification=asyncHandler(async(req,res)=>{
const user=req.user
const {id}=req.params
if(!user){
    throw new ApiError(402,"User not found")
}
const delete_=await Notification.findByIdAndDelete(id)

if(!delete_){
    throw new ApiError(404,"No such notification found")
}

res.status(200).json(
    new ApiResponse(200,"Bid Delete Successfully")
)
})






export {all_notification,Unread_notification,delete_notification}