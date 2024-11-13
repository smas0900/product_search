// components/filters/ProductNameFilter.js

import React from "react";

function ProductNameFilter({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control mb-2"
      placeholder="Search by product name or SKU"
      value={value}
      onChange={(e) => onChange("productName", e.target.value)}
    />
  );
}

export default ProductNameFilter;
