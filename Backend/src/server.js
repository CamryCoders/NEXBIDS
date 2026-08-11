import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { dbConnect } from './db/connect.js'
import {io,app,server } from './index.js'
import { initIo } from './socket/bid.socket.js'



dotenv.config()
initIo(io)


app.get('/',(req,res)=>{
    res.send("hi i am here");
})
dbConnect()
.then(()=>{
server.listen(process.env.PORT,()=>{
    console.log(`this port is running on ${process.env.PORT}`)
}) 
})
.catch((error)=>{
    throw error
    console.log(error)
})