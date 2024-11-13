// components/SearchBar.js

import React from "react";
import ProductNameFilter from "./filters/ProductNameFilter";
import VendorFilter from "./filters/VendorFilter";
import OnSaleFilter from "./filters/OnSaleFilter";
import StockStatusFilter from "./filters/StockStatusFilter";
import ProductStatusFilter from "./filters/ProductStatusFilter";
import StartDateFilter from "./filters/StartDateFilter";
import EndDateFilter from "./filters/EndDateFilter";
import initialFilters from "./filters";

function SearchBar({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <form className="mb-3">
      <ProductNameFilter value={filters.productName} onChange={handleFilterChange} />
      <VendorFilter value={filters.vendor} onChange={handleFilterChange} />
      <OnSaleFilter value={filters.onSale} onChange={handleFilterChange} />
      <StockStatusFilter value={filters.stockStatus} onChange={handleFilterChange} />
      <ProductStatusFilter value={filters.productStatus} onChange={handleFilterChange} />
      <StartDateFilter value={filters.startDate} onChange={handleFilterChange} />
      <EndDateFilter value={filters.endDate} onChange={handleFilterChange} />
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={() => onFiltersChange(initialFilters)}
      >
        Clear All Filters
      </button>
    </form>
  );
}

export default SearchBar;
