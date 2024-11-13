// src/components/filters/OnSaleFilter.js
import React from "react";

function OnSaleFilter({ filters, onFiltersChange }) {
  return (
    <select
      className="form-control mb-2"
      value={filters.onSale}
      onChange={(e) => onFiltersChange({ ...filters, onSale: e.target.value })}
    >
      <option value="">On Sale</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

export default OnSaleFilter;
