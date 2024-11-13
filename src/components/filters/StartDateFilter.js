// components/filters/StartDateFilter.js

import React from "react";

function StartDateFilter({ value, onChange }) {
  return (
    <input
      type="date"
      className="form-control mb-2"
      value={value}
      onChange={(e) => onChange("startDate", e.target.value)}
    />
  );
}

export default StartDateFilter;
