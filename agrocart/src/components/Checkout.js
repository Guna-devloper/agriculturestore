import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount } = location.state || { cart: [], totalAmount: 0 };

  if (!cart.length) {
    return (
      <Container className="mt-4 text-center">
        <h2>No Items in Checkout</h2>
        <Button onClick={() => navigate("/")}>Go to Products</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">🛒 Checkout</h2>
        <h4>Order Summary</h4>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.title} - ₹{item.price}
            </li>
          ))}
        </ul>
        <h3>Total Amount: ₹{totalAmount}</h3>
        <Button variant="primary" className="w-100" onClick={() => navigate("/payment", { state: { totalAmount } })}>
          Proceed to Payment
        </Button>
      </Card>
    </Container>
  );
};

export default Checkout;
