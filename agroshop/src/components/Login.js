import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">🔑 Login</h2>
      <Form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
        {error && <p className="text-danger">{error}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">Login</Button>
        <p className="mt-3 text-center">
          Don't have an account? <Button variant="link" onClick={() => navigate("/signup")}>Signup</Button>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
