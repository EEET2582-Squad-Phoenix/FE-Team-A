import React from "react";
import { FilterState } from "@/types/project";

type FilterProps = {
  filters: FilterState;
  categories: string[];
  countries: string[];
  onFilterChange: (filters: FilterState) => void;
};

export default function Filter({
  filters,
  categories,
  countries,
  onFilterChange,
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by Project Name"
        className="p-2 border border-gray-300 rounded"
        value={filters.name}
        onChange={(e) => onFilterChange({ ...filters, name: e.target.value })}
      />

      <select
        className="p-2 border border-gray-300 rounded"
        value={filters.category}
        onChange={(e) =>
          onFilterChange({ ...filters, category: e.target.value })
        }
      >
        <option value="All">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="p-2 border border-gray-300 rounded"
        value={filters.country}
        onChange={(e) =>
          onFilterChange({ ...filters, country: e.target.value })
        }
      >
        <option value="All">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
}
