// components/filters/OnSaleFilter.js

import React from "react";

function OnSaleFilter({ value, onChange }) {
  return (
    <select
      className="form-control mb-2"
      value={value}
      onChange={(e) => onChange("onSale", e.target.value)}
    >
      <option value="">On Sale</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

export default OnSaleFilter;
