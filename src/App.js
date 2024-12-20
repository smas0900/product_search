import React, { useState, useEffect } from "react";
import ProductList from "./components/Products/ProductList";
import ArchivedProductList from './components/Products/ArchivedProductList';
import Navbar from "./components/Navigation/nav";
import './App.css';

const App = () => {
  const [productQuery, setProductQuery] = useState("");
  const [vendorQuery, setVendorQuery] = useState("");
  const [onSale, setOnSale] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [productStatus, setProductStatus] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [archivedProducts, setArchivedProducts] = useState([]);
  const [viewArchived, setViewArchived] = useState(false);

  // State to control when filters should be applied
  const [applyFiltersFlag, setApplyFiltersFlag] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, no filters applied
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters only when the "Apply Filters" button is clicked
  useEffect(() => {
    if (!applyFiltersFlag) return;

    let filtered = [...products];

   

    if (productQuery || vendorQuery) {
      filtered = filtered.filter((product) => {
        const matchesProductQuery = productQuery
          ? product.name.toLowerCase().includes(productQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(productQuery.toLowerCase())
          : false;
    
        const matchesVendorQuery = vendorQuery
          ? product.vendor.toLowerCase().includes(vendorQuery.toLowerCase()) ||
            product.sku.toLowerCase().includes(vendorQuery.toLowerCase())
          : false;
    
        return matchesProductQuery || matchesVendorQuery;  // Matches either the product or the vendor query
      });
    }

    if (onSale) {
      filtered = filtered.filter(
        (product) => product.onSale === (onSale === "yes")
      );
    }

    if (stockStatus) {
      filtered = filtered.filter((product) =>
        stockStatus === "in_stock" ? product.qty > 0 : product.qty === 0
      );
    }

    if (productStatus) {
      filtered = filtered.filter((product) => product.status === productStatus);
    }

    if (dateFilter) {
      const { startDate, endDate } = dateFilter;
      filtered = filtered.filter((product) => {
        const productDate = new Date(product.date);
        return productDate >= new Date(startDate) && productDate <= new Date(endDate);
      });
    }

    setFilteredProducts(filtered);
    setFiltersApplied(true); // Mark filters as applied
    setCurrentPage(1); // Reset to the first page whenever filters are applied
  }, [
    applyFiltersFlag,
    productQuery,
    vendorQuery,
    onSale,
    stockStatus,
    productStatus,
    dateFilter,
    products,
  ]);

  // Clear all filters
  const clearFilters = () => {
    setProductQuery("");
    setVendorQuery("");
    setOnSale("");
    setStockStatus("");
    setProductStatus("");
    setDateFilter("");
    setFilteredProducts(products); // Reset to the original product list
    setCurrentPage(1);
    setFiltersApplied(false); // Reset filters applied state
    setApplyFiltersFlag(false); // Reset the apply filter flag
  };

  // Remove individual filter and let useEffect handle reapplying filters
  const removeFilter = (filterType) => {
    switch (filterType) {
      case "productQuery":
        setProductQuery("");
        break;
      case "vendorQuery":
        setVendorQuery("");
        break;
      case "onSale":
        setOnSale("");
        break;
      case "stockStatus":
        setStockStatus("");
        break;
      case "productStatus":
        setProductStatus("");
        break;
      case "dateFilter":
        setDateFilter("");
        break;
      default:
        break;
    }
  };

  // Get products for the current page
  const paginateProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Change page
  const changePage = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Helper to render applied filters
  const renderAppliedFilters = () => {
    const filters = [];

    if (productQuery) {
      filters.push(
        <span className="applyed-filter" key="productQuery">
          Product or SKU: {productQuery}{" "}
          <button onClick={() => removeFilter("productQuery")}>X</button>
        </span>
      );
    }

    if (vendorQuery) {
      filters.push(
        <span className="applyed-filter" key="vendorQuery">
          Vendor or SKU: {vendorQuery}{" "}
          <button onClick={() => removeFilter("vendorQuery")}>X</button>
        </span>
      );
    }

    if (onSale) {
      filters.push(
        <span className="applyed-filter" key="onSale">
          On Sale: {onSale === "yes" ? "Yes" : "No"}{" "}
          <button onClick={() => removeFilter("onSale")}>X</button>
        </span>
      );
    }

    if (stockStatus) {
      filters.push(
        <span className="applyed-filter" key="stockStatus">
          Stock Status:{" "}
          {stockStatus === "in_stock" ? "In Stock" : "Out of Stock"}{" "}
          <button onClick={() => removeFilter("stockStatus")}>X</button>
        </span>
      );
    }

    if (productStatus) {
      filters.push(
        <span className="applyed-filter" key="productStatus">
          Product Status: {productStatus}{" "}
          <button onClick={() => removeFilter("productStatus")}>X</button>
        </span>
      );
    }

    if (dateFilter) {
      filters.push(
        <span className="applyed-filter" key="dateFilter">
          Date Range: {new Date(dateFilter.startDate).toLocaleDateString()} -{" "}
          {new Date(dateFilter.endDate).toLocaleDateString()}{" "}
          <button onClick={() => removeFilter("dateFilter")}>X</button>
        </span>
      );
    }

    return filters;
  };

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
        onApplyFilters={() => setApplyFiltersFlag(true)} // Apply filters when button clicked
        onClearFilters={clearFilters}
        isFilterApplied={filtersApplied}
        filtersApplied={filtersApplied}
        onSale={onSale}
        stockStatus={stockStatus}
        productStatus={productStatus}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        setViewArchived={setViewArchived}
        viewArchived={viewArchived}
      />

      {filtersApplied && (
        <div className="applied-filters">
          <div className="filters">{renderAppliedFilters()}</div>
        </div>
      )}

      {/* <ProductList products={paginateProducts()} /> */}
      {/* <ProductList products={paginateProducts()} setProducts={setProducts} /> */}
      {viewArchived ? (
        <ArchivedProductList 
          archivedProducts={archivedProducts}
          setArchivedProducts={setArchivedProducts}
          setProducts={setProducts}
          setFilteredProducts={setFilteredProducts}
        />
      ):(
      <ProductList 
  products={paginateProducts()} 
  setProducts={setProducts} 
  setFilteredProducts={setFilteredProducts}
  archivedProducts={archivedProducts} 
  setArchivedProducts={setArchivedProducts}  // Pass setFilteredProducts 
/>
 )}

      <div className="pagination">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => changePage(number)}
            className={number === currentPage ? "active" : ""}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
