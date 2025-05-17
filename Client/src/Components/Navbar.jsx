import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  TargetIcon, 
  EnvelopeClosedIcon, 
  StarIcon,
  PersonIcon,
  HamburgerMenuIcon,
  Cross2Icon
} from '@radix-ui/react-icons';
// import Header from './Header';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/home', name: 'Home', icon: <HomeIcon /> },
    { path: '/for-u', name: 'For U', icon: <TargetIcon /> },
    { path: '/contact', name: 'Contact Us', icon: <EnvelopeClosedIcon /> },
    { path: '/special-offers', name: 'Special Offers', icon: <StarIcon /> },
    { path: '/about', name: 'About Us', icon: <PersonIcon /> },
  ];

  return (
    <>
      {/* <Header /> */}
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
                      className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Menu Button */}
              <button
                className={`menu-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
              </button>
            </div>

            {/* Login Button in the pink area */}
            <div className="login-area">
              <Link to="/" className="login-button">
                Login
              </Link>
            </div>
          </div>
        </div>
        {/* <Header /> */}

        <style jsx>{`
          .navbar-custom {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 0.5rem 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }

          .navbar-custom.scrolled {
            padding: 0.3rem 0;
            background: rgba(255, 255, 255, 0.98);
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
            }

            .nav-links {
              position: fixed;
              top: 0;
              right: -100%;
              height: 100vh;
              width: 100%;
              max-width: 300px;
              background: rgba(255, 255, 255, 0.98);
              backdrop-filter: blur(10px);
              flex-direction: column;
              padding: 5rem 2rem;
              transition: 0.3s ease-in-out;
            }

            .nav-links.active {
              right: 0;
            }

            .nav-link {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>
      </motion.nav>
    </>
  );
};

export default Navbar;