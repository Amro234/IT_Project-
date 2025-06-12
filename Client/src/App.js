import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Settings from './Components/Header/Settings';
import TripForm from './Components/TripForm';
import Login from './Components/User/Login';
import Header from './Components/Header/Header';
import EditProfile from './Components/Header/EditProfile';
import Report from './Components/Header/Report';
import Search from './Components/Header/Search';
import Notifications from './Components/Header/Notifications';

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
import HotelsPage from './Pages/Hotels';
import SettingsPage from './Pages/Admin/Settings';
import BookingsPage from './Pages/Admin/Bookings';
import AddHotelPage from './Pages/Admin/AddHotel';
import HotelDetailsPage from './Pages/HotelDetailsPage';
// User Components
import UserProfile from './Components/User/UserProfile';
import UserRegistration from './Components/User/UserRegistration';
import ForgotPassword from './Components/User/ForgotPassword';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.toLowerCase().includes('admin');
  const isLogin = location.pathname === '/login';
  return (
    <>
      {!isAdmin && !isLogin && <Navbar />}
      {!isAdmin && !isLogin && <Header />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <div className="min-vh-100 position-relative overflow-hidden">
        <Router>
          <Layout>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<UserRegistration />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<><Home /><Footer /></>} />
              <Route path="/home" element={<><Home /><Footer /></>} />
              <Route path="/hotels" element={<><HotelsPage /><Footer /></>} />
              <Route path="/hotel/:id" element={<><HotelDetailsPage /><Footer /></>} />
              <Route path="/about" element={<><AboutUs /><Footer /></>} />
              <Route path="/for-u" element={<><ForU /><Footer /></>} />
              <Route path="/contact" element={<><ContactUs /><Footer /></>} />
              <Route path="/special-offers" element={<><SpecialOffers /><Footer /></>} />
              <Route path="/offer/:id" element={<><OfferDetails /><Footer /></>} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/user/edit-profile" element={<EditProfile />} />
              <Route path="/report" element={<Report />} />
              <Route path="/search" element={<Search />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/tripform" element={<><TripForm /><Footer /></>} />
              <Route path="/trips/:id" element={<TripDetails />} />
              <Route path="/user-profile" element={<><UserProfile /><Footer /></>} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/hotels" element={<HotelsPage />} />
              <Route path="/admin/add-hotel" element={<AddHotelPage />} />
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
          </Layout>
        </Router>
      </div>
    </Provider>
  );
};

export default App;