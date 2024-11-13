// src/components/filters/StockStatusFilter.js
import React from "react";

function StockStatusFilter({ filters, onFiltersChange }) {
  return (
    <select
      className="form-control mb-2"
      value={filters.stockStatus}
      onChange={(e) => onFiltersChange({ ...filters, stockStatus: e.target.value })}
    >
      <option value="">Stock Status</option>
      <option value="In Stock">In Stock</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>
  );
}

export default StockStatusFilter;
