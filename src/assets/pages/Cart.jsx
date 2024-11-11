import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import './Cart.css';

export default function Cart() {
  const { cartItems } = useContext(CartContext);
  let totalPrice = 0;

  for (let item of cartItems) {
    totalPrice += Number(item[2]);
  }

  const handleCheckout = () => {
    // Replace with your Stripe payment URL
    window.location.href = "https://your-stripe-payment-url.com";
  };

  return (
    <div id="cart">

<Link to="/"> Back</Link>

      <h2>Cart Conclusion</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-items">
                <img src={item[0]} alt=""/>
                 {item[1]} - ${item[2]} x {item[3]}
            </div>
          ))}
        </ul>
      )}

      <h1>Total Price : ${totalPrice}</h1>
      <br />
      <br /><br />
      <a href="#" onClick={handleCheckout}>Check-out</a>
    </div>
  );
}