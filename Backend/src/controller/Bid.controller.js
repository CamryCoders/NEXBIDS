import { AllBid } from "../models/Bid.model.js";
import { ApiError } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/Apiresponse.js";
import { mongoose } from "mongoose";
import { BidHistory } from "../models/Bidhistory.model.js";
import { User } from "../models/user.model.js";

import {v2 as cloudinary} from 'cloudinary'
import { upload } from "../middleware/upload.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBid=async(req,res)=>{
    console.log("entered in createbid")
    const user=req.user
    if(!user){
        throw new ApiError(400,"UnAuntheticated request")
    }
    console.log(user,req.files.productimages)
    const {title,startingPrice,width,height,weight,Description,color,model,duration,Later,Category}=req.body
   


    if(
        [title,startingPrice,width,height,weight,Description,duration,color,Later,Category].some((value)=>value.trim()==="")
    ){
        throw new ApiError(400,"All Fields are Compulsory")
    }
    
    const productimages=req.files.productimages
    console.log(productimages)
    
    if(productimages.length<3){
         
        throw new ApiError(400,"Some more Images is necessary to Upload")
    }
   

   const  productimagespath=productimages.map((image)=>image.path
        )

        const productimagesurl=await Promise.all(
            productimagespath.map(async(filepath)=>{
               const image= await uploadOnCloudinary(filepath)
               return image
            })
        )
      

    
    const [hours,min]=duration.split(":").map(Number)
    console.log(hours,min,Category)
  console.log("reached here")
    const newBid=await AllBid.create({
        title,
        startingPrice,
        width,
        height,
        weight,
        Description,
        color,
        Category,
        createdBy:user._id,
        highestBid:startingPrice,
        Duration:Date.now()+ 1000*(hours*3600+min*60)+(1000*(Later*3600)),
        Later:Date.now()+ 1000*(Later*3600),
        productImages:productimagesurl.map((image)=>{
            return {
                url:image.secure_url,
                public_id:image.public_id
            }
        })

    })
    console.log(newBid)
    if(!newBid){
        throw new ApiError(500,"Bid has not created successfully")
    }
  const bidcount=await User.findByIdAndUpdate(user._id,
    {
        $inc:{
            Total_Bid:1
        }
    },{
        new:true
    }
  )

    return res.status(200).json(
        new ApiResponse(200,newBid,"Bid created Successfully")
    )
}

const getAllBid=async(req,res)=>{
    const allBid=await AllBid.aggregate([{
        $match:{
            Duration:{
                $gte:Date.now()
            },
            Later:{
                $lte:Date.now()
            },
            createdBy:{
                $ne:new mongoose.Types.ObjectId(req.user?._id)
            }
        }
    },{
        $addFields:{
            bidType:{
                $cond:{
                    if:{$gte:["$currentBid",10000]},
                    then:"premium",
                    else:"normal"
                }
            }
        }
    }])
    if(!allBid){
        throw new ApiError(500,"No Bid found")
    }

    res.status(200).json(
        new ApiResponse(200,allBid,"Fetched all bid successfully")

    )
}

const bidDetail=async(req,res)=>{

    const {bidId}=req.params
     
    if(!bidId){
        throw new ApiError(404,"No Such Auction found")
    }
   const bid=await AllBid.findOne({_id:bidId})

   if(bid.Duration<Date.now()){
    throw new ApiError(404,"Auction has Ended")
   }
    const Bid=await AllBid.aggregate([{
        $match:{
            _id:new mongoose.Types.ObjectId(bidId)
        }
    },{
        $lookup:{
            from:"users",
            localField:"createdBy",
            foreignField:"_id",
            as:"seller",
            pipeline:[{
                $project:{
                    username:1,
                    avatar:1,
                    Browser:1
                }
            }]
        }
    },{
        $lookup:{
            from:"users",
            localField:"winner",
            foreignField:"_id",
            as :"current_user",
            pipeline:[{
                $project:{
                    username:1,
                    avatar:1,
                    Browser:1
                }
            }]
        }
    }
       
    ])
if(!Bid){
    throw new ApiError(409,"No such bid found")
}

return res.status(200).json(
    new ApiResponse(200,Bid,"Current Auction Fetched Successfully")
)

}
const livebid=async(req,res)=>{
    const user=req.user
if(!user){
    throw new ApiError(404,"Unauthentic User")
}
    const {bidId}=req.params
    if(!bidId){
        throw new ApiError(409,"No bidId received")
    }
    const {bid_amount}=req.body
    if(!bid_amount){
        throw new ApiError(400,"Amount is not given")
    }
    const current_bid=await AllBid.findByIdAndUpdate(bidId,{
        
            highestBid:bid_amount,
            winner:user._id
    }
        ,{
            returnDocument: "after"

        }
    )
if(!current_bid){
    throw new ApiError(500,"Updation of bid_amount has failed")
}

return res.status(200).json(
    new ApiResponse(200,{cur_amount:bid_amount,
        user_image:user.avatar,
        username:user.username
    },"bid updated Successfully")
)
   
}
const personBid=async(req,res)=>{
const user=req.user
if(!user){
throw new ApiError(404,"User not found")
}
const allbid=await AllBid.aggregate([
    {
        $match:{
            createdBy:user._id
        }
    }])


    return res.status(200).json(
        new ApiResponse(200,allbid,"Bid fetched successfully")
    )
}
const upcomingBid=async(req,res)=>{
    const user=req.user
    if(!user){
throw new ApiError(404,"User not found")
}
  const upcomig_Bid=await AllBid.aggregate([{
    $match:{
        Duration:{
            $gte:Date.now()
        },
        Later:{
            $gte:Date.now()
        },
        createdBy:{
            $ne: new mongoose.Types.ObjectId(user._id)
        }
    }
}
])

return res.status(200).json(
     new ApiResponse(200,upcomig_Bid,"Upcoming_Bid fetched Successfully")
)
}
            
const PremiumBid=async(req,res)=>{
    const allBid=await AllBid.aggregate([{
        $match:{
            Duration:{
                $gte:Date.now()
            },
            highestBid:{
                $gte:50000
            }
        }
    }
    ])
    if(!allBid){
        throw new ApiError(500,"No Bid found")
    }

    res.status(200).json(
        new ApiResponse(200,allBid,"Fetched all premium_bid successfully")

    )
}            
const top5bid=asyncHandler(async(req,res)=>{
    const user=req.user
    if(!user){
        throw new ApiError(402,"User not found")
    }
    const {bidId}=req.params
    const last5Bids = await BidHistory.find( bidId._id )
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("amount", "username");
 return res.status(200).json(
    new ApiResponse(200,last5Bids,"Top 5 Bids fetched successfully")
 )

})

const specific_Bid=asyncHandler(async(req,res)=>{
    const {Category}=req.params
    const user=req.user
    if(!user){
        throw new ApiError(402,"User not found")
    }

    const All_specific_Bid=await AllBid.aggregate([
        {
            $match:{
                $createdBy:{
                    $ne:new mongoose.Types.ObjectId(user._id)

                },
                Category:Category
            } 

                

        },{
            $count:"count"

        }])

        res.status(200).json(
            new ApiResponse(200,"Specific Auction Fetched Successfully")
        )
})



export{
    createBid,
    getAllBid,
    bidDetail,
    livebid,
    personBid,
    upcomingBid,
    PremiumBid,
    top5bid,
    specific_Bid
}