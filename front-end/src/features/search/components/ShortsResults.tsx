import React from "react";
import Slider from "react-slick";
import { LuChevronRight } from "react-icons/lu";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: "news" | "shorts" | "kids";
}

interface ShortsResultsProps {
  results: SearchResult[];
  isFilterView?: boolean;
  onSeeMore?: () => void;
}

export function ShortsResults({ results, isFilterView = false, onSeeMore }: ShortsResultsProps) {
  // Slider settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isFilterView ? 1 : 3.5,
    slidesToScroll: isFilterView ? 1 : 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: isFilterView ? 1 : 2.5,
        }
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: isFilterView ? 1 : 3,
        }
      }
    ]
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">shorts</h2>
        {!isFilterView && results.length > 2 && (
          <button
            onClick={onSeeMore}
            className="flex items-center text-gray-500 hover:text-blue-500"
          >
            <span className="text-sm mr-1">더보기</span>
            <LuChevronRight size={16} />
          </button>
        )}
      </div>

      <div className="px-1 mx-auto max-w-6xl">
        <Slider {...settings}>
        {results.map((item) => (
            <div key={item.id} className={`px-2 ${isFilterView ? 'w-full' : ''}`}>
              <div className="border rounded-lg shadow-sm overflow-hidden">
                <div className={`relative ${isFilterView ? 'pb-[75%]' : 'pb-[100%]'}`}>
                  <img
                    src="/newsImage3.png"
                    alt="shorts 썸네일"
                    className="absolute w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className={`${isFilterView ? 'text-base' : 'text-sm'} font-medium text-white line-clamp-2`}>{item.title}</h3>
                  </div>
                </div>
                <div className={`${isFilterView ? 'p-4' : 'p-2'}`}>
                  <p className={`${isFilterView ? 'text-sm' : 'text-xs'} text-gray-600 ${isFilterView ? 'line-clamp-3' : 'line-clamp-1'}`}>{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">2일 전</span>
                    <span className="text-xs text-gray-400">조회수 2.5k</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isFilterView && results.length === 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}