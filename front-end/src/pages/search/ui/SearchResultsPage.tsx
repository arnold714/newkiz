import { useState, useEffect, useCallback, useRef } from "react";
import { LuSearch, LuChevronLeft } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { NewsResults } from "@/widgets/search/ui/NewsResults";
import "@shared/styles/CustomScroll.css"
import { fetchSearchResults } from "@/pages/search";
import { NewsItem, SearchResponse } from "@/features/search";

export default function SearchResultsPage() {
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();

  // 1) 입력 중인 검색어와 실제 검색어를 분리
  const [typedQuery, setTypedQuery] = useState<string>(keyword || ""); 
  const [searchTerm, setSearchTerm] = useState<string>(keyword || ""); 
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [newsResults, setNewsResults] = useState<NewsItem[]>([]);
  
  // 무한 스크롤을 위한 ref
  const observer = useRef<IntersectionObserver | null>(null);

  const lastResultElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchResults(); // 스크롤이 끝에 도달하면 추가 데이터 요청
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, cursor]
  );

  useEffect(() => {
    if (!searchTerm) return;
    // 매번 새 검색 시, 이전 결과 초기화하기
    setNewsResults([]);
    setCursor(null);
    setHasMore(true);

    // 새 검색어로 결과 불러오기
    fetchInitialResults(searchTerm);
  }, [searchTerm]);

  const fetchInitialResults = async (term: string) => {
    setLoading(true);
    try {
      const params = { keyword: term };
      const response: SearchResponse = await fetchSearchResults(params);
      if (response.success) {
        const sortedList = response.data.newsList.sort(
          (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
        );
        setNewsResults(sortedList);
        setCursor(response.data.cursor);
        setHasMore(!!response.data.cursor);
      } else {
        console.error("검색 결과 불러오기 실패:", response.error);
      }
    } catch (error) {
      console.error("검색 결과 API 호출 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 무한 스크롤 시 추가 데이터 fetch
  const fetchResults = async () => {
    if (!cursor) return;
    setLoading(true);
    try {
      const params = { keyword: searchTerm, cursor };
      const response: SearchResponse = await fetchSearchResults(params);
      if (response.success) {
        // 중복 뉴스 제거
        let newData = response.data.newsList.filter(
          (newItem) => !newsResults.some((item) => item.id === newItem.id)
        );
        newData = newData.sort(
          (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
        );
        setNewsResults((prev) => {
          const merged = [...prev, ...newData];
          merged.sort(
            (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
          );
          return merged;
        });
        setCursor(response.data.cursor);
        setHasMore(!!response.data.cursor);
      } else {
        console.error("추가 검색 실패:", response.error);
      }
    } catch (error) {
      console.error("추가 검색 API 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 뒤로가기
  const handleReturn = () => {
    window.history.back();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalQuery = typedQuery.trim();
    if (!finalQuery) return;

    // SearchPage.tsx에서와 마찬가지로, navigate할 때만 '최근 검색어'에 저장하도록 처리하는 방법
    // => 서버에 최근 검색어 저장 로직이 있다면, 여기에 맞춰서 호출하거나 navigate 뒤에 API 콜
    setSearchTerm(finalQuery);
    navigate(`/search/${encodeURIComponent(finalQuery)}`);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 영역 (검색창) */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="p-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
            <button type="button" className="p-2" onClick={handleReturn}>
              <LuChevronLeft size={25} />
            </button>
            <div className="relative flex-1 ml-2">
              <input
                type="text"
                className="w-full p-3 pr-12 rounded-[25px] border border-gray-300 text-xl text-gray-600 placeholder-gray-400"
                placeholder="검색어를 입력하세요"
                value={typedQuery}
                onChange={(e) => setTypedQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <LuSearch size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 검색 결과 영역 */}
      <div className="flex-1 overflow-y-auto bg-white px-4 pb-18 scroll">
        <hr className="border-b-3 border-gray-100 -mx-4 mb-2" />
        <h2 className="font-semibold text-2xl mb-2">검색 결과</h2>

        <NewsResults results={newsResults} />

        <div ref={lastResultElementRef}></div>
        {loading && (
          <div className="text-center py-4 text-gray-500">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-sm">불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}