import React from 'react';

const VendorSearch = ({ vendorQuery, onVendorQueryChange }) => {
  return (
    <div className="filter">
      <label htmlFor="vendor-query">Vendor Name or SKU:</label>
      <input
        type="text"
        id="vendor-query"
        value={vendorQuery}
        onChange={(e) => onVendorQueryChange(e.target.value)} // Update vendor query
        placeholder="Enter vendor name or SKU"
      />
    </div>
  );
};

export default VendorSearch;
