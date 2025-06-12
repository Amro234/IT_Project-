import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [calculatedAge, setCalculatedAge] = useState(null);

  const languages = [
    "Arabic",
    "French",
    "Spanish",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese",
    "Japanese",
    "Korean",
    "Turkish",
    "Hindi",
    "Dutch",
    "Swedish"
  ];

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 12);
    return maxDate.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    return minDate.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'dateOfBirth') {
      const age = calculateAge(value);
      setCalculatedAge(age);
      
      if (age < 12) {
        setError("You must be at least 12 years old to register.");
      } else if (age > 120) {
        setError("Please enter a valid date of birth.");
      } else {
        setError("");
      }
    } else if (error) {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!formData.gender) {
      setError("Please select your gender.");
      return;
    }
    if (calculatedAge < 12) {
      setError("You must be at least 12 years old to register.");
      return;
    }

    // In a real application, you would make an API call here to register the user
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      age: calculatedAge,
    };

    // TODO: Add API call here
    console.log('User data:', userData);
    navigate('/home'); // Redirect to home page after successful registration
  };

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
      gap: "40px",
    },
    leftSection: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      color: "#FFFFFF",
      paddingLeft: "40px",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "80px",
    },
    heading: {
      fontSize: "48px",
      fontWeight: "700",
      lineHeight: "1.2",
      marginBottom: "16px",
      letterSpacing: "1px",
    },
    subHeading: {
      fontSize: "16px",
      opacity: "0.9",
      marginBottom: "24px",
    },
    description: {
      fontSize: "14px",
      opacity: "0.7",
      maxWidth: "400px",
      lineHeight: "1.6",
    },
    rightSection: {
      flex: "1",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formContainer: {
      width: "100%",
      maxWidth: "500px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "32px",
    },
    formRow: {
      display: "flex",
      gap: "16px",
      marginBottom: "16px",
    },
    formGroup: {
      flex: 1,
      marginBottom: "16px",
    },
    label: {
      display: "block",
      color: "#FFFFFF",
      fontSize: "14px",
      marginBottom: "8px",
    },
    input: {
      width: "100%",
      padding: "12px",
      background: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      color: "#333333",
    },
    select: {
      width: "100%",
      padding: "12px",
      background: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      color: "#333333",
      appearance: "none",
    },
    radioGroup: {
      display: "flex",
      gap: "20px",
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#FFFFFF",
      fontSize: "14px",
      cursor: "pointer",
    },
    radio: {
      cursor: "pointer",
    },
    error: {
      color: "#ff4444",
      fontSize: "14px",
      marginBottom: "16px",
      textAlign: "center",
    },
    submitButton: {
      width: "100%",
      padding: "12px",
      background: "#007BFF",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "24px",
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
    socialButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "16px",
      marginBottom: "24px",
    },
    socialButton: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      color: "#FFFFFF",
      cursor: "pointer",
    },
    loginLink: {
      textAlign: "center",
      color: "#FFFFFF",
      fontSize: "14px",
    },
    loginLinkText: {
      color: "#007BFF",
      textDecoration: "none",
      marginLeft: "4px",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.contentContainer}>
        <div style={styles.leftSection}>
          <div style={styles.logo}>EasyGO</div>
          <h1 style={styles.heading}>
            JOIN THE<br />
            ADVENTURE
          </h1>
          <p style={styles.subHeading}>
            Start Your Journey<br />
            With Us Today
          </p>
          <p style={styles.description}>
            Create your account and unlock a world of travel possibilities. Your next adventure begins here.
          </p>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.formContainer}>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    style={styles.input}
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    style={styles.input}
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  style={styles.input}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    name="password"
                    style={styles.input}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    style={styles.input}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    style={styles.input}
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  style={styles.input}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={getMaxDate()}
                  min={getMinDate()}
                  required
                />
                {calculatedAge !== null && (
                  <div style={{ color: '#FFFFFF', fontSize: '14px', marginTop: '8px' }}>
                    Age: {calculatedAge} years
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <div style={styles.radioGroup}>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      style={styles.radio}
                      required
                    />
                    Male
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      style={styles.radio}
                      required
                    />
                    Female
                  </label>
                </div>
              </div>

              <button type="submit" style={styles.submitButton}>
                Sign Up
              </button>

              <div style={styles.divider}>
                <div style={styles.dividerLine}></div>
                <span style={styles.dividerText}>or sign up with</span>
                <div style={styles.dividerLine}></div>
              </div>

              <div style={styles.socialButtons}>
                <button type="button" style={styles.socialButton}>
                  <FaGoogle size={16} />
                </button>
                <button type="button" style={styles.socialButton}>
                  <FaFacebook size={16} />
                </button>
                <button type="button" style={styles.socialButton}>
                  <FaXTwitter size={16} />
                </button>
                <button type="button" style={styles.socialButton}>
                  <FaApple size={16} />
                </button>
              </div>

              <div style={styles.loginLink}>
                Already have an account?
                <Link to="/" style={styles.loginLinkText}>
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;