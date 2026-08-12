import { useState,useEffect } from "react";

import { NotificationCard } from "../loggedUser/Notification.jsx";
import { api } from "../utils/api.js";

function Newnotification(){
const [all_notification,setall_notification]=useState([])
  const [activeid,setactiveid]=useState("")


useEffect(()=>{
    const fxn=async()=>{
        const res=await api.get("/bid/all_notification")
        console.log(res.data.data)
return res.data.data
    }
    fxn().then((res)=>{
setall_notification(res)
    })
},[])

    return (
<div className="h-full w-full flex justify-center">
<div className="p-4">
    {all_notification.length>=0?all_notification.map((notification)=>{
return <NotificationCard
onClick={()=>setactiveid(notification._id)}

className={`transition-[opacity,transform] duration-300 ${
      activeid === notification._id
        ? "opacity-50 scale-95"
        : "opacity-100 scale-100"
    }`}

key={notification._id}
          type={notification.type}
          content={notification.Content}
          time={notification.createdAt}
          isRead={notification.isRead}
          id={notification._id}

/>
    }):<div className="font-bold"> No notification Yet...</div>}

</div>


</div>
    )
}

export{Newnotification}