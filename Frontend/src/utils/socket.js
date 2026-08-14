import {io} from 'socket.io-client'

export const socket=io(
    "https://nexbids.vercel.app",{
        withCredentials:true,
        transports: ["polling"]
    }
)
