import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    alt_email: {
        type: String,
        
        },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default:""

    },
    refreshToken: {
        type: String
    },
    role:{
        type: String,
        enum:['Buyer','Seller'],
        default:'Buyer'
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordTokenExpiry:{
        type:Date
    },
    BidHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Bid"
    }],

    BidWin: [
        {
            type: Schema.Types.ObjectId,
            ref: "Bid"
        }
    ],
    Browser:{
        type:[String],
    default: [],
    },
    
    Total_Bid:{
        type:Number,
        default:0
    },
    Mob_no:{
        type:Number,
        default:0
    },
    Trusted:{
        type:Boolean,
        default:false
    },
    

},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return 

    this.password=await bcrypt.hash(this.password,10)
    
})

userSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
     {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
     })
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
     {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     })
}
userSchema.methods.generateForgotPasswordToken=async function(){
   
    const token= await crypto.randomBytes(32).toString("hex")

    const hashedtoken=await crypto
                        .createHash("sha256")
                        .update(token)
                        .digest("hex")

    this.forgotPasswordToken=hashedtoken
    this.forgotPasswordTokenExpiry= Date.now()+10*60*1000

    return token

    }







export const User =  mongoose.model("User", userSchema)