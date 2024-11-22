import React, { useState } from 'react';
import './Archived.css';

const ArchivedProductList = ({ archivedProducts, setArchivedProducts, setProducts, setFilteredProducts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust this number as needed for pagination
  
  // Handle unarchiving products back to the main list
  const handleUnarchive = (id) => {
    const productToUnarchive = archivedProducts.find(product => product.id === id);

    // Add the product back to the main products list
    setProducts((prevProducts) => [...prevProducts, productToUnarchive]);
    setFilteredProducts((prevFilteredProducts) => [...prevFilteredProducts, productToUnarchive]);

    // Remove the product from the archived products list
    setArchivedProducts((prevArchived) => prevArchived.filter(product => product.id !== id));
  };

  // Calculate the paginated list
  const paginatedArchivedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return archivedProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(archivedProducts.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="archived-product-list">
      <h2>Archived Products</h2>

      {archivedProducts.length > 0 ? (
        <>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>On Sale</th>
                <th>Vendor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedArchivedProducts().map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.sku}
                      className="product-image"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.status}</td>
                  <td>{product.qty}</td>
                  <td>{product.category}</td>
                  <td>{product.onSale ? 'Yes' : 'No'}</td>
                  <td>{product.vendor}</td>
                  <td>
                    <button onClick={() => handleUnarchive(product.id)}>Unarchive</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {Math.ceil(archivedProducts.length / itemsPerPage)}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(archivedProducts.length / itemsPerPage)}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No archived products found.</p>
      )}
<br></br><br></br>
      <p>Main tab product list</p>
    </div>
    
  );
  
};

export default ArchivedProductList;