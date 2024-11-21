import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

function Checkout() {
  const { cart, totalQuantity, totalSum } = useCart();
  const [contactData, setContactData] = useState({});
  const [shipmentData, setShipmentData] = useState({});

  useEffect(() => {
    const savedContactData = JSON.parse(localStorage.getItem('contactData'));
    const savedShipmentData = JSON.parse(localStorage.getItem('shipmentData'));

    if (savedContactData) setContactData(savedContactData);
    if (savedShipmentData) setShipmentData(savedShipmentData);
  }, []);

  return (
    <div className='container'>
      <nav className='title-nav'>
        <h1>OfficeChairs</h1>
        <Link to="/cart">Cart</Link>
      </nav>
      <h2>Thank you for your order!</h2>
      <div className='information'>
        <div>
          <h3>Contact Information</h3>
          <p>{contactData.firstname} {contactData.lastname}</p>
          <p>{contactData.email}</p>
          <p>{contactData.phone}</p>
        </div>
        <div>
          <h3>Shipment Information</h3>
          <p>{shipmentData.address}, {shipmentData.apartment}</p>
          <p>{shipmentData.city}, {shipmentData.state}, {shipmentData.zip}</p>
          <p>{shipmentData.country}</p>
        </div>
      </div>
      <div className='order-summary'>
        <h3>Order Summary</h3>
        <div className='order-cart'>
          {cart.map((product) => (
            <div className='add-cart' key={product.id}>
              <img src={product.image} alt={product.name} />
              <div>
                <p>{product.name}</p>
                <p>Price: ${product.price} x {product.quantity}</p>
                <h5>Subtotal: ${(parseFloat(product.price.replace('$', '')) * product.quantity).toFixed(2)}, {totalQuantity} Product</h5>
              </div>
            </div>
          ))}
        </div>
        <div className='result'>
          <h4>Sum: ${totalSum.toFixed(2)}</h4>
          <h4>Shipping & Handling: $0.00</h4>
          <h4>Tax: $0.00</h4>
          <h3>Grand Total: ${totalSum.toFixed(2)}</h3>
        </div>
        <button className='submit-continue' onClick={() => window.location.href = '/'}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default Checkout;
