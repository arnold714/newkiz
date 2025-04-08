interface SearchFilterButtonsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const SearchFilterButtons: React.FC<SearchFilterButtonsProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  const filters = ["전체", "뉴스", "기자단"];

  return (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`p-3 py-1 rounded-lg ${
            selectedFilter === filter
              ? "border-2 border-black text-black" 
              : "border border-gray-300 text-gray-500" 
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};