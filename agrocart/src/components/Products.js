import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PEXELS_API_KEY = "nA8OqNk9y8M7rWBfnETohW1tR1rF7h5dYdCYA7qVf2WvsOuP6OiTE1Bq"; // Replace with valid Pexels API key

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // ✅ Default Category
  const navigate = useNavigate();

  const categories = ["all", "fruits", "vegetables", "seeds", "farming tools", "agriculture equipment"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let fetchedProducts = [];
        
        for (const category of categories.slice(1)) { // Exclude "all"
          const response = await axios.get("https://api.pexels.com/v1/search", {
            params: { query: category, per_page: 6 },
            headers: { Authorization: PEXELS_API_KEY },
          });

          if (response.data.photos.length > 0) {
            const categoryProducts = response.data.photos.map((img, index) => ({
              id: `pexels-${category}-${index}`,
              title: `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${index + 1}`,
              description: `High-quality ${category} available.`,
              price: Math.floor(Math.random() * 500) + 100,
              image: img.src.medium,
              category,
            }));

            fetchedProducts.push(...categoryProducts);
          }
        }

        // ✅ Fetch locally stored products
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];

        // ✅ Merge Local & API Products
        const allProducts = [...localProducts, ...fetchedProducts];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter Products Based on Selected Category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌾 Agriculture Products 🚜</h2>

      {/* ✅ Category Selection Dropdown */}
      <Form.Select className="mb-4 w-50 mx-auto" onChange={(e) => setSelectedCategory(e.target.value)}>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </Form.Select>

      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id || product.title} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={product.imageUrl || product.image || "https://via.placeholder.com/300"}
                  alt={product.title}
                />
                <Card.Body className="text-center">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>₹{product.price}</Card.Text>
                  {typeof addToCart === "function" ? (
                    <Button variant="primary" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  ) : (
                    <p className="text-danger">Cart function not available</p>
                  )}
                  {/* ✅ Pass Product Data to View Details Page */}
                  <Button variant="link" onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center w-100">No products available in this category.</p>
        )}
      </Row>
    </Container>
  );
};

export default Products;
