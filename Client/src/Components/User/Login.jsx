import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        // Store user data if needed
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirect to home page
        navigate('/home');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  // Styles
  const styles = {
    pageContainer: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      background: "url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2368&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      fontFamily: "'Inter', sans-serif",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(1px)",
    },
    contentContainer: {
      display: "flex",
      width: "100%",
      maxWidth: "1200px",
      margin: "auto",
      padding: "40px",
      position: "relative",
      zIndex: 2,
      gap: "60px",
    },
    leftSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#FFFFFF",
    },
    brandName: {
      fontSize: "32px",
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: "2px",
      marginBottom: "40px",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    logoContainer: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "60px",
      width: "180px",
    },
    logo: {
      width: "100%",
      height: "auto",
      marginBottom: "16px",
      filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
      transition: "transform 0.3s ease",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "700",
      color: "#FFFFFF",
      letterSpacing: "2px",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      position: "relative",
      marginBottom: "8px",
    },
    logoTextAfter: {
      content: "''",
      position: "absolute",
      bottom: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      background: "linear-gradient(90deg, transparent, #FFFFFF, transparent)",
    },
    heading: {
      fontSize: "48px",
      fontWeight: "700",
      lineHeight: "1.2",
      marginBottom: "16px",
      letterSpacing: "1px",
    },
    subHeading: {
      fontSize: "18px",
      opacity: "0.9",
      marginBottom: "24px",
      maxWidth: "400px",
    },
    description: {
      fontSize: "16px",
      opacity: "0.8",
      maxWidth: "400px",
      lineHeight: "1.6",
      marginBottom: "40px",
    },
    rightSection: {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formContainer: {
      width: "100%",
      maxWidth: "400px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "32px",
    },
    formGroup: {
      marginBottom: "24px",
      width: "100%",
    },
    label: {
      display: "block",
      color: "#FFFFFF",
      fontSize: "14px",
      marginBottom: "8px",
      textAlign: "left",
    },
    input: {
      width: "100%",
      padding: "14px",
      background: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      color: "#333333",
    },
    forgotPassword: {
      display: "block",
      textAlign: "right",
      color: "#FFFFFF",
      fontSize: "12px",
      textDecoration: "none",
      marginTop: "8px",
      opacity: "0.8",
    },
    signInButton: {
      width: "100%",
      padding: "14px",
      background: "#007BFF",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "24px",
      marginBottom: "24px",
      transition: "background-color 0.3s ease",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      color: "#FFFFFF",
      fontSize: "12px",
      opacity: "0.6",
      margin: "16px 0",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      background: "rgba(255, 255, 255, 0.2)",
    },
    dividerText: {
      padding: "0 16px",
    },
    googleButton: {
      width: "40px",
      height: "40px",
      background: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.2s, background 0.2s",
    },
    googleButtonHover: {
      transform: "scale(1.1)",
      background: "rgba(255, 255, 255, 0.1)",
    },
    createAccount: {
      textAlign: "center",
      color: "#FFFFFF",
      fontSize: "12px",
    },
    createAccountLink: {
      color: "#FFFFFF",
      textDecoration: "underline",
      marginLeft: "4px",
    },
    socialButtonsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      marginBottom: "24px",
      width: "100%",
    },
    button: {
      transition: "transform 0.2s, background 0.2s, border 0.2s",
    },
    buttonHover: {
      transform: "scale(1.05)",
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
    },
  };

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .login-page-container {
            flex-direction: column !important;
            padding: 10px !important;
            gap: 0 !important;
          }
          .login-content-container {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .login-left-section {
            order: 0 !important;
            align-items: center !important;
            text-align: center !important;
            padding: 0 !important;
            margin-bottom: 10px !important;
          }
          .login-right-section {
            order: 1 !important;
            width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
            padding: 0 !important;
          }
          .login-form-container {
            max-width: 100% !important;
            padding: 16px !important;
          }
          .login-heading {
            font-size: 22px !important;
          }
          .login-subheading {
            font-size: 13px !important;
          }
          .login-left-section p, .login-left-section h1 {
            font-size: 13px !important;
          }
        }
      `}</style>
      <div style={styles.pageContainer} className="login-page-container">
        <div style={styles.overlay}></div>
        <div style={styles.contentContainer} className="login-content-container">
          <div style={styles.leftSection} className="login-left-section">
            <h1 style={styles.brandName}>EasyGo</h1>
            <h2 style={styles.heading} className="login-heading">
              EXPLORE<br />
              HORIZONS
            </h2>
            <p style={styles.subHeading} className="login-subheading">
              Where Your Dream Destinations<br />
              Become Reality
            </p>
            <p style={styles.description}>
              Embark on a journey where every corner of the world becomes your reach.
            </p>
          </div>
          <div style={styles.rightSection} className="login-right-section">
            <div style={styles.formContainer} className="login-form-container">
              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <Link to="/forgot-password" style={styles.forgotPassword}>
                    Forgot Password?
                  </Link>
                </div>
                
                <button type="submit" style={{ ...styles.signInButton, ...styles.button, ':hover': styles.buttonHover }}>
                  Login
                </button>

                <div style={styles.divider}>
                  <div style={styles.dividerLine}></div>
                  <span style={styles.dividerText}>or</span>
                  <div style={styles.dividerLine}></div>
                </div>

                <div style={styles.socialButtonsContainer}>
                  <button type="button" style={{ ...styles.googleButton, ...styles.button, ':hover': styles.buttonHover }}>
                    <FaGoogle size={16} />
                  </button>
                  <button type="button" style={{ ...styles.googleButton, ...styles.button, ':hover': styles.buttonHover }}>
                    <FaFacebook size={16} />
                  </button>
                  <button type="button" style={{ ...styles.googleButton, ...styles.button, ':hover': styles.buttonHover }}>
                    <FaTwitter size={16} />
                  </button>
                  <button type="button" style={{ ...styles.googleButton, ...styles.button, ':hover': styles.buttonHover }}>
                    <FaApple size={16} />
                  </button>
                </div>

                <p style={styles.createAccount}>
                  Are you new?
                  <Link to="/register" style={styles.createAccountLink}>
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;