// src/components/filters/ProductStatusFilter.js
import React from "react";

function ProductStatusFilter({ filters, onFiltersChange }) {
  return (
    <select
      className="form-control mb-2"
      value={filters.productStatus}
      onChange={(e) => onFiltersChange({ ...filters, productStatus: e.target.value })}
    >
      <option value="">Product Status</option>
      <option value="Active">Active</option>
      <option value="Acknowledged">Acknowledged</option>
      <option value="Pending">Pending</option>
    </select>
  );
}

export default ProductStatusFilter;
