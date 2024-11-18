import React, { useState, useEffect } from 'react';
import ProductList from './components/Products/ProductList';
import Navbar from './components/Navigation/nav';

const App = () => {
  const [productQuery, setProductQuery] = useState('');
  const [vendorQuery, setVendorQuery] = useState('');
  const [onSale, setOnSale] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Customize this as per your needs

  // Track whether filters are applied
  const isFilterApplied = 
    productQuery || 
    vendorQuery || 
    onSale || 
    stockStatus || 
    productStatus;

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

    setFilteredProducts(filtered);
    setCurrentPage(1);  // Reset to the first page whenever filters are applied
  };

  // Clear all filters
  const clearFilters = () => {
    setProductQuery('');
    setVendorQuery('');
    setOnSale('');
    setStockStatus('');
    setProductStatus('');
    setFilteredProducts(products); 
    setCurrentPage(1); 
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
        isFilterApplied={isFilterApplied}  // Pass whether filters are applied
        onSale={onSale}
        stockStatus={stockStatus}
        productStatus={productStatus}
      />
      <ProductList products={paginateProducts()} />

      {/* Pagination Controls with Page Numbers */}
      <div className="pagination">
        <button 
          onClick={() => changePage(currentPage - 1)} 
          disabled={currentPage === 1}>
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button 
            key={number} 
            onClick={() => changePage(number)}
            className={number === currentPage ? 'active' : ''}>
            {number}
          </button>
        ))}

        <button 
          onClick={() => changePage(currentPage + 1)} 
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
