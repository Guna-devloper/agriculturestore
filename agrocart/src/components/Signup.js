import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page after signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">🔐 Signup</h2>
      <Form onSubmit={handleSignup} className="mx-auto" style={{ maxWidth: "400px" }}>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="success" type="submit" className="w-100">Signup</Button>
        <p className="mt-3 text-center">
          Already have an account? <Button variant="link" onClick={() => navigate("/login")}>Login</Button>
        </p>
      </Form>
    </Container>
  );
};

export default Signup;
