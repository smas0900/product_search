// components/nav/OnSaleDropdown.js
import React from 'react';

const OnSaleDropdown = ({ onSale, onOnSaleChange }) => {
  return (
    <div className="filter">
      <label htmlFor="on-sale">On Sale:</label>
      <select id="on-sale" value={onSale} onChange={(e) => onOnSaleChange(e.target.value)}>
        <option value="">Select</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

export default OnSaleDropdown;
