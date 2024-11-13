// src/components/SearchBar.js
import React from "react";
import ProductNameFilter from "./filters/ProductNameFilter";
import VendorFilter from "./filters/VendorFilter";
import OnSaleFilter from "./filters/OnSaleFilter";
import StockStatusFilter from "./filters/StockStatusFilter";
import ProductStatusFilter from "./filters/ProductStatusFilter";
import StartDateFilter from "./filters/StartDateFilter";
import EndDateFilter from "./filters/EndDateFilter";

function SearchBar({ filters, onFiltersChange }) {
  return (
    <form className="mb-3">
      <ProductNameFilter filters={filters} onFiltersChange={onFiltersChange} />
      <VendorFilter filters={filters} onFiltersChange={onFiltersChange} />
      <OnSaleFilter filters={filters} onFiltersChange={onFiltersChange} />
      <StockStatusFilter filters={filters} onFiltersChange={onFiltersChange} />
      <ProductStatusFilter filters={filters} onFiltersChange={onFiltersChange} />
      <StartDateFilter filters={filters} onFiltersChange={onFiltersChange} />
      <EndDateFilter filters={filters} onFiltersChange={onFiltersChange} />
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={() => onFiltersChange({
          productName: "",
          vendor: "",
          onSale: "",
          stockStatus: "",
          productStatus: "",
          startDate: "",
          endDate: ""
        })}
      >
        Clear All Filters
      </button>
    </form>
  );
}

export default SearchBar;
