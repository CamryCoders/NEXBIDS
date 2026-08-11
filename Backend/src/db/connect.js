import mongoose from "mongoose";
import { asyncHandler } from "../utils/asynchandler.js";
import dotenv from 'dotenv'
dotenv.config()


const dbConnect=async(req,res)=>{
    
    try {
        const response=await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
    
        console.log("DB Connected!!")
        return
    } catch (error) {
        console.log(error,"Database connection failed")
        throw error
    }
}

export {dbConnect}