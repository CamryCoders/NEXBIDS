import axios from 'axios'

const api=axios.create({
    baseURL:"https://nexbids.onrender.com/api/v1/users",

    withCredentials:true
})
export {api}