import React from "react";
import { LuChevronRight } from "react-icons/lu";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: "news" | "shorts" | "kids";
}

interface NewsResultsProps {
  results: SearchResult[];
  isFilterView?: boolean;
  onSeeMore?: () => void; // 더보기 버튼 클릭 이벤트 핸들러
}

export function NewsResults({ results, isFilterView = false, onSeeMore }: NewsResultsProps) {
  console.log("NewsResults received:", results);
  
  // 더미 뉴스 데이터 (직접 테스트용)
  const dummyNews = [
    {
      id: 1,
      title: "손흥민 시즌 12호 도움...토트넘 '역전 8강행'",
      description: "손흥민이 12호 도움을 기록하며 팀의 유로파리그 8강 진출에 기여했다.",
      type: "news" as const,
    },
    {
      id: 2,
      title: "손흥민, 토트넘에 모두 필요했던 꿀, 필요한 순간 터졌다.",
      description: "손흥민이 결정적인 순간에 도움을 기록하며 활약했다.",
      type: "news" as const,
    }
  ];
  
  // 실제 결과가 없으면 더미 데이터 사용
  const displayData = results.length > 0 ? results : dummyNews;
  
  // 필터링 뷰인 경우 모든 결과를 보여주고, 아닌 경우 2개까지만 보여줌
  const displayResults = isFilterView ? displayData : displayData.slice(0, 2);
  const hasMoreResults = displayData.length > displayResults.length;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">주요 뉴스</h2>
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

      {/* 뉴스 결과 리스트 - 가로 카드형 레이아웃 */}
      <div className="space-y-4">
        {displayResults.map((item) => (
          <div
            key={item.id}
            className="flex items-start mb-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 border border-gray-200"
          >
            {/* 뉴스 이미지 */}
            <div className="flex-shrink-0 mr-4">
              <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-200">
                <img
                  src="/newsImage.png" 
                  alt="뉴스 썸네일"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* 뉴스 텍스트 콘텐츠 */}
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">스포츠</div>
              <h3 className="font-medium text-lg leading-tight mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
              <div className="text-xs text-gray-400 mt-1">2일 전</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 무한 스크롤 로딩 인디케이터 (필터 뷰일 때만) */}
      {isFilterView && (
        <div className="text-center py-4 text-gray-500 text-sm">
          {displayResults.length > 0 ? "스크롤하여 더 불러오는 중..." : "검색 결과가 없습니다"}
        </div>
      )}
    </div>
  );
}