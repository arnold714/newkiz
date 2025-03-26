import React, { useState } from "react";
import { LuSearch, LuChevronLeft, LuSend } from "react-icons/lu"; // Lu 아이콘으로 변경

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>(["손흥민", "챗 지피티", "야구"]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Search for:", searchQuery);
    setSearchQuery("");
  };

  const handleClearSearch = (index: number) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches); 
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* Header with back button */}
      <div className="flex items-center">
        <button className="p-2" onClick={handleReturn}>
          <LuChevronLeft size={20} />
        </button>
        <div className="relative flex-1 ml-2">
          <input
            type="text"
            className="w-full p-3 pr-12 rounded-[25px] border border-gray-300 text-gray-600 placeholder-gray-400"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            <LuSearch size={20} />
          </button>
        </div>
      </div>

      {/* 회색 구분선 */}
      <hr className="border-b-5 border-gray-100 -mx-4" />

      {/* Recent Searches */}
      <div className="space-y-2">
        <h2 className="font-semibold text-xl mb-5">최근 검색어</h2>
        {recentSearches.map((search, index) => (
          <div key={index} className="flex justify-between items-center mb-5 ml-8">
            <div className="flex items-center space-x-2">
              <LuSearch className="text-gray-400 mr-5" size={22}/>
              <span className="text-gray-600 text-xl">{search}</span>
            </div>
            <button
              className="text-black hover:text-gray-800"
              onClick={() => handleClearSearch(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 회색 구분선 */}
      <hr className="border-b-5 border-gray-100 -mx-4" />

      <div>
        <h2 className="font-semibold text-xl mb-5">인기있는 키워드</h2>
        <div className="flex flex-wrap gap-2 mt-2">
        </div>
      </div>
    </div>
  );
}