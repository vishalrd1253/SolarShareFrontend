import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast'
import Logout from './components/Logout'
import Dashboard from './components/Dashboard'
import CreateListing from './components/CreateListing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ClusterMarketplace from './components/ClusterMarketplace'
import 'leaflet/dist/leaflet.css';
import SolarMap from './components/SolarMap'
import MainPage from './components/MainPage'

const App = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/clusters" element={<ClusterMarketplace />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
