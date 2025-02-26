import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import CreateListing from './pages/dashboard-pages/CreateListing';
import Listings from './pages/dashboard-pages/Listings';
import ManageBookings from './pages/dashboard-pages/ManageBookings';
import ListingPage from './pages/dashboard-pages/ListingPage';


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
     {/* <Header /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Layout with Nested Routes */}
        <Route path="/dashboard/*" element={authUser? <Dashboard />: <Navigate to="/login" /> }>
          <Route index element={<Listings />} />  {/* Default route */}
          <Route path="new-listing" element={<CreateListing />} />
          <Route path="listing/:id" element={<ListingPage />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>

      </Routes>

     <Toaster />
     {/* <Footer /> */}
    </>
  )
}

export default App
