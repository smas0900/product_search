import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({ products, setProducts, setFilteredProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

  // Update select mode when selectedProducts changes
  useEffect(() => {
    setSelectMode(selectedProducts.length > 0);
  }, [selectedProducts]);

  // Handle individual checkbox toggle
  const handleCheckboxChange = (id) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id); // Unselect product
      } else {
        return [...prevSelected, id]; // Select product
      }
    });
  };

  // Handle 'Select All' checkbox toggle
  const handleSelectAllChange = (event) => {
    if (event.target.checked) {
      setSelectedProducts(products.map((product) => product.id)); // Select all by id
    } else {
      setSelectedProducts([]); // Deselect all
    }
  };

  // Handle dropdown action
  const handleDropdownAction = (action) => {
    if (action === 'delete') {
      console.log("Selected products for deletion:", selectedProducts);

      setProducts((prevProducts) => {
        const remainingProducts = prevProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        );

        console.log("Remaining products after deletion:", remainingProducts);
        return remainingProducts;
      });

      // Also update the filtered products state
      setFilteredProducts((prevFilteredProducts) => {
        const remainingFilteredProducts = prevFilteredProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        );
        return remainingFilteredProducts;
      });

      setSelectedProducts([]); // Clear selection
      setSelectMode(false); // Exit selection mode
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
            <select
              className="dropdown-button"
              onChange={(e) => handleDropdownAction(e.target.value)}
            >
              <option value="">Select Action</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        ) : (
          // Display regular table headers when no items are selected
          <div className="table-headers">
            <span></span>

            <span className='pn'>Product Name</span>
            <span className='pnstatus'>Status</span>
            <span className='pnq'>Quantity</span>
            <span className='pnc'>Category</span>
            <span className='pns'>On Sale</span>
            <span className='pnv'>Vendor</span>
          </div>
        )}
      </div>

      {/* Product list remains visible regardless of selection mode */}
      <table className="table table-bordered table-striped">
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                {/* Image Column */}
                <td>
                  <img src={product.image} alt={product.sku} className="product-image" />
                </td>
                {/* Product Name Column */}
                <td>
                  <div className="product-n">{product.name}</div>
                  <div className="as">{product.sku}</div>
                  <div className="product-date">{product.date}</div>
                </td>
                <td className="product-al">{product.status}</td>
                <td className="product-al">{product.qty}</td>
                <td className="product-al">{product.category}</td>
                <td className="product-al">{product.onSale ? 'Yes' : 'No'}</td>
                <td className="product-al">{product.vendor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
