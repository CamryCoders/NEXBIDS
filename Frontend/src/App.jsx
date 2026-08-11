import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AuctionLanding from './component/Auctionlanding.jsx'
import { Login } from './component/Login.jsx'
import { Register } from './component/Register.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { ForgotPassword } from './component/ForgotPassword.jsx'
import { NewPassword } from './component/NewPassword.jsx'
import { Header } from './usable/header.jsx'
import { Layout } from './usable/layout.jsx'
import { BidComponent } from './usable/bidcomponent.jsx'
import { Homepage } from './loggedUser/homepage.jsx'
import { AllBid } from './loggedUser/allbidPage.jsx'
import { Eachbidpage } from './usable/everybidpage.jsx'
import { CreateAuction } from './loggedUser/createAuction.jsx'
import { SellerEachbidpage } from './usable/sellereverybidpage.jsx'
import {ChatInterface} from './usable/chat.jsx'
import { Profile } from './loggedUser/profile.jsx'
import { ProtectedRoute } from './loggedUser/Protected_route.jsx'
import { Analysis } from './loggedUser/analytics.jsx'
import { Newnotification } from './usable/Notification.page.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route element={<Layout />}>
        <Route path="/user/bid" element={ <ProtectedRoute><AllBid /></ProtectedRoute>  } />
        <Route path="/user/home" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
        <Route path="/user/bid/:BidId" element={<ProtectedRoute><Eachbidpage /></ProtectedRoute>} />
        <Route path="/user/sellerbid/:BidId" element={<ProtectedRoute><SellerEachbidpage /></ProtectedRoute>} />

        <Route path="/user/bid/createAuction" element={<ProtectedRoute> <CreateAuction /></ProtectedRoute>} />
        <Route path="/user/specbid" element={<ProtectedRoute> <Newnotification/> </ProtectedRoute>}/>
                <Route path="/user/bid/analysis/:bidId" element={<ProtectedRoute><Analysis/> </ProtectedRoute>}/>

        <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>

      </Route>


      <Route path="/" element={<AuctionLanding />} />

      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/reset-password/:token' element={<NewPassword />} />


    </>


  )
)


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
