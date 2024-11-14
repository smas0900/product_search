// components/nav/ProductSearch.js
import React from 'react';

const ProductSearch = ({ productQuery, onProductQueryChange }) => {
  return (
    <div className="filter">
      <label htmlFor="product-query">Product Name or SKU:</label>
      <input
        type="text"
        id="product-query"
        value={productQuery}
        onChange={(e) => onProductQueryChange(e.target.value)}
        placeholder="Enter product name or SKU"
      />
    </div>
  );
};

export default ProductSearch;
