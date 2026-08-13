import { createBid,getAllBid, livebid, personBid, PremiumBid, specific_Bid, top5bid, upcomingBid } from "../controller/Bid.controller.js";
import { Router } from "express";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { bidDetail } from "../controller/Bid.controller.js";
import { all_message, allusermessage } from "../controller/message.controller.js";
import { AnalysisPage } from "../controller/Analytics.controller.js";
import { all_notification, Unread_notification } from "../controller/Notification.controller.js";

const bidrouter=Router()

bidrouter.route("/createAuction").post(verifyjwt,

    upload.fields([
        {
            name:"productimages",
            maxCount:5
        }
    ]),
    
    createBid)  

bidrouter.route("/getAllBid").get(verifyjwt,getAllBid)
bidrouter.route("/bidDetail/:bidId").get(verifyjwt,bidDetail)
bidrouter.route("/livebid/:bidId").post(verifyjwt,livebid)
bidrouter.route("/mybid").get(verifyjwt,personBid)
bidrouter.route("/usermessage/:bidId").get(verifyjwt,allusermessage)
bidrouter.route("/all_message/:customer_id").get(verifyjwt,all_message)
bidrouter.route("/upcomingBid").get(verifyjwt,upcomingBid)
bidrouter.route("/PremiumBid").get(verifyjwt,PremiumBid)
bidrouter.route("/top5bid/:bidId").get(verifyjwt,top5bid)
bidrouter.route("/analysis/:bidId").get(verifyjwt,AnalysisPage)

bidrouter.route("/all_notification").get(verifyjwt,all_notification)
bidrouter.route("/Unread_notification").get(verifyjwt,Unread_notification)
bidrouter.route("/category_auction/:Category").get(verifyjwt,specific_Bid)


export {bidrouter}
