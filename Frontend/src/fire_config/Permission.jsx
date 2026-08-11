import { useEffect } from 'react'
import { messaging } from './config.js'
import { getToken } from 'firebase/messaging'
import { api } from '../utils/api.js'
const registration = await navigator.serviceWorker.register(
  "/firebase-messaging-sw.js"
);



function GenerateToken() {
    async function requestPermission() {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
            const token = await getToken(messaging, { vapidKey: "BF_sD7LH9cClKJ3e1PPWyeBFIB9087IP9LpAJPl6C3QwRGr6j_G72iMfswKxM0EJgWkVqYqjoQyT9Ui0V2bdMKY",
serviceWorkerRegistration: registration,
             })
            console.log("token gen ", token)
            const res = await api.post("/save_token", {
                Token: token
            }
            )
            console.log(res)
            if (res.status == 200) {
                console.log("saved token successfully")
            }

        }
        else if (permission === 'denied') {
            alert("You denied for the notification")
        }
    }
    useEffect(() => {
        requestPermission()
    }, [])

    return null

}
export { GenerateToken }
