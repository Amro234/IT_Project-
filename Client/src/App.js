import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';

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
import HotelUserPage from './Pages/HotelUser';
import HotelsPage from './Pages/Admin/Hotels';
import SettingsPage from './Pages/Admin/Settings';
import BookingsPage from './Pages/Admin/Bookings';
import AddHotelPage from './Pages/Admin/AddHotel';
import HotelDetailsPage from './Pages/HotelDetailsPage';
import PaymentPage from './Pages/Payment';
import Favorites from './Pages/Favorites';
// User Components
import UserProfile from './Components/User/UserProfile';
import UserRegistration from './Components/User/UserRegistration';
import ForgotPassword from './Components/User/ForgotPassword';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.toLowerCase().includes('admin');
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  return (
    <>
      {!isAdmin && !isAuthPage && <Navbar />}
      {!isAdmin && !isAuthPage && <Header />}
      {children}
    </>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      <Router>
        <Layout>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/hotels" element={
              <AdminRoute>
                <HotelsPage />
              </AdminRoute>
            } />
            <Route path="/admin/add-hotel" element={
              <AdminRoute>
                <AddHotelPage />
              </AdminRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminRoute>
                <SettingsPage />
              </AdminRoute>
            } />
            <Route path="/admin/bookings" element={
              <AdminRoute>
                <BookingsPage />
              </AdminRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={<><Home /><Footer /></>} />
            <Route path="/home" element={<><Home /><Footer /></>} />
            <Route path="/hotels" element={<><HotelUserPage /><Footer /></>} />
            <Route path="/hotel/:id" element={<><HotelDetailsPage /><Footer /></>} />
            <Route path="/booking/:hotelId" element={
              <ProtectedRoute>
                <><PaymentPage /><Footer /></>
              </ProtectedRoute>
            } />
            <Route path="/about" element={<><AboutUs /><Footer /></>} />
            <Route path="/for-u" element={
              <ProtectedRoute>
                <><ForU /><Footer /></>
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<><ContactUs /><Footer /></>} />
            <Route path="/special-offers" element={
              <ProtectedRoute>
                <><SpecialOffers /><Footer /></>
              </ProtectedRoute>
            } />
            <Route path="/offer/:id" element={
              <ProtectedRoute>
                <><OfferDetails /><Footer /></>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user/edit-profile" element={<EditProfile />} />
            <Route path="/report" element={<Report />} />
            <Route path="/search" element={<Search />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/favorites" element={<><Favorites /><Footer /></>} />
            <Route path="/tripform" element={<><TripForm /><Footer /></>} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/user-profile" element={<><UserProfile /><Footer /></>} />
            
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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </Router>
    </div>
  );
};

export default App;