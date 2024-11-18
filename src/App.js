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

  // Store the filter settings to be applied on "Apply Filters" button click
  const [appliedFilters, setAppliedFilters] = useState({
    onSale: '',
    stockStatus: '',
    productStatus: ''
  });

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

  // Filter products based on user query or selected filters
  const filterProducts = () => {
    let filtered = [...products];

    // Filter by product name or SKU (search query for product name)
    if (productQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(productQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(productQuery.toLowerCase())
      );
    }

    // Filter by vendor name or SKU (search query for vendor name)
    if (vendorQuery) {
      filtered = filtered.filter(product =>
        product.vendor.toLowerCase().includes(vendorQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(vendorQuery.toLowerCase())
      );
    }

    // Apply the additional filters only when "Apply Filters" is clicked
    if (appliedFilters.onSale !== '') {
      filtered = filtered.filter(product => product.onSale === (appliedFilters.onSale === 'yes'));
    }

    if (appliedFilters.stockStatus !== '') {
      filtered = filtered.filter(product => appliedFilters.stockStatus === 'in_stock' ? product.qty > 0 : product.qty === 0);
    }

    if (appliedFilters.productStatus !== '') {
      filtered = filtered.filter(product => product.status === appliedFilters.productStatus);
    }

    setFilteredProducts(filtered);
  };

  // Handle the Apply Filters button click
  const handleApplyFilters = () => {
    // Set the applied filters based on the current state
    setAppliedFilters({
      onSale,
      stockStatus,
      productStatus
    });
    // Apply the filter logic
    filterProducts();
  };

  useEffect(() => {
    // Apply product name and vendor name filtering immediately as the user types
    filterProducts();
  }, [productQuery, vendorQuery]);

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
        onApplyFilters={handleApplyFilters} // Pass the apply function
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
