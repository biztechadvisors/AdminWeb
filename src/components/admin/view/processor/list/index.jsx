import React, { useState, useEffect } from 'react';
import "./index.css"
const Cart = () => {
  const [deliveryCharges, setDeliveryCharges] = useState({});
  const [totalShopping, setTotalShopping] = useState('');
  const [localDeliveryCharge, setLocalDeliveryCharge] = useState('');

  useEffect(() => {
    fetchDeliveryCharges();
  }, []);

  const fetchDeliveryCharges = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/couponDiscount/changeDeliveryCharge', {
        method: 'post', // Change the method to 'post'
        headers: {
          'Content-Type': 'application/json',
        },
      }); // Replace with the backend API endpoint for fetching delivery charges
      const data = await response.json();
      setDeliveryCharges(data);
    } catch (error) {
      console.error('Error fetching delivery charges:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = {
        totalShopping,
        localDeliveryCharge
      };

      const response = await fetch('http://localhost:5050/api/couponDiscount/changeDeliveryCharge', {
        method: 'post', // Change the method to 'post'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON and pass it as the request body
      });

      const data = await response.json();
      setDeliveryCharges(data);
    } catch (error) {
      console.error('Error updating delivery charges:', error);
    }
  };

  return (
    <div className="cart-container"> {/* Use the cart-container class */}
      <div className="cart"> {/* Use the cart class */}
        <h2>Cart</h2>
        <div>
          <p>Total Shopping: {deliveryCharges.totalShopping}</p>
          <p>Local Delivery Charge: {deliveryCharges.localDeliveryCharge}</p>
        </div>
        <div>
          <label>
            Total Shopping:
            <input type="number" value={totalShopping} onChange={(e) => setTotalShopping(e.target.value)} />
          </label>
          <label>
            Local Delivery Charge:
            <input type="number" value={localDeliveryCharge} onChange={(e) => setLocalDeliveryCharge(e.target.value)} />
          </label>
          <button onClick={handleUpdate}>Update Cart</button>
          <button onClick={() => window.location.reload()}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
