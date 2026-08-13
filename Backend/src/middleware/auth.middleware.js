import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asynchandler.js'
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/Apierror.js';


const verifyjwt=asyncHandler(async(req,res,next)=>{


    const token=req.cookies?.accessToken||req.header("Authorization")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(402,"UnAuthorised request")
    }
   console.log("Token",token)
  const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  const user=await User.findById(decoded?._id).select("-password -refreshToken")
  if(!user){
    throw new ApiError(402,"No user found")
  }
  req.user=user
next()
})

export {verifyjwt}

