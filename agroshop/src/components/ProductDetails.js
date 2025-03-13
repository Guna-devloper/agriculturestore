import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; // ✅ Get product data from navigation state

  if (!product) {
    return (
      <Container className="mt-4 text-center">
        <h2>Product Not Found</h2>
        <Button onClick={() => navigate("/")}>Go Back to Products</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <Card.Img variant="top" src={product.imageUrl || product.image || "https://via.placeholder.com/400"} />
        <Card.Body className="text-center">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h4>Price: ₹{product.price}</h4>
          <Button variant="success" onClick={() => navigate("/")}>
            Back to Products
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
