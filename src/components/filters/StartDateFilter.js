// src/components/filters/StartDateFilter.js
import React from "react";

function StartDateFilter({ filters, onFiltersChange }) {
  return (
    <input
      type="date"
      className="form-control mb-2"
      value={filters.startDate}
      onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
    />
  );
}

export default StartDateFilter;
