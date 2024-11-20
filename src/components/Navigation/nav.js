import React, { useState } from "react";
import "./Navbar.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ProductSearch from "./ProductSearch";
import VendorSearch from "./VendorSearch";
import OnSaleDropdown from "./OnSale";
import StockStatusDropdown from "./StockStatus";
import ProductStatusDropdown from "./ProductStatus";

const Navbar = ({
  productQuery,
  vendorQuery,
  onProductQueryChange,
  onVendorQueryChange,
  onOnSaleChange,
  onStockStatusChange,
  onProductStatusChange,
  onApplyFilters,
  onClearFilters,
  onSale,
  stockStatus,
  productStatus,
  setDateFilter,
  filtersApplied,
  viewArchived,
  setViewArchived,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleDateSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setDateRange([{ ...ranges.selection }]);
    setDateFilter({ startDate, endDate });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <nav className="navbar">
      {/* <button onClick={() => setViewArchived(false)}>Main Tab</button>
      <button onClick={() => setViewArchived(true)}>Archived</button> */}
      <div className="tab-container">
        <button
          className={`tab-button ${!viewArchived ? "active" : ""}`}
          onClick={() => setViewArchived(false)}
        >
          Main Tab
        </button>
        <button
          className={`tab-button ${viewArchived ? "active" : ""}`}
          onClick={() => setViewArchived(true)}
        >
          Archived
        </button>
      </div>
      <div className="navbar-content">
        <ProductSearch
          productQuery={productQuery}
          onProductQueryChange={onProductQueryChange}
        />
        <VendorSearch
          vendorQuery={vendorQuery}
          onVendorQueryChange={onVendorQueryChange}
        />
        <OnSaleDropdown onSale={onSale} onOnSaleChange={onOnSaleChange} />
        <StockStatusDropdown
          stockStatus={stockStatus}
          onStockStatusChange={onStockStatusChange}
        />
        <ProductStatusDropdown
          productStatus={productStatus}
          onProductStatusChange={onProductStatusChange}
        />

        {/* Date Range Picker */}
        <div className="date-range-picker">
          <button
            className="date-button"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <i className="fa fa-calendar"></i>{" "}
            {formatDate(dateRange[0].startDate)} -{" "}
            {formatDate(dateRange[0].endDate)}
          </button>
          {showDatePicker && (
            <DateRangePicker
              ranges={dateRange}
              onChange={handleDateSelect}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
            />
          )}
        </div>

        <button className="apply-filters-button" onClick={onApplyFilters}>Apply</button>

        {filtersApplied && (
          <button className="clear-filters-button" onClick={onClearFilters}>
            Clear Filters
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
