import React, { useState, useEffect, useCallback, useRef } from "react";
import { LuSearch, LuChevronLeft } from "react-icons/lu";
import NavBar from "@/shared/ui/NavBar";
import { SearchFilterButtons } from "@/widgets/search/ui/SearchFilterButtons";
import { NewsResults } from "@/widgets/search/ui/NewsResults";
import { ShortsResults } from "@/widgets/search/ui/ShortsResults";
import { KidsResults } from "@/widgets/search/ui/KidsResults";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@shared/styles/CustomScroll.css"

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: "news" | "shorts" | "kids";
}

export default function SearchResultsPage() {
  // 초기 검색어 설정 (테스트용)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  // 무한 스크롤을 위한 ref
  const observer = useRef<IntersectionObserver | null>(null);
  const lastResultElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore && selectedFilter === "뉴스") {
          setPage(prevPage => prevPage + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, selectedFilter]
  );

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setPage(1);
    setSearchResults([]);
    setHasMore(true);
  };

  // 뉴스 더보기 버튼 핸들러
  const handleNewsSeeMore = () => {
    handleFilterChange("뉴스");
  };

  // Shorts 더보기 버튼 핸들러
  const handleShortsSeeMore = () => {
    handleFilterChange("shorts");
  };

  // 기자단 더보기 버튼 핸들러
  const handleKidsSeeMore = () => {
    handleFilterChange("기자단");
  };

  const fetchSearchResults = async () => {
    // 검색어 체크 제거하여 항상 결과가 표시되도록 함
    // if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    try {
      console.log("Fetching search results...");
      // API 호출 시뮬레이션 시간 감소
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 더미 데이터 생성
      const newResults: SearchResult[] = [];
      
      // 뉴스 더미 데이터
      if (selectedFilter === "전체" || selectedFilter === "뉴스") {
        newResults.push(
          {
            id: 10 * page + 1,
            title: "손흥민 시즌 12호 도움...토트넘 '역전 8강행'",
            description: "손흥민이 12호 도움을 기록하며 팀의 유로파리그 8강 진출에 기여했다.",
            type: "news",
          },
          {
            id: 10 * page + 2,
            title: "손흥민, 토트넘에 모두 필요했던 꿀, 필요한 순간 터졌다.",
            description: "손흥민이 결정적인 순간에 도움을 기록하며 활약했다.",
            type: "news",
          }
        );
        
        if (page > 1 && selectedFilter === "뉴스") {
          newResults.push(
            {
              id: 10 * page + 3,
              title: "손흥민, 아시아 최다골 기록 경신",
              description: "손흥민이 유럽 무대에서 아시아 선수 최다골 기록을 경신했다.",
              type: "news",
            },
            {
              id: 10 * page + 4,
              title: "토트넘, 손흥민 덕에 리그 4위 유지",
              description: "손흥민의 활약으로 토트넘이 리그 4위를 유지했다.",
              type: "news",
            }
          );
        }
        
        // 더 많은 테스트 데이터 (전체 보기에서 더보기 버튼이 표시되도록)
        if (selectedFilter === "전체") {
          newResults.push(
            {
              id: 10 * page + 5,
              title: "손흥민, EPL 득점왕 경쟁 선두권 유지",
              description: "손흥민이 EPL 득점왕 경쟁에서 선두권을 유지하고 있다.",
              type: "news",
            },
            {
              id: 10 * page + 6,
              title: "손흥민, 팬들이 뽑은 이달의 선수상 수상",
              description: "손흥민이 팬들의 투표로 선정된 이달의 선수상을 수상했다.",
              type: "news",
            }
          );
        }
      }
      
      // Shorts 더미 데이터
      if (selectedFilter === "전체" || selectedFilter === "shorts") {
        newResults.push(
          {
            id: 100 * page + 1,
            title: "손흥민 FIFA 23 최고 등급 선수로 선정",
            description: "손흥민이 FIFA 23 게임에서 최고 등급 선수 중 하나로 선정되었다.",
            type: "shorts"
          },
          {
            id: 100 * page + 2,
            title: "손흥민 환상적인 왼발 슛 모음",
            description: "토트넘 소속 손흥민의 환상적인 왼발 슛 모음",
            type: "shorts"
          }
        );
        
        // 더 많은 테스트 데이터 (전체 보기에서 더보기 버튼이 표시되도록)
        if (selectedFilter === "전체") {
          newResults.push(
            {
              id: 100 * page + 3,
              title: "손흥민 헤더골 모음",
              description: "토트넘 소속 손흥민의 헤더골 모음",
              type: "shorts"
            },
            {
              id: 100 * page + 4,
              title: "손흥민 인터뷰 영상",
              description: "손흥민의 인터뷰 하이라이트",
              type: "shorts"
            }
          );
        }
      }
      
      // 기자단 더미 데이터
      if (selectedFilter === "전체" || selectedFilter === "기자단") {
        newResults.push(
          {
            id: 1000 * page + 1,
            title: "어린이 기자단이 전한 손흥민 소식",
            description: "어린이 기자단이 직접 취재한 손흥민 선수의 일상과 경기 소식",
            type: "kids"
          },
          {
            id: 1000 * page + 2,
            title: "손흥민 선수를 만나고 왔어요!",
            description: "어린이 기자단의 손흥민 선수 인터뷰 현장",
            type: "kids"
          }
        );
        
        // 더 많은 테스트 데이터 (전체 보기에서 더보기 버튼이 표시되도록)
        if (selectedFilter === "전체") {
          newResults.push(
            {
              id: 1000 * page + 3,
              title: "손흥민 선수의 훈련 모습을 관찰했어요",
              description: "어린이 기자단이 관찰한 손흥민 선수의 훈련 모습",
              type: "kids"
            },
            {
              id: 1000 * page + 4,
              title: "손흥민 선수의 팬 사인회에 다녀왔어요",
              description: "어린이 기자단이 참여한 손흥민 팬 사인회 현장",
              type: "kids"
            }
          );
        }
      }
      
      if (page === 1) {
        console.log("Setting initial results:", newResults);
        setSearchResults(newResults);
      } else {
        console.log("Adding more results:", newResults);
        setSearchResults(prev => [...prev, ...newResults]);
      }
      
      // 3페이지 이상이면 더 이상 데이터가 없다고 가정
      setHasMore(page < 3);
      
    } catch (error) {
      console.error("검색 결과 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 첫 마운트시 및 필터/검색어/페이지 변경시 검색 결과 가져오기
  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery, selectedFilter, page]);

  // 결과가 로드되었는지 확인하기 위한 로그
  useEffect(() => {
    console.log("Search results updated:", searchResults);
    console.log("News results:", searchResults.filter(r => r.type === "news"));
  }, [searchResults]);

  const handleReturn = () => {
    window.history.back();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSearchResults();
  };

  // 필터에 따른 검색 결과
  const newsResults = searchResults.filter(r => r.type === "news");
  const shortsResults = searchResults.filter(r => r.type === "shorts");
  const kidsResults = searchResults.filter(r => r.type === "kids");

  return (
    // 전체 화면 높이 + 세로 정렬
    <div className="flex flex-col h-screen">
      {/* 상단 영역 (검색창 + 필터) 고정 */}
      <div className="sticky top-0 z-10 bg-white">
        {/* 상단 내부 패딩/여백 */}
        <div className="p-4">
          {/* Header with back button and search input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
            <button type="button" className="p-2" onClick={handleReturn}>
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
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                disabled={!searchQuery.trim() || loading}
              >
                <LuSearch size={24} className="mr-2 mb-1" />
              </button>
            </div>
          </form>

          {/* Filter Buttons */}
          <div className="flex space-x-4 -mt-1 -mb-3 ml-15">
            <SearchFilterButtons
              selectedFilter={selectedFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {/* 가운데 영역: 검색 결과 리스트 */}
      <div className="flex-1 overflow-y-auto bg-white px-4 pb-18 scroll">
        {/* 회색 구분선 */}
        <hr className="border-b-3 border-gray-100 -mx-4 mb-2" />
        
        {/* 검색 결과 헤더 - 전체 필터에서만 표시 */}
        {selectedFilter === "전체" && (
          <>
            <h2 className="font-semibold text-2xl mb-2">검색 결과</h2>
            <hr className="border-b-3 border-gray-100 -mx-4 mb-3" />
          </>
        )}

        <div className="mt-5">
          {/* 전체 보기 */}
          {selectedFilter === "전체" && (
            <>
              {/* 뉴스 섹션 */}
              <NewsResults
                results={newsResults}
                isFilterView={false}
                onSeeMore={handleNewsSeeMore}
              />
              <hr className="border-b-5 border-gray-100 -mx-4 mb-4" />
              
              {/* Shorts 섹션 */}
              <ShortsResults
                results={shortsResults}
                isFilterView={false}
                onSeeMore={handleShortsSeeMore}
              />
              <hr className="border-b-5 border-gray-100 -mx-4 mb-4" />
              
              {/* 기자단 섹션 */}
              <KidsResults
                results={kidsResults}
                isFilterView={false}
                onSeeMore={handleKidsSeeMore}
              />
            </>
          )}

          {/* 뉴스만 */}
          {selectedFilter === "뉴스" && (
            <>
              <NewsResults
                results={newsResults}
                isFilterView={true}
              />
              <div ref={lastResultElementRef}></div>
              {loading && (
                <div className="text-center py-4 text-gray-500">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
                  <p className="mt-2 text-sm">불러오는 중...</p>
                </div>
              )}
            </>
          )}

          {/* shorts만 */}
          {selectedFilter === "shorts" && (
            <ShortsResults
              results={shortsResults}
              isFilterView={true}
            />
          )}

          {/* 기자단만 */}
          {selectedFilter === "기자단" && (
            <KidsResults
              results={kidsResults}
              isFilterView={true}
            />
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
}