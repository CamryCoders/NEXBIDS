import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/Apierror.js'

const socketauth=async(socket, next) => {
    console.log("socket middleware executed")
  const cookieHeader = socket.handshake.headers.cookie;
   

  if (!cookieHeader) {
    return next(new Error("No cookie found"));
  }

  // extract token from cookie string
  const cookies = cookieHeader.split("; ").reduce((acc, c) => {
    const [key, value] = c.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const token = cookies.accessToken;
 

  if (!token) return next(new Error("No token"));

  const person = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
  const user=await User.findById(person._id)

  if(!user){
    return next( new Error("Unauntheticated request socket middleware auth failed"))
  }

  socket.user = user;

  next();
}

export {socketauth}