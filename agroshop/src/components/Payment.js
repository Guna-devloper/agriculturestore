import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert, Form } from "react-bootstrap";
import { FaCreditCard, FaGooglePay, FaPaypal, FaMoneyBillAlt } from "react-icons/fa"; // ✅ Payment Icons

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };
  const [paymentMethod, setPaymentMethod] = useState("credit-card"); // ✅ Default Payment Method
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    }, 1500);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">💳 Payment</h2>
        <h3>Total Amount: ₹{totalAmount}</h3>

        {/* ✅ Payment Method Selection */}
        <Form.Group className="mb-3">
          <Form.Label>Select Payment Method:</Form.Label>
          <Form.Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="credit-card">💳 Credit / Debit Card</option>
            <option value="upi">📲 UPI / Google Pay</option>
            <option value="paypal">🌍 PayPal</option>
            <option value="cod">💰 Cash on Delivery</option>
          </Form.Select>
        </Form.Group>

        {/* ✅ Payment Form Based on Selection */}
        {paymentMethod === "credit-card" && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="**** **** **** ****" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="month" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="password" placeholder="***" />
            </Form.Group>
          </Form>
        )}

        {paymentMethod === "upi" && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>UPI ID</Form.Label>
              <Form.Control type="text" placeholder="yourname@upi" />
            </Form.Group>
          </Form>
        )}

        {paymentMethod === "paypal" && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>PayPal Email</Form.Label>
              <Form.Control type="email" placeholder="yourname@example.com" />
            </Form.Group>
          </Form>
        )}

        {paymentMethod === "cod" && (
          <Alert variant="info" className="text-center">
            🛵 Cash on Delivery selected. You will pay when your order arrives.
          </Alert>
        )}

        {/* ✅ Payment Button */}
        {!paymentSuccess ? (
          <Button variant="success" className="w-100" onClick={handlePayment}>
            {paymentMethod === "cod" ? "Confirm Order" : "Pay Now"}
          </Button>
        ) : (
          <Alert variant="success" className="mt-3 text-center">
            ✅ Payment Successful! Redirecting...
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default Payment;
