import {Router} from 'express'
import { verifyjwt } from '../middleware/auth.middleware.js'
import { seller_notification } from '../notification/send_notification.js'
import { User_notification } from '../notification/send_notification_toUser.js'
import { delete_notification } from '../controller/Notification.controller.js'
import { auction_notification } from '../notification/Auction_notification.js'

const notifyrouter=Router()

notifyrouter.route("/notify").post(verifyjwt,seller_notification)
notifyrouter.route("/notify/prev_bidder").post(verifyjwt,User_notification)
notifyrouter.route("/delete_notification/:id").delete(verifyjwt,delete_notification)
notifyrouter.route("/create_auction/:bidId").get(verifyjwt,auction_notification)

export {notifyrouter}