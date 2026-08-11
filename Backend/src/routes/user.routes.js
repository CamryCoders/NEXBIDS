import {Router} from 'express'
import { verifyjwt } from '../middleware/auth.middleware.js'

import { registerUser,loginUser,refreshAccessToken, forgotPassword, changeCurrentPassword, getCurrentUser, save_change, upload_avatar, logoutUser } from '../controller/user.controller.js'
import {save_token} from '../controller/user.controller.js'
import { upload } from '../middleware/upload.middleware.js'

const useRouter=Router()

useRouter.route("/login").post(
    loginUser)


useRouter.route("/register").post(registerUser)
useRouter.route("/forgotpassword").post(forgotPassword)
// useRouter.post("/forgotpassword",(req,res)=>{
// console.log("forgotpassword",forgotPassword)
//  res.status(200)
// })
useRouter.route("/refresh-token").post(verifyjwt,refreshAccessToken)
useRouter.route("/resetPassword/:token").post(changeCurrentPassword)
useRouter.route("/save_token").post(verifyjwt,save_token)
useRouter.route("/user_profile").get(verifyjwt,getCurrentUser)
useRouter.route("/save_change").post(verifyjwt,save_change)
useRouter.route("/upload_avatar").post(verifyjwt,
    upload.single("avatar"), upload_avatar
)
useRouter.route("/logout_user").post(verifyjwt,logoutUser)


export default useRouter