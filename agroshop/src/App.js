import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddProduct from "./components/AddProduct";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import NavigationBar from "./components/Navbar";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // ✅ Cart state

  // ✅ Monitor user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Function to Add Items to Cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} added to cart!`);
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  return (
    <Router>
      <NavigationBar user={user} cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} /> {/* ✅ Pass addToCart */}
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-product" element={user ? <AddProduct /> : <Login />} />
        <Route path="/product/:id" element={<ProductDetails />} /> {/* ✅ Add View Details Route */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
