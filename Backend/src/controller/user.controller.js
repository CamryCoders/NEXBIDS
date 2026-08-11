import {User} from '../models/user.model.js'
import { asyncHandler } from '../utils/asynchandler.js'
import { ApiResponse } from '../utils/Apiresponse.js'
import { ApiError } from '../utils/Apierror.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { uploadOnCloudinary } from '../utils/cloudinary.js'


const generateAccessAndRefreshToken=async (userId)=>{
try{
    console.log(userId)
const user=await User.findById(userId)
console.log(user)
    const accesstoken= await user.generateAccessToken()
    const refreshtoken= await user.generateRefreshToken()
    // console.log("this is tokens",accesstoken,refreshtoken)
 user.refreshToken=refreshtoken
    await user.save({validateBeforeSave:false})

    return {accesstoken,refreshtoken}



}
catch(error){
    console.log(error)
    throw new ApiError(500,"Something went wrong while generating refresh and access token");
}
}




const registerUser= asyncHandler( async(req,res)=>{
    console.log("register hit")

    const {email,password,username}=req.body
    console.log(email,username)

    if([email,password,username].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"all fields are compulsory")
    }
    const user_exist=await User.findOne({
        $or:[{username},{email}]
    })
    if(user_exist){
        throw new ApiError(400,"User with this email or username already exist");
    }
    

   
    

   

    const new_user=await User.create({
        username:username,
        
        email:email,

        password
       
    })

   const created_user=await User.findById(new_user._id).select(
    "-password -refreshToken"   )

    if(!created_user){
        throw new ApiError(500,"something went wrong while registering user")

    }

    return res.status(200).json(
        new ApiResponse(200,created_user,"user registered successfully")
    )



})

const loginUser=asyncHandler(async(req,res)=>{
    console.log(req.body)
        const{email,password}=req.body

        if(
            [email,password].some((field)=>field.trim()==="")
        ){
           throw new ApiError(400,"Please complete all fields")
        }

        if(!email.includes('@')){
            throw new ApiError(402,"Please fill valid email")
        }

        const user_exist=await User.findOne({
        email,
        }).select(
            "-refreshToken"
        )
        if(!user_exist){
           throw new ApiError(402,"User not found ")
        }

        const isPasswordValid= await user_exist.isPasswordCorrect(password)
        if(!isPasswordValid){
            throw new ApiError(404,"Wrong Password")
        }
      const {accesstoken,refreshtoken}=await generateAccessAndRefreshToken(user_exist._id)
      
   const loggedInUser=await User.findById(user_exist._id).select("-password -refreshToke")
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }
        
        return res
        .status(200)
        .cookie("accessToken",accesstoken,options)
        .cookie("refreshToken",refreshtoken,options)
        .json(
            new ApiResponse(200,{
                user:loggedInUser,accesstoken,refreshtoken
            },"User logged succesfully")
        )



})

const logoutUser=asyncHandler(async(req,res)=>{
await User.findByIdAndUpdate(req.user?._id,
    {
        
        $set:{
            refreshToken:undefined
        }
    },
    {
        new:true
    }
)
   const options={
        httpOnly:true,
        secure:false,
    }

return res.status(200)
.clearCookie("accessToken")
.clearCookie("refreshToken")
.json(new ApiResponse(200,"User loggedOut successfully"))

})


const refreshAccessToken=asyncHandler(async(req,res)=>{
    const refToken_incoming=req.cookies?.refreshtoken||req.body.refreshtoken
    if(!refToken_incoming){
        throw new ApiError(401,"unauthorized request")
    }
   try {
     const refToken_exist=await jwt.verify(refToken_incoming,process.env.REFRESH_TOKEN_SECRET)
     const user=await User.findById(refToken_exist?._id)
     if(!user){
         throw new ApiError(401,"unauthorized request")
     }
     if(refToken_exist===user.refreshToken){
        const {accesstoken,refreshtoken}=generateAccessAndRefreshToken(user._id)
         
     }
     else{
 throw new ApiError(401,"refresh token is expired")
     }
 
     res
     .status(200)
     .cookies("accesstoken",accesstoken,options)
     .cookies("refreshtoken",refreshtoken,options)
     .json(
         new ApiResponse(200,"New session activated")
     )
   } catch (error) {
    console.log("Token refresh error",error)
    throw new ApiError(409,"unauthorized access")
    
   }
        
})

const changeCurrentPassword=async(req,res)=>{
    const {token}=req.params
    const hashedToken=await crypto.createHash("sha256").update(token).digest("hex")
if(!token){
    throw new ApiError(400,"Couldn't find Token")
}

const user=await User.findOne({
    forgotPasswordToken:hashedToken})

    const {password,confirmPassword}=req.body
    if(!user){
        throw new ApiError(400,"User does not exist")
    }
if(Date.now()>user.forgotPasswordTokenExpiry){
throw new ApiError(402,"Time Out For reset Password")
}
    
    user.password=password
    await user.save({validateBeforeSave:false})

    res.status(200).json(
        new ApiResponse(200,"Password Changed Successfully")
    )
}
const getCurrentUser=asyncHandler(async(req,res)=>{
    if(!req.user){
        throw new ApiError(402,"User not found")
    }
 const user=await User.findById(req.user._id)


    return res
    .status(200)
    .json(
         new ApiResponse(200, user,"Current user fetched successfully")
        
)})

const forgotPassword= asyncHandler(async(req,res)=>{
const {email}=req.body

const user=await User.findOne({email})

if(!user){
    throw new ApiError(400,"Please fill valid email")
}

const token=await user.generateForgotPasswordToken()
await user.save()

const url=`http://localhost:5173/reset-password/${token}`
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_OWNER,
        pass:process.env.EMAIL_PASS
    },
})

const response=await transporter.sendMail({
    to:email,
    subject:"password Reset",
    text:`click here to reset your password  ${url}.
    This link is valid for only Ten minutes.
    `
})
if(!response){
    throw new ApiError(500,"email not sent")
}
console.log(response)

return res.status(200).json(
    new ApiResponse(200,"Email sent successfully")
)
})
const save_token=asyncHandler(async(req,res)=>{
const user=req.user
console.log(user)
if(!user){
    throw new ApiError("User not found")
}
const {Token}=req.body
if(!Token){
    throw new ApiError("Token not found")
}
  console.log(Token)
const saved_token=await User.findByIdAndUpdate(user._id,{
    $addToSet:{
        Browser:Token
    }
},{
    new:true
})
res.status(200).json(200,saved_token,"Token saved successfully")
})
const save_change=asyncHandler(async(req,res)=>{
    const user=req.user
    const {email,alt_email,Mob_no,Username}=req.body
    if (!user){
        throw new ApiError(402,"User not found")
    }
    console.log(email,alt_email)
   const data=await User.findByIdAndUpdate(req.user._id,
    {
        email:email,
        alt_email:alt_email,
        Mob_no:Mob_no,
        username:Username

    },{
        returnDocument:'after'
    }

   )
   res.status(200).json(
    new ApiResponse(200,data,"Profile Changed Successfully")
   )
})
const upload_avatar=asyncHandler(async(req,res)=>{
    console.log("entered")
    const user=req.user
    if (!user){
        throw new ApiError(402,"User not found")
    }
   
    const avatar=req.file
    console.log(avatar)
    const avatar_path=avatar.path

    const cloud_url=await uploadOnCloudinary(avatar_path)
    const data=await User.findByIdAndUpdate(user._id,{
        avatar:cloud_url.url

    },{
        returnDocument:'after'
    })
    res.status(200).json(
        new ApiResponse(200,data,"Profile image update Successfully")
    )

})

export  {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    refreshAccessToken,
    forgotPassword,
    save_token,
    getCurrentUser,
    save_change,
    upload_avatar
}