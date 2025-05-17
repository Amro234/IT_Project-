import React, { useState, useRef } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "Abdo Mohamed",
    email: "AbdoMohamed@example.com",
    password: "",
    newPassword: "",
    ProfilePicture: "",
  });
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, ProfilePicture: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("Profile updated successfully!");
    console.log("Profile Updated:", formData);
  };

  return (
    <Container
      className="bg-white p-5 rounded shadow my-5"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center mb-4">Profile</h2>

      {success && (
        <Alert variant="success" className="text-center">
          {success}
        </Alert>
      )}

      {/* صورة الملف الشخصي مع أيقونة القلم */}
      <div className="position-relative d-flex justify-content-center mb-4">
        <img
          src={formData.ProfilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="d-block mx-auto rounded-circle"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
        <button
          type="button"
          className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle border-0 d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <span style={{ fontSize: "20px" }}>✎</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};

export default UserProfile;