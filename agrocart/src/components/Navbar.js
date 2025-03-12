import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const NavigationBar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">🌾 AgroStore</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Products</Nav.Link>
          <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link> {/* Now works properly */}
              <Button variant="danger" onClick={handleLogout} className="ms-2">Logout</Button>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
