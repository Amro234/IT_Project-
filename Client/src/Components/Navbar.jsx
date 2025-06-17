import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdHotelClass } from 'react-icons/md';
import { 
  HomeIcon, 
  TargetIcon, 
  EnvelopeClosedIcon, 
  StarIcon,
  PersonIcon,
  HamburgerMenuIcon,
  Cross2Icon,
} from '@radix-ui/react-icons';
import { Utensils } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check authentication status on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [location]);

  const navLinks = [
    { path: '/', name: 'Home', icon: <HomeIcon /> },
    ...(isAuthenticated ? [
      { path: '/for-u', name: 'For U', icon: <TargetIcon /> },
      { path: '/special-offers', name: 'Special Offers', icon: <StarIcon /> },
    ] : []),
    { path: '/hotels', name: 'Hotels', icon: <MdHotelClass /> },
    { path: '/restaurants', name: 'Restaurants', icon: <Utensils /> },
    { path: '/contact', name: 'Contact Us', icon: <EnvelopeClosedIcon /> },
    { path: '/about', name: 'About Us', icon: <PersonIcon /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="navbar-container">
          <div className="nav-content">
            {/* Logo in the green area */}
            <div className="logo-area">
              <Link to="/home" className="navbar-brand">
                <motion.div 
                  className="brand-logo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={`${process.env.PUBLIC_URL}/Assets/Logo.png`} alt="EasyGo Logo" className="logo-image" />
                </motion.div>
              </Link>
            </div>

            {/* Navigation Links in the red square */}
            <div className="nav-section">
              <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`nav-link ${(location.pathname === link.path || (link.path === '/' && location.pathname === '/home')) ? 'active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Overlay for mobile menu */}
              {isOpen && <div className="mobile-overlay" onClick={() => setIsOpen(false)}></div>}
              {/* Mobile Menu Button */}
              <button
                className={`menu-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
              </button>
            </div>

            {/* Login/User Profile area */}
            <div className="login-area">
              {isAuthenticated ? (
                <div className="user-profile-container">
                  <Link to="/user-profile" className="user-profile-link" onClick={() => setIsOpen(false)}>
                    <span className="user-name">{user?.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="login-button" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .navbar-custom {
            padding: 0.5rem 0;
            background: #fff;
            backdrop-filter: none;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .navbar-custom.scrolled {
            padding: 0.3rem 0;
            background: #fff;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
          }

          .navbar-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          /* Logo area without background color */
          .logo-area {
            padding: 0.3rem 0.5rem;
            border-radius: 8px;
          }

          .navbar-brand {
            display: flex;
            align-items: center;
            text-decoration: none;
          }

          .brand-logo {
            display: flex;
            align-items: center;
            height: 40px;
          }

          .logo-image {
            height: 100%;
            width: auto;
            object-fit: contain;
            max-width: 150px;
          }

          /* Nav section without background color */
          .nav-section {
            display: flex;
            align-items: center;
            padding: 0.3rem 0.5rem;
            border-radius: 8px;
          }

          .nav-links {
            display: flex;
            gap: 1rem;
            align-items: center;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            color: rgba(0, 0, 0, 0.8);
            text-decoration: none;
            padding: 0.3rem 0.7rem;
            border-radius: 6px;
            transition: all 0.3s ease;
            font-weight: 500;
            font-size: 0.9rem;
          }

          .nav-link:hover {
            color: #0072ff;
            background: rgba(0, 114, 255, 0.1);
          }

          .link-icon {
            font-size: 1rem;
          }

          .nav-link.active {
            color: #0072ff;
            background: rgba(0, 114, 255, 0.1);
          }

          /* Login area without background color */
          .login-area {
            padding: 0.3rem 0.5rem;
            border-radius: 8px;
          }

          .login-button {
            display: inline-block;
            padding: 0.3rem 1rem;
            background-color: #0072ff;
            color: white;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }

          .login-button:hover {
            background-color: #005bd1;
            transform: translateY(-2px);
          }

          .user-profile-container {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .user-profile-link {
            display: inline-block;
            padding: 0.3rem 1rem;
            background-color: #f0f0f0;
            color: #333;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }

          .user-profile-link:hover {
            background-color: #e0e0e0;
            transform: translateY(-2px);
          }

          .logout-button {
            padding: 0.3rem 1rem;
            background-color: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 500;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .logout-button:hover {
            background-color: #c82333;
            transform: translateY(-2px);
          }

          .user-name {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .menu-toggle {
            display: none;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 10;
          }

          @media (max-width: 991px) {
            .menu-toggle {
              display: block;
              z-index: 10001;
              position: fixed;
              top: 1.2rem;
              right: 1.5rem;
            }

            .nav-links {
              position: fixed;
              top: 0;
              right: -60vw;
              height: 100vh;
              width: 60vw;
              max-width: 350px;
              min-width: 220px;
              background: #fff;
              box-shadow: -2px 0 16px rgba(0,0,0,0.08);
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              padding: 3.5rem 1.5rem 2rem 1.5rem;
              transition: right 0.3s ease-in-out;
              z-index: 10000;
            }

            .nav-links.active {
              right: 0;
            }

            .nav-link {
              width: 100%;
              justify-content: center;
              font-size: 1.2rem;
              margin-bottom: 1.2rem;
              padding: 1rem 0;
              border-radius: 8px;
            }

            .login-area {
              width: 100%;
              display: flex;
              justify-content: center;
              margin-top: 2rem;
            }

            .user-profile-container {
              flex-direction: column;
              width: 100%;
            }

            .user-profile-link,
            .logout-button {
              width: 100%;
              text-align: center;
            }

            .mobile-overlay {
              display: block;
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              background: rgba(0,0,0,0.2);
              z-index: 9999;
            }
          }
        `}</style>
      </motion.nav>
    </>
  );
};

export default Navbar;