import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

  // Update select mode when selectedProducts changes
  useEffect(() => {
    setSelectMode(selectedProducts.length > 0);
  }, [selectedProducts]);

  // Handle individual checkbox toggle
  const handleCheckboxChange = (sku) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(sku)) {
        return prevSelected.filter(item => item !== sku); // Unselect product
      } else {
        return [...prevSelected, sku]; // Select product
      }
    });
  };

  // Handle 'Select All' checkbox toggle
  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map(product => product.sku)); // Select all
    } else {
      setSelectedProducts([]); // Deselect all
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      
      {/* Show dropdown button if any product is selected */}
      <div className="table-header">
        <input
          type="checkbox"
          checked={selectedProducts.length === products.length}
          onChange={handleSelectAllChange}
        />
        
        {selectMode ? (
          <div className="selection-header">
            <span>{selectedProducts.length} Item{selectedProducts.length > 1 ? 's' : ''} Selected</span>
            <button className="dropdown-button">Select Action ▼</button>
          </div>
        ) : (
          // Display regular table headers when no items are selected
          <div className="table-headers">
            <span>Product Name</span>
            <span>Status</span>
            <span>Quantity</span>
            <span>Category</span>
            <span>On Sale</span>
            <span>Vendor</span>
          </div>
        )}
      </div>
      
      {/* Product list remains visible regardless of selection mode */}
      <table className="table table-bordered table-striped">
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.sku}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.sku)}
                    onChange={() => handleCheckboxChange(product.sku)}
                  />
                </td>
                <td>
                  <div>
                    <img src={product.image} alt={product.sku} style={{ width: '50px' }} />
                  </div>
                  <div>{product.name}</div>
                  <div className="as">{product.sku}</div>
                  <div className="product-date">{product.date}</div>
                </td>
                <td>{product.status}</td>
                <td>{product.qty}</td>
                <td>{product.category}</td>
                <td>{product.onSale ? 'Yes' : 'No'}</td>
                <td>{product.vendor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
