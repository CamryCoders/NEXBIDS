import mongoose,{Schema} from 'mongoose'


const messageSchema= new  Schema({
    conversationId:{
        type:Schema.Types.ObjectId,
ref:"Conversation"
},
BidId:{
    type:Schema.Types.ObjectId,
    ref:"AllBid"
},
seller:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
customer:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
content:{
    type:String,
    required:true
},
by:{
type:String,
}


},{timestamps:true})

export const  Message= new mongoose.model("Message",messageSchema)