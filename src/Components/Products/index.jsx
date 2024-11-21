import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data.json';
import { useCart } from '../CartContext';

function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    setProducts(data);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container">
      <nav className='title-nav'>
        <h1>OfficeChairs</h1>
        <Link to="/cart">Cart ({cartItemCount})</Link>
      </nav>
      <div className="carts">
        {products.map((product) => (
          <div className="cart" key={product.id}> 
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <h2>{product.price}</h2>
            <button onClick={() => addToCart(product)}>+ add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
