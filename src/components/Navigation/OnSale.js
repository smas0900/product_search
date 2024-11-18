import React from 'react';

const OnSaleDropdown = ({ value, onOnSaleChange }) => {
  return (
    <div className="filter">
      <label htmlFor="on-sale">On Sale:</label>
      <select
        id="on-sale"
        value={value || ''}  // If value is empty, it'll show 'All'
        onChange={(e) => onOnSaleChange(e.target.value)}
      >
        <option value="">All</option> {/* Default "All" option */}
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
  );
};

export default OnSaleDropdown;
