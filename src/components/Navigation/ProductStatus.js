import React from 'react';

const ProductStatusDropdown = ({ value, onProductStatusChange }) => {
  return (
    <div className="filter">
      <label htmlFor="product-status">Product Status:</label>
      <select
        id="product-status"
        value={value || ''}  
        onChange={(e) => onProductStatusChange(e.target.value)}
      >

        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Acknowledged">Acknowledged</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
};

export default ProductStatusDropdown;
