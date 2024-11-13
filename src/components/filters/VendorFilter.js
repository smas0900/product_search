// src/components/filters/VendorFilter.js
import React from "react";

function VendorFilter({ filters, onFiltersChange }) {
  return (
    <input
      type="text"
      className="form-control mb-2"
      placeholder="Vendor Name or Vendor SKU"
      value={filters.vendor}
      onChange={(e) => onFiltersChange({ ...filters, vendor: e.target.value })}
    />
  );
}

export default VendorFilter;
