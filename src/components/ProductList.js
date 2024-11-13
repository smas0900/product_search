// components/ProductList.js

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import initialFilters from "./SearchBar";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(initialFilters);

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
    return true;
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
