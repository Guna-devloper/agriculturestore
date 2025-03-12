import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PEXELS_API_KEY = "nA8OqNk9y8M7rWBfnETohW1tR1rF7h5dYdCYA7qVf2WvsOuP6OiTE1Bq"; // Replace with valid Pexels API key

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = ["fruits", "vegetables", "seeds", "farming tools", "agriculture equipment"];
        let fetchedProducts = [];

        for (const category of categories) {
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
            }));

            fetchedProducts.push(...categoryProducts);
          } else {
            console.warn(`Pexels API returned no images for ${category}.`);
          }
        }

        // ✅ Fetch locally stored products
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];

        // ✅ Merge Local Products with API Products
        setProducts([...localProducts, ...fetchedProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🌾 Agriculture Products 🚜</h2>
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
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
                  <Button variant="link" onClick={() => navigate(`/product/${product.id}`)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center w-100">Loading products...</p>
        )}
      </Row>
    </Container>
  );
};

export default Products;
