// components/filters/StockStatusFilter.js

import React from "react";

function StockStatusFilter({ value, onChange }) {
  return (
    <select
      className="form-control mb-2"
      value={value}
      onChange={(e) => onChange("stockStatus", e.target.value)}
    >
      <option value="">Stock Status</option>
      <option value="In Stock">In Stock</option>
      <option value="Out of Stock">Out of Stock</option>
    </select>
  );
}

export default StockStatusFilter;
