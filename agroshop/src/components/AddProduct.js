import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/AddProduct.css"; // Ensure you have CSS for styling

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Save Product to Local Storage
  const saveProductToLocalStorage = (product) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    localStorage.setItem("products", JSON.stringify([...existingProducts, product]));
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !price || !description || !image) {
      setError("All fields are required!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      const productData = {
        title,
        price: parseFloat(price),
        description,
        imageUrl: reader.result, // Store image as Base64
        createdAt: new Date().toISOString(),
      };

      saveProductToLocalStorage(productData);

      alert("Product added successfully!");
      setTitle("");
      setPrice("");
      setDescription("");
      setImage(null);
      navigate("/");
    };
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 add-product-card">
        <h2 className="text-center">🛒 Add New Product</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Title</Form.Label>
            <Form.Control type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" required value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
