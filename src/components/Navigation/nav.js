// components/nav/Navbar.js
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
  onApplyFilters
}) => {
  return (
    <nav className="navbar">
      <ProductSearch productQuery={productQuery} onProductQueryChange={onProductQueryChange} />
      <VendorSearch vendorQuery={vendorQuery} onVendorQueryChange={onVendorQueryChange} />
      <OnSaleDropdown onSale={onOnSaleChange} onOnSaleChange={onOnSaleChange} />
      <StockStatusDropdown stockStatus={onStockStatusChange} onStockStatusChange={onStockStatusChange} />
      <ProductStatusDropdown productStatus={onProductStatusChange} onProductStatusChange={onProductStatusChange} />
      <button onClick={onApplyFilters}>Apply Filters</button>
    </nav>
  );
};

export default Navbar;
