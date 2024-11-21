import React, { useEffect } from 'react';
import { useCart } from '../CartContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Cart() {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, totalQuantity, totalSum } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const menuLinks = document.querySelectorAll('.link a');

    menuLinks.forEach((link) => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, [location]);

  return (
    <div>
      <nav className='title-nav'>
        <h1>OfficeChairs</h1>
        <Link to="/cart">Cart</Link>
      </nav>
      <nav className='link'>
        <ul>
          <li><Link to="/cart">Cart</Link></li> 
          <li><Link to="/contactInformation">Contact Information</Link></li>
          <li><Link to="/shipmentInformation">Shipment Information</Link></li>
        </ul>
      </nav>
      <h2 className='title-cart'>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className='cart-add'>
          {cart.map((product) => {
            const pricePerItem = parseFloat(product.price.replace('$', ''));
            const totalPrice = pricePerItem * product.quantity;

            return (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className='description'>
                  <h2>{product.name}</h2>
                  <div className='number'>
                    <button onClick={() => decrementQuantity(product.id)}>-</button>
                    <p>{product.quantity}</p>
                    <button onClick={() => incrementQuantity(product.id)}>+</button>
                  </div>
                </div>
                <div className='delete-price'>
                  <button onClick={() => removeFromCart(product.id)}>Delete</button>
                  <p>Price: ${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className='sum-tog-next'>
        <h4>Together: {totalQuantity} Product</h4> 
        <h5>Sum: ${totalSum.toFixed(2)}</h5> 
        <button onClick={() => navigate('/contactinformation')}>Next step</button> 
      </div>
    </div>
  );
}

export default Cart;
