// ArchivedProductsPage.js
import React from "react";

const ArchivedProductsPage = ({ archivedProducts }) => {
  return (
    <div className="archived-products-page">
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
            </tr>
          </thead>
          <tbody>
            {archivedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.status}</td>
                <td>{product.qty}</td>
                <td>{product.category}</td>
                <td>{product.onSale ? "Yes" : "No"}</td>
                <td>{product.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No archived products.</p>
      )}
    </div>
  );
};

export default ArchivedProductsPage;
