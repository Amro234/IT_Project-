import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("Password reset link sent to your email!");
    console.log("Reset Password Email:", email);
    // Add your forgot password logic here (e.g., API call)
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Forgot Password</h2>
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Reset Password
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;