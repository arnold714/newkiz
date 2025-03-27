import React from "react";

interface SearchFilterButtonsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function SearchFilterButtons({
  selectedFilter,
  onFilterChange,
}: SearchFilterButtonsProps) {
  return (
    <div className="flex space-x-4 mb-6">
      {["전체", "뉴스", "shorts", "기자단"].map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-lg ${
            selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
