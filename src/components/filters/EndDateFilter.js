// src/components/filters/EndDateFilter.js
import React from "react";

function EndDateFilter({ filters, onFiltersChange }) {
  return (
    <input
      type="date"
      className="form-control mb-2"
      value={filters.endDate}
      onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
    />
  );
}

export default EndDateFilter;
