
import cookieParser from 'cookie-parser'
import express, { urlencoded } from 'express'
import morgan from 'morgan'
import  useRouter from './routes/user.routes.js'
import cors from 'cors'
import { errorHandler } from './utils/errorhandler.js'
import { bidrouter } from './routes/bid.routes.js'
import {notifyrouter} from './routes/notification.route.js'

import http from 'http'
import { createServer } from 'http'
import {Server} from 'socket.io'
import { socketauth } from './socket/socketmiddleware.js'
const app=express()
app.use(cors({
            origin:"http://localhost:5173",
    credentials:true
}))
const server=createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
    credentials:true
    }
})


app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(morgan('dev'))

app.use("/api/v1/users",useRouter)
app.use("/api/v1/users/bid",bidrouter)
app.use("/api/v1/users",notifyrouter)

app.use(errorHandler)
io.use(socketauth)

export {io,app,server}

