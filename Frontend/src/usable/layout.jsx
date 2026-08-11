import { Header } from "./header.jsx";
import { Outlet } from "react-router-dom";

function Layout(){

    return(
        <>
          <Header/>
        <Outlet/>
        </>
      
    )
}
export {Layout}