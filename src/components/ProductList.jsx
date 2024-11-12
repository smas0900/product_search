import React, { useEffect, useState } from "react";
import "./ProductList.css";

function SearchBar({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <form className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search by product name or SKU"
        value={filters.productName}
        onChange={(e) => handleFilterChange("productName", e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Vendor Name or Vendor SKU"
        value={filters.vendor}
        onChange={(e) => handleFilterChange("vendor", e.target.value)}
      />
      <select
        className="form-control mb-2"
        value={filters.onSale}
        onChange={(e) => handleFilterChange("onSale", e.target.value)}
      >
        <option value="">On Sale</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select
        className="form-control mb-2"
        value={filters.stockStatus}
        onChange={(e) => handleFilterChange("stockStatus", e.target.value)}
      >
        <option value="">Stock Status</option>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
      <select
        className="form-control mb-2"
        value={filters.productStatus}
        onChange={(e) => handleFilterChange("productStatus", e.target.value)}
      >
        <option value="">Product Status</option>
        <option value="Active">Active</option>
        <option value="Acknowledged">Acknowledged</option>
        <option value="Pending">Pending</option>
      </select>
      <input
        type="date"
        className="form-control mb-2"
        value={filters.startDate}
        onChange={(e) => handleFilterChange("startDate", e.target.value)}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={filters.endDate}
        onChange={(e) => handleFilterChange("endDate", e.target.value)}
      />
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={() =>
          onFiltersChange({
            productName: "",
            vendor: "",
            onSale: "",
            stockStatus: "",
            productStatus: "",
            startDate: "",
            endDate: "",
          })
        }
      >
        Clear All Filters
      </button>
    </form>
  );
}

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    productName: "",
    vendor: "",
    onSale: "",
    stockStatus: "",
    productStatus: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    // Apply all filter conditions individually
    if (
      filters.productName &&
      !product.name.toLowerCase().includes(filters.productName.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.vendor &&
      !product.vendor.toLowerCase().includes(filters.vendor.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.onSale &&
      (filters.onSale === "Yes" ? !product.onSale : product.onSale)
    ) {
      return false;
    }
    if (filters.stockStatus && product.stockStatus !== filters.stockStatus) {
      return false;
    }
    if (filters.productStatus && product.status !== filters.productStatus) {
      return false;
    }
    if (
      filters.startDate &&
      new Date(product.date) < new Date(filters.startDate)
    ) {
      return false;
    }
    if (filters.endDate && new Date(product.date) > new Date(filters.endDate)) {
      return false;
    }
    return true; // Product passes all filters
  });

  return (
    <div className="container mt-5">
      <h1>Product List</h1>
      <SearchBar filters={filters} onFiltersChange={setFilters} />

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>On Sale</th>
            <th>Vendor</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.sku}>
              <td>
                <img
                  src={product.image}
                  alt={product.sku}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                {product.name}
                <div className="sku">{product.sku}</div>
              </td>
              <td>
                <span className={`status ${product.status.toLowerCase()}`}>
                  {product.status}
                </span>
              </td>
              <td>{product.qty}</td>
              <td>{product.category}</td>
              <td>{product.onSale ? "Yes" : "No"}</td>
              <td>{product.vendor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
