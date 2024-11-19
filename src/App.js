import React, { useState, useEffect } from 'react';
import ProductList from './components/Products/ProductList';
import Navbar from './components/Navigation/nav';

const App = () => {
  const [productQuery, setProductQuery] = useState('');
  const [vendorQuery, setVendorQuery] = useState('');
  const [onSale, setOnSale] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Track whether filters are applied
  const isFilterApplied =
    productQuery ||
    vendorQuery ||
    onSale ||
    stockStatus ||
    productStatus ||
    dateFilter;

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, no filters applied
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters
  const applyFilters = () => {
    let filtered = [...products];

    if (productQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(productQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(productQuery.toLowerCase())
      );
    }

    if (vendorQuery) {
      filtered = filtered.filter(product =>
        product.vendor.toLowerCase().includes(vendorQuery.toLowerCase())
      );
    }

    if (onSale) {
      filtered = filtered.filter(product => product.onSale === (onSale === 'yes'));
    }

    if (stockStatus) {
      filtered = filtered.filter(product => stockStatus === 'in_stock' ? product.qty > 0 : product.qty === 0);
    }

    if (productStatus) {
      filtered = filtered.filter(product => product.status === productStatus);
    }

    if (dateFilter) {
      filtered = filtered.filter(product => new Date(product.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString());
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);  // Reset to the first page whenever filters are applied
    setFiltersApplied(true);  // Mark filters as applied
  };

  // Clear all filters
  const clearFilters = () => {
    setProductQuery('');
    setVendorQuery('');
    setOnSale('');
    setStockStatus('');
    setProductStatus('');
    setDateFilter('');
    setFilteredProducts(products); 
    setCurrentPage(1); 
    setFiltersApplied(false); // Reset filters applied state
  };

  // Get products for the current page
  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Change page
  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Helper to render applied filters
  const renderAppliedFilters = () => {
    const filters = [];
  
    if (productQuery) {
      filters.push(
        <span key="productQuery">
          Product: {productQuery}{' '}
          <button
            onClick={() => {
              setProductQuery('');
              setTimeout(applyFilters, 0); // Reapply filters after state update
            }}
          >
            X
          </button>
        </span>
      );
    }
  
    if (vendorQuery) {
      filters.push(
        <span key="vendorQuery">
          Vendor: {vendorQuery}{' '}
          <button
            onClick={() => {
              setVendorQuery('');
              setTimeout(applyFilters, 0);
            }}
          >
            X
          </button>
        </span>
      );
    }
  
    if (onSale) {
      filters.push(
        <span key="onSale">
          On Sale: {onSale === 'yes' ? 'Yes' : 'No'}{' '}
          <button
            onClick={() => {
              setOnSale('');
              setTimeout(applyFilters, 0);
            }}
          >
            X
          </button>
        </span>
      );
    }
  
    if (stockStatus) {
      filters.push(
        <span key="stockStatus">
          Stock Status: {stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}{' '}
          <button
            onClick={() => {
              setStockStatus('');
              setTimeout(applyFilters, 0);
            }}
          >
            X
          </button>
        </span>
      );
    }
  
    if (productStatus) {
      filters.push(
        <span key="productStatus">
          Product Status: {productStatus}{' '}
          <button
            onClick={() => {
              setProductStatus('');
              setTimeout(applyFilters, 0);
            }}
          >
            X
          </button>
        </span>
      );
    }
  
    if (dateFilter) {
      filters.push(
        <span key="dateFilter">
          Date: {new Date(dateFilter).toLocaleDateString()}{' '}
          <button
            onClick={() => {
              setDateFilter('');
              setTimeout(applyFilters, 0);
            }}
          >
            X
          </button>
        </span>
      );
    }
  
    return filters;
  };
  
  return (
    <div className="App">
      <Navbar
        productQuery={productQuery}
        vendorQuery={vendorQuery}
        onProductQueryChange={setProductQuery}
        onVendorQueryChange={setVendorQuery}
        onOnSaleChange={setOnSale}
        onStockStatusChange={setStockStatus}
        onProductStatusChange={setProductStatus}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
        isFilterApplied={isFilterApplied}
        filtersApplied={filtersApplied}    // Pass whether filters are applied
        onSale={onSale}
        stockStatus={stockStatus}
        productStatus={productStatus}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}  // Pass the date filter state and setter
      />
      
      {/* Render applied filters only after filters have been applied */}
      {filtersApplied && (
        <div className="applied-filters">
          <div className="filters">
            {renderAppliedFilters()}
          </div>
        </div>
      )}

      <ProductList products={paginateProducts()} />

      {/* Pagination Controls with Page Numbers */}
      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => changePage(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
