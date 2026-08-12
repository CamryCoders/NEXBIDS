
import { ApiResponse } from "../utils/Apiresponse.js";
import {messaging} from "./firebaseAdmin.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/Notification.model.js";


const User_notification=async({tokens,bidTitle,amount,bidId,user})=>{





  const pro =await Promise.allSettled(
     tokens.map((token)=>{
      console.log(token)
 return messaging.send({
  notification:{
    title:"OUTBID",
    body:`${user.username} Outbid you in ${bidTitle} by bid amount of 💸 Rs ${amount}`,
    
    
  },
  token:token
})

    })
   
  )
  const validtoken=[]
 
  pro.forEach((value,index)=>{
      if(value.status==='rejected'){
console.log(tokens[index])
      }
      else{
        validtoken.push(tokens[index])
        
      }
    })
    console.log("val_token",validtoken)
    const use=await User.findOneAndUpdate({Browser:tokens[0]},
      {
        $set:{
          Browser:validtoken
        },
       
        
      },{
  returnDocument: "after"
}
    )
const save_notification=await Notification.create({
  receiver:use._id,
  sender:user._id,
  Content:`${user.username} Outbid you in ${bidTitle} by bid of ${amount}`,
  type:"OUTBID",
  BidId:bidId,
  isRead:false

})

 


}

export {User_notification}