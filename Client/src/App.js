import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Settings from './Components/Settings';
import TripForm from './Components/TripForm';
import Login from './Components/User/Login';

// Pages
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import ForU from './Pages/ForU';
import SpecialOffers from './Pages/SpecialOffers';
import Home from './Pages/Home';
import Trips from './Pages/Trips';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import TripDetails from './Pages/TripDetails';
import OfferDetails from './Pages/OfferDetails';
import UsersPage from './Pages/Admin/Users';
import SettingsPage from './Pages/Admin/Settings';
import BookingsPage from './Pages/Admin/Bookings';
// User Components
import UserProfile from './Components/User/UserProfile';
import UserRegistration from './Components/User/UserRegistration';
import ForgotPassword from './Components/User/ForgotPassword';

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-vh-100 position-relative overflow-hidden">
        <div className="position-relative" style={{ zIndex: 1 }}>
          <Router>
            <Routes>
              {/* Auth Routes */}
              <Route path="/" element={<Login/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route path="/home" element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              } />
              <Route path="/about" element={
                <>
                  <Navbar />
                  <AboutUs />
                  <Footer />
                </>
              } />
              <Route path="/for-u" element={
                <>
                  <Navbar />
                  <ForU />
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Navbar />
                  <ContactUs />
                  <Footer />
                </>
              } />
              <Route path="/special-offers" element={
                <>
                  <Navbar />
                  <SpecialOffers />
                  <Footer />
                </>
              } />
              <Route path="/offer/:id" element={
                <>
                  <Navbar />
                  <OfferDetails />
                  <Footer />
                </>
              } />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/tripform" element={
                <>
                  <Navbar />
                  <TripForm />
                  <Footer />
                </>
              } />
              <Route path="/trips/:id" element={<TripDetails />} />
              <Route path="/user-profile" element={
                <>
                  <Navbar />
                  <UserProfile />
                  <Footer />
                </>
              } />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/bookings" element={<BookingsPage />} />
              
              {/* 404 Route */}
              <Route 
                path="*" 
                element={
                  <h1 className="text-dark text-center pt-5">
                    404 - Page Not Found
                  </h1>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </Provider>
  );
};

export default App;