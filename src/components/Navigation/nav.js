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
  isFilterApplied // Whether filters are applied
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Product Name or SKU search */}
        <ProductSearch productQuery={productQuery} onProductQueryChange={onProductQueryChange} />

        {/* Vendor Name or SKU search */}
        <VendorSearch vendorQuery={vendorQuery} onVendorQueryChange={onVendorQueryChange} />

        {/* On Sale filter dropdown */}
        <OnSaleDropdown 
          value={onSale} // The dropdown will show the value of `onSale`
          onOnSaleChange={onOnSaleChange} 
        />

        {/* Stock Status filter dropdown */}
        <StockStatusDropdown 
          value={stockStatus} // The dropdown will show the value of `stockStatus`
          onStockStatusChange={onStockStatusChange} 
        />

        {/* Product Status filter dropdown */}
        <ProductStatusDropdown 
          value={productStatus} // The dropdown will show the value of `productStatus`
          onProductStatusChange={onProductStatusChange} 
        />

        {/* Apply Filters Button */}
        <button className="apply-filters-button" onClick={onApplyFilters}>Apply Filters</button>

        {/* Clear Filters Button */}
        {isFilterApplied && (
          <button className="clear-filters-button" onClick={onClearFilters}>Clear Filters</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
