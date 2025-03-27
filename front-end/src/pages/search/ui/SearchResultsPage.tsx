import React, { useState, useEffect } from "react";
import { LuSearch, LuChevronLeft, LuX } from "react-icons/lu";
import NavBar from "@/shared/ui/NavBar";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: "news" | "shorts" | "kids";
}

export default function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    // 검색 필터링 로직 추가
  };

  const fetchSearchResults = async () => {
    // 검색 결과를 가져오는 API 호출 (임시로 더미 데이터 사용)
    const dummyResults: SearchResult[] = [
      { id: 1, title: "손흥민 시즌 12호 도움", description: "손흥민이 12호 도움을 기록", type: "news" },
      { id: 2, title: "손흥민 FIFA 23", description: "손흥민 FIFA 23 게임", type: "shorts" },
      { id: 3, title: "어린이 기자단이 전한 손흥민 소식", description: "어린이 기자단이 전한 손흥민", type: "kids" },
    ];
    setSearchResults(dummyResults);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery, selectedFilter]);

  const handleClearSearch = (index: number) => {
    setSearchQuery("");
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* Header with back button and search input */}
      <div className="flex items-center">
        <button className="p-2" onClick={handleReturn}>
          <LuChevronLeft size={25} />
        </button>
        <div className="relative flex-1 ml-2">
          <input
            type="text"
            className="w-full p-3 pr-12 rounded-[25px] border border-gray-300 text-xl text-gray-600 placeholder-gray-400"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => fetchSearchResults()}  // 검색 버튼 클릭 시 검색 실행
            disabled={!searchQuery.trim()}
          >
            <LuSearch size={24} className="mr-2 mb-1" />
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${selectedFilter === "전체" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleFilterChange("전체")}
        >
          전체
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedFilter === "뉴스" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleFilterChange("뉴스")}
        >
          뉴스
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedFilter === "shorts" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleFilterChange("shorts")}
        >
          Shorts
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${selectedFilter === "기자단" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          onClick={() => handleFilterChange("기자단")}
        >
          기자단
        </button>
      </div>

      {/* Search Results */}
      <div>
        <h2 className="font-semibold text-xl mb-5">검색 결과</h2>
        <div>
          {searchResults
            .filter((result) => selectedFilter === "전체" || result.type === selectedFilter)
            .map((result) => (
              <div key={result.id} className="mb-4 p-4 border rounded-lg">
                <h3 className="font-semibold text-lg">{result.title}</h3>
                <p>{result.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Navbar */}
      <NavBar />
    </div>
  );
}
