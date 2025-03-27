import React, { useState } from "react";
import { LuSearch, LuChevronLeft, LuX } from "react-icons/lu";
import WordCloud from "@/features/search/components/WordCloud";

// 인기 키워드 타입 정의
interface PopularKeyword {
  text: string;
  weight: number; // 가중치 (조회수 또는 중요도)
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "손흥민",
    "챗 지피티",
    "야구",
  ]);

  // 인기 키워드 데이터 (예시)
  const [popularKeywords] = useState<PopularKeyword[]>([
    { text: "올림픽", weight: 95 },
    { text: "방탄소년단", weight: 88 },
    { text: "코로나", weight: 75 },
    { text: "이변", weight: 50 },
    { text: "주식", weight: 85 },
    { text: "전기차", weight: 70 },
    { text: "갤럭시", weight: 65 },
    { text: "아이폰", weight: 60 },
    { text: "AI", weight: 90 },
    { text: "날씨", weight: 55 },
    { text: "월드컵", weight: 72 },
    { text: "여행", weight: 68 },
    { text: "배달", weight: 58 },
  ]);

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

  // 키워드 클릭 시 검색어 업데이트
  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    console.log("Selected keyword:", keyword);
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      {/* Header with back button */}
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
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
          >
            <LuSearch size={24} className="mr-2 mb-1" />
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
              <LuSearch className="text-gray-400 mr-5" size={22} />
              <span className="text-gray-600 text-xl">{search}</span>
            </div>
            <LuX
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
              size={20}
              onClick={() => handleClearSearch(index)}
            />
          </div>
        ))}
      </div>

      {/* 회색 구분선 */}
      <hr className="border-b-5 border-gray-100 -mx-4" />

      {/* 인기 키워드 워드 클라우드 */}
      <div>
        <h2 className="font-semibold text-xl mb-5">인기있는 키워드</h2>
        <div className="p-4 bg-white rounded-xl">
          <WordCloud
            keywords={popularKeywords}
            onKeywordClick={handleKeywordClick}
            width={550}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
