
import { ApiResponse } from "../utils/Apiresponse.js";
import {messaging} from "./firebaseAdmin.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/Notification.model.js";

const seller_notification=async({tokens,bidId,amount,sellerId,user})=>{








  const pro =await Promise.allSettled(
     tokens.map((token)=>{
      
 return messaging.send({
  notification:{
    title:"New Bid",
    body:`${user.username} Placed bid of amount 💸 Rs${amount}`,
    
  },
  token:token
})

    })
   
  )
const validtoken=[]
  // console.log(pro)
  
  pro.forEach((value,index)=>{
      if(value.status==='rejected'){

      }
      else{
        validtoken.push(tokens[index])
        
      }
    })
    
    const use=await User.findOneAndUpdate({Browser:tokens[0]},
      {
        $set:{
          Browser:validtoken
        }
        
        
      },{
  returnDocument: "after"
}
    )
    
const save_notification=await Notification.create({
  receiver:sellerId,
  sender:user._id,
  Content:`${user.username} Placed amount of 💸 ${amount}`,
  type:"🔥 NEW_BID 🔥",
  BidId:bidId,
  isRead:false

})

 

}

export {seller_notification}