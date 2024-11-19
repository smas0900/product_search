import React from 'react';

const StockStatusDropdown = ({ value, onStockStatusChange }) => {
  return (
    <div className="filter">
      {/* <label htmlFor="stock-status">Stock Status:</label> */}
      <select
        id="stock-status"
        value={value || ''}  // If value is empty, it'll show 'All'
        onChange={(e) => onStockStatusChange(e.target.value)}
      >
        <option value="">Stock Status:</option> {/* Default "All" option */}
        <option value="in_stock">In Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>
    </div>
  );
};

export default StockStatusDropdown;
