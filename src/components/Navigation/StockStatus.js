// components/nav/StockStatusDropdown.js
import React from 'react';

const StockStatusDropdown = ({ stockStatus, onStockStatusChange }) => {
  return (
    <div className="filter">
      <label htmlFor="stock-status">Stock Status:</label>
      <select id="stock-status" value={stockStatus} onChange={(e) => onStockStatusChange(e.target.value)}>
        <option value="">Select</option>
        <option value="in_stock">In Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </div>
  );
};

export default StockStatusDropdown;
