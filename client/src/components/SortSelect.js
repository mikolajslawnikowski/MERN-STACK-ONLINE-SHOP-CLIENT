import React from "react";

const SortSelect = ({ onSortChange }) => {
  return (
    <select onChange={onSortChange}>
      <option value="">Sort by...</option>
      <option value="price_asc">Price (Low to High)</option>
      <option value="price_desc">Price (High to Low)</option>
      <option value="date_asc">Date (Oldest to Newest)</option>
      <option value="date_desc">Date (Newest to Oldest)</option>
      <option value="rating_asc">Rating (Low to High)</option>
      <option value="rating_desc">Rating (High to Low)</option>
    </select>
  );
};

export default SortSelect;
