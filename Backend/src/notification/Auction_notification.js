
import { ApiResponse } from "../utils/Apiresponse.js";
import {messaging} from "./firebaseAdmin.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/Notification.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/Apierror.js";

const auction_notification=asyncHandler(async(req,res)=>{
const {bidId}= req.params
const user=req.user
const {title}=req.body
if(!user){
    throw new ApiError(402,"User not found")
}




if(user.Browser?.length>0){
 const pro =await Promise.allSettled(
     user.Browser.map((token)=>{
      
 return messaging.send({
  notification:{
    title:"🎉 NEW_AUCTION 🎆",
    body:`Congratulations 🥳 You have Successfully 🎉 Created your NEW Auction of ${title}`,
    
  },
  token:token
})

    })
   
  )
const validtoken=[]
  
  
  pro.forEach((value,index)=>{
      if(value.status==='rejected'){

      }
      else{
        validtoken.push(user.Browser[index])
        
      }
    })
    console.log(validtoken)
    const use=await User.findByIdAndUpdate(user._id,
      {
        $set:{
          Browser:validtoken
        }
        
        
      },{
  returnDocument: "after"
}
    )
    
    
}

 
const save_notification=await Notification.create({
  receiver:user._id,
  
  Content:`Congratulations 🥳 You have Successfully 🎉 Created your NEW Auction of ${title}`,
  type:"🎉 NEW_AUCTION 🎆",
  BidId:bidId,
  isRead:false

})

 
res.status(200).json(
    new ApiResponse(200,"New Auction notification sent successfully")
)
})

export {auction_notification}