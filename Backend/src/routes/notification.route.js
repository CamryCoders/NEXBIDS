import {Router} from 'express'
import { verifyjwt } from '../middleware/auth.middleware.js'
import { seller_notification } from '../notification/send_notification.js'
import { User_notification } from '../notification/send_notification_toUser.js'

const notifyrouter=Router()

notifyrouter.route("/notify").post(verifyjwt,seller_notification)
notifyrouter.route("/notify/prev_bidder").post(verifyjwt,User_notification)

export {notifyrouter}