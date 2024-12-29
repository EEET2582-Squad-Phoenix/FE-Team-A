import React from "react";
import { FilterState } from "@/types/project";

type FilterProps = {
  filters: FilterState;
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
};

export default function Filter({ filters, categories, onFilterChange }: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        className="p-2 border border-gray-300 rounded"
        value={filters.category}
        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Filter by Country"
        className="p-2 border border-gray-300 rounded"
        value={filters.country}
        onChange={(e) => onFilterChange({ ...filters, country: e.target.value })}
      />
    </div>
  );
}
