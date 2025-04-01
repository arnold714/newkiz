import React, { useState } from "react";
import { LuChevronRight } from "react-icons/lu";
import { FaHeart, FaBookmark, FaRegBookmark, FaRegHeart } from "react-icons/fa6";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: "news" | "shorts" | "kids";
}

interface KidsResultsProps {
  results: SearchResult[];
  isFilterView?: boolean;
  onSeeMore?: () => void;
}

export function KidsResults({ results, isFilterView = false, onSeeMore }: KidsResultsProps) {
  // State to track likes and bookmarks
  const [likedItems, setLikedItems] = useState<Record<number, boolean>>({});
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<number, boolean>>({});

  // Toggle like for an item
  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle bookmark for an item
  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Display all results if filter view, otherwise show only one
  const displayResults = isFilterView ? results : results.slice(0, 1);
  const hasMoreResults = results.length > displayResults.length;

  if (displayResults.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">기자단</h2>
        {!isFilterView && hasMoreResults && (
          <button
            onClick={onSeeMore}
            className="flex items-center text-gray-500 hover:text-blue-500"
          >
            <span className="text-sm mr-1">더보기</span>
            <LuChevronRight size={16} />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {displayResults.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Reporter info */}
            <div className="p-4 flex items-center">
              <div className="w-8 h-8 mr-2">
                <img 
                  src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/loki.png" 
                  alt="공룡 캐릭터"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-medium">뿡뿡이</span>
            </div>
            
            {/* Article content */}
            <div className="w-full">
              <img
                src="/newsImage3.png"
                alt="기사 썸네일"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                {/* Footer with date and interaction buttons */}
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">6일 전</div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={(e) => toggleLike(item.id, e)}
                      className="focus:outline-none"
                    >
                      {likedItems[item.id] ? (
                        <FaHeart size={22} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={22} className="text-gray-600" />
                      )}
                    </button>
                    <button 
                      onClick={(e) => toggleBookmark(item.id, e)}
                      className="focus:outline-none"
                    >
                      {bookmarkedItems[item.id] ? (
                        <FaBookmark size={22} className="text-blue-500" />
                      ) : (
                        <FaRegBookmark size={22} className="text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Loading indicator for filter view */}
      {isFilterView && (
        <div className="text-center py-4 text-gray-500 text-sm">
          {displayResults.length > 0 ? "스크롤하여 더 불러오는 중..." : "검색 결과가 없습니다"}
        </div>
      )}
    </div>
  );
}