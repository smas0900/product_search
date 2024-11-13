// src/components/filters/ProductNameFilter.js
import React from "react";

function ProductNameFilter({ filters, onFiltersChange }) {
  return (
    <input
      type="text"
      className="form-control mb-2"
      placeholder="Search by product name or SKU"
      value={filters.productName}
      onChange={(e) =>
        onFiltersChange({ ...filters, productName: e.target.value })
      }
    />
  );
}

export default ProductNameFilter;
