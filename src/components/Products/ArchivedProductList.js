import React from 'react';
import './ProductList.css';

const ArchivedProductList = ({ archivedProducts, setArchivedProducts, setProducts, setFilteredProducts }) => {
  // Handle unarchiving products back to the main list
  const handleUnarchive = (id) => {
    const productToUnarchive = archivedProducts.find(product => product.id === id);

    // Add the product back to the main products list
    setProducts((prevProducts) => [...prevProducts, productToUnarchive]);
    setFilteredProducts((prevFilteredProducts) => [...prevFilteredProducts, productToUnarchive]);

    // Remove the product from the archived products list
    setArchivedProducts((prevArchived) => prevArchived.filter(product => product.id !== id));
  };

  return (
    <div className="archived-product-list">
      <h2>Archived Products</h2>

      {archivedProducts.length > 0 ? (
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
            {archivedProducts.map((product) => (
              <tr key={product.id}>
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
      ) : (
        <p>No archived products found.</p>
      )}
    </div>
  );
};

export default ArchivedProductList;
