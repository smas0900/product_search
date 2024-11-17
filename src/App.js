// src/App.js
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

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Updated useEffect to apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = [...products];
    console.log("Initial products:", filtered);
  
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
  }, [products, productQuery, vendorQuery, onSale, stockStatus, productStatus]);

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
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
