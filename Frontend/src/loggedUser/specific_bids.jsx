import React,{useState,useEffect} from 'react'
import { BidComponent } from '../usable/bidcomponent.jsx'
import { useNavigate, useParams } from 'react-router'
import{api} from '../utils/api.js'
import { Loader } from '../usable/loading.jsx'


function SpecificBid(){
    const Category=useParams()
    const [Allbid,setAllbid]=useState([])
    const [loader,setloader]=useState(true)

const getallbid=async()=>{

const allbid=await api.get(`/category_auction/${Category}`)


console.log(allbid.data.data[0])

return allbid.data.data

}    

useEffect(()=>{
   const fetch=async()=>{
           const arr=await getallbid()
           return arr
           
   }
   fetch().then((response)=>{
    setAllbid(response)
    console.log(response)
    setloader(false)
   }).catch((error)=>{
    setloader(true)
    console.log(error.response)
   })


},[])
console.log(loader)

    const Navigate=useNavigate()
   

    if(loader){
        return(
            <Loader/>
        )
    }else{
         return(
        <>
        {
            Allbid.map((bid)=>{
                return(
                    <BidComponent key={bid._id}
        
        title={bid.title}
        duration={bid.Duration}
        BidId={bid._id}
        highest_bid={bid.highestBid} 
        thumbnail={bid.productImages[0].url}
        
        />
                )
            })
        }
       
        
        </>
    )
    }

    return(
        <>
        {
            Allbid.map((bid)=>{
                return(
                    <BidComponent key={bid._id}
        
        title={bid.title} duration={bid.Duration} />
                )
            })
        }
        <BidComponent
        
        title={obj.title} duration={obj.duration} />
        
        </>
    )
}
export {SpecificBid}