import axios from 'axios'

const api=axios.create({
    baseURL:"https://nexbids.vercel.app/api/v1/users",

    withCredentials:true
})
export {api}