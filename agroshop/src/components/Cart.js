import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();

  // ✅ Calculate total amount
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container className="mt-4">
      <h2 className="text-center">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                      ❌
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total: ₹{totalAmount}</h4>
          <div className="text-end">
            <Button variant="success" onClick={() => navigate("/checkout", { state: { cart, totalAmount } })}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
