// ProductList.js
import React, { useEffect, useState } from 'react';
import './ProductList.css'; 
const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products'); // Replace with your API URL
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Product List</h1>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>On Sale</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.sku}>
              <td>
                <img src={product.image} alt={product.sku} style={{ width: '50px' }} />
              </td>
              <td>{product.name}<div className='as'>{product.sku}</div></td>
              <td>
                <span className={`status ${product.status.toLowerCase()}`}>
                  {product.status}
                </span>
              </td>
              <td>{product.qty}</td>
              <td>{product.category}</td>
              <td>{product.onSale ? 'Yes' : 'No'}</td>
              <td>{product.vendor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
