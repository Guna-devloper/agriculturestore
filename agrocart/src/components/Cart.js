import React from "react";
import { Container, Table, Button } from "react-bootstrap";

const Cart = ({ cart, removeFromCart }) => {
  return (
    <Container className="mt-4">
      <h2 className="text-center">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
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
      )}
    </Container>
  );
};

export default Cart;
