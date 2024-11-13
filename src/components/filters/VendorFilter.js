// components/filters/VendorFilter.js

import React from "react";

function VendorFilter({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control mb-2"
      placeholder="Vendor Name or Vendor SKU"
      value={value}
      onChange={(e) => onChange("vendor", e.target.value)}
    />
  );
}

export default VendorFilter;
