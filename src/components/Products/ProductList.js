import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({
  products, 
  setProducts, 
  setFilteredProducts,
  archivedProducts, 
  setArchivedProducts,
  paginate = false,  // Flag to handle pagination logic
}) => {
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

  // Handle dropdown action (delete or archive)
  const handleDropdownAction = (action) => {
    if (action === 'delete') {
      // Delete selected products
      setProducts((prevProducts) => {
        const remainingProducts = prevProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        );
        setFilteredProducts((prevFilteredProducts) => {
          return prevFilteredProducts.filter(
            (product) => !selectedProducts.includes(product.id)
          );
        });
        return remainingProducts;
      });
    }

    if (action === 'archive') {
      // Archive selected products by moving them to the archived list
      setArchivedProducts((prevArchived) => [
        ...prevArchived,
        ...products.filter((product) => selectedProducts.includes(product.id)),
      ]);

      // Remove archived products from the main product list
      setProducts((prevProducts) => {
        const remainingProducts = prevProducts.filter(
          (product) => !selectedProducts.includes(product.id)
        );
        setFilteredProducts((prevFilteredProducts) => {
          return prevFilteredProducts.filter(
            (product) => !selectedProducts.includes(product.id)
          );
        });
        return remainingProducts;
      });
    }

    // Clear selected products after action
    setSelectedProducts([]);
    setSelectMode(false);
  };

  // Paginate products (if pagination is enabled)
  const paginateProducts = () => {
    if (!paginate) return products; // If pagination is not enabled, return the full list of products

    const itemsPerPage = 10; // Adjust this value based on your pagination settings
    const currentPage = 1; // Replace with dynamic page tracking (state)

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);
    return paginatedProducts;
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>

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
              <option value="archive">Archive</option> {/* Archive option added */}
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
            paginateProducts().map((product) => (
              <tr key={product.id}>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                </td>
                {/* Product Details */}
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
