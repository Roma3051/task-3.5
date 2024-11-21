import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Checkout from './Components/Checkout';
import Products from './Components/Products';
import Cart from './Components/Cart';
import ShipmentInformation from './Components/ShipmentInformation';
import ContactInformation from './Components/ContactInformation';
import { CartProvider } from './Components/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmation" element={<Checkout />} />
        <Route path="/shipmentInformation" element={<ShipmentInformation />} />
        <Route path="/contactInformation" element={<ContactInformation />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
