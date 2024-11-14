// src/App.js
import React, { useState, useEffect } from 'react';
import ProductList from './components/Products/ProductList';
import Navbar from './components/Navigation/nav';

const App = () => {
  // Filter states
  const [productQuery, setProductQuery] = useState('');
  const [vendorQuery, setVendorQuery] = useState('');
  const [onSale, setOnSale] = useState('');
  const [stockStatus, setStockStatus] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [products, setProducts] = useState([]); // State for holding the products

  // Fetch filtered products based on filters
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Send filters as query parameters to the server
          body: JSON.stringify({
            productQuery,
            vendorQuery,
            onSale,
            stockStatus,
            productStatus,
          }),
        });
        const data = await response.json();
        setProducts(data); // Set filtered products received from the server
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      }
    };

    fetchFilteredProducts();
  }, [productQuery, vendorQuery, onSale, stockStatus, productStatus]);

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
      />
      <ProductList products={products} />
    </div>
  );
};

export default App;
