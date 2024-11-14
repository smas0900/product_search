// components/nav/ProductStatusDropdown.js
import React from 'react';

const ProductStatusDropdown = ({ productStatus, onProductStatusChange }) => {
  return (
    <div className="filter">
      <label htmlFor="product-status">Product Status:</label>
      <select id="product-status" value={productStatus} onChange={(e) => onProductStatusChange(e.target.value)}>
        <option value="">Select</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default ProductStatusDropdown;
