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
        .catch(() => setAuthenticated(false))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loader />;

    if (!authenticated) {
      
    }

    return children;
}
export {ProtectedRoute}