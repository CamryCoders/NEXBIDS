import {io} from 'socket.io-client'

export const socket=io(
    "https://nexbids.onrender.com",{
        withCredentials:true,
        transports: ["polling"]
    }
)
