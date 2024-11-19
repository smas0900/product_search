import React from 'react';
import ProductSearch from './ProductSearch';
import VendorSearch from './VendorSearch';
import OnSaleDropdown from './OnSale';
import StockStatusDropdown from './StockStatus';
import ProductStatusDropdown from './ProductStatus';

const Navbar = ({
  productQuery,
  vendorQuery,
  onProductQueryChange,
  onVendorQueryChange,
  onOnSaleChange,
  onStockStatusChange,
  onProductStatusChange,
  onApplyFilters,
  onClearFilters, // Clear filters function
  onSale,
  stockStatus,
  productStatus,
  dateFilter,
  setDateFilter,
  filtersApplied 
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Product Name or SKU search */}
        <ProductSearch productQuery={productQuery} onProductQueryChange={onProductQueryChange} />

        {/* Vendor Name or SKU search */}
        <VendorSearch vendorQuery={vendorQuery} onVendorQueryChange={onVendorQueryChange} />

        {/* On Sale filter dropdown */}
        <OnSaleDropdown onSale={onSale} onOnSaleChange={onOnSaleChange} />

        {/* Stock Status filter dropdown */}
        <StockStatusDropdown stockStatus={stockStatus} onStockStatusChange={onStockStatusChange} />

        {/* Product Status filter dropdown */}
        <ProductStatusDropdown productStatus={productStatus} onProductStatusChange={onProductStatusChange} />

        {/* Date filter input */}
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        {/* Apply filters button */}
        <button onClick={onApplyFilters}>Apply Filters</button>

        {/* Clear filters button */}
        {filtersApplied && (
          <>
            <button className="clear-filters-button" onClick={onClearFilters}>Clear Filters</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
