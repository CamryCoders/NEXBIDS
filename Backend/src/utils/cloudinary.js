import {v2 as cloudinary} from 'cloudinary'
import { asyncHandler } from './asynchandler.js'
import dotenv from 'dotenv'
import { ApiError } from './Apierror.js'
import fs from 'fs'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret:process.env.CLOUDINARY_API_SECRET

})

console.log(process.env.CLOUDINARY_API_KEY)
const uploadOnCloudinary=(async(filepath)=>{
    if(!filepath){
        throw new ApiError(404,"No images found");
    }

const result=await cloudinary.uploader.upload(filepath,{
    resource_type:"auto"
});
console.log("File has been uploaded successfully")
await fs.unlinkSync(filepath)

return result

})
export {uploadOnCloudinary}