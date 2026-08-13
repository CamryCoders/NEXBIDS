import { useState,useEffect } from "react";
import { Loader } from "../usable/loading.jsx";
import { api } from "../utils/api.js";
import { useNavigate } from "react-router";
function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const Navigate=useNavigate()

    useEffect(() => {
        api.get("/user_profile", {
            withCredentials: true
        })
        .then(() => setAuthenticated(true))
        .catch((error) => {
            if(error.response.status==402){
                Navigate("/Login")
            }
            else if(error.response?.status==500){
                return (
                    <div className="w-full h-full justify-center items-center p-5">
                        <div className="font-Bold text-rose-300 ">
                        {error.response?.data?.message} 
                        </div>
                    </div>
                )
            }
        })
        .finally(() => setLoading(false));
    }, []);

    

   

    return children;
}
export {ProtectedRoute}