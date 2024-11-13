// components/filters/EndDateFilter.js

import React from "react";

function EndDateFilter({ value, onChange }) {
  return (
    <input
      type="date"
      className="form-control mb-2"
      value={value}
      onChange={(e) => onChange("endDate", e.target.value)}
    />
  );
}  

export default EndDateFilter;
