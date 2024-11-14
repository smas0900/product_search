// src/components/Products/ProductList.js
import React from 'react';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
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
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.sku}>
                <td>
                  <img src={product.image} alt={product.sku} style={{ width: '50px' }} />
                </td>
                <td>{product.name}<div className='as'>{product.sku}</div></td>
                <td>{product.status}</td>
                <td>{product.qty}</td>
                <td>{product.category}</td>
                <td>{product.onSale ? 'Yes' : 'No'}</td>
                <td>{product.vendor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
