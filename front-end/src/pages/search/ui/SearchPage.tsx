import { useState, useEffect } from "react";
import { LuSearch, LuChevronLeft, LuX } from "react-icons/lu";
import { fetchRecentSearches, deleteSearchHistory } from "@/pages/search";
import { RecentSearchItem } from "@/features/search";
import { useNavigate } from "react-router-dom";
import "@shared/styles/CustomScroll.css"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleRecentSearchClick = (keyword: string) => {
    navigate(`/search/${encodeURIComponent(keyword)}`);
    setSearchQuery("");
  };

  // 최근 검색어 불러오기
  const loadRecentSearches = async () => {
    setLoading(true);
    try {
      const res = await fetchRecentSearches();
      if (res.success) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.searchedAt).getTime() - new Date(a.searchedAt).getTime()
        );
        const recent = sorted.slice(0, 5);
        setRecentSearches(recent);
      } else {
        setError("최근 검색어를 불러오지 못했습니다.");
      }
    } catch (err) {
      console.error("최근 검색어 로드 에러:", err);
      setError("최근 검색어 불러오기 오류");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentSearches();
  }, []);

  // 삭제 API 호출 및 화면 갱신
  const handleDeleteSearch = async (searchId: string) => {
    try {
      const res = await deleteSearchHistory(searchId);
      if (res.success) {
        loadRecentSearches();
      } else {
        console.error("삭제 실패:", res.error);
      }
    } catch (err) {
      console.error("검색 기록 삭제 에러:", err);
    }
  };

  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col h-screen pb-15">
      {/* 고정 헤더 부분 */}
      <div className="flex-none p-2 pt-6">
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
              onKeyDown={handleKeyPress}
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
      </div>

      {/* 스크롤 가능한 컨텐츠 부분 */}
      <div className="flex-1 overflow-y-auto p-4 scroll">
        {/* 회색 구분선 */}
        <hr className="border-b-5 border-gray-100 -mx-4 mb-6" />

        {/* Recent Searches */}
        <div className="space-y-2 mb-6">
          <h2 className="font-semibold text-xl mb-5">최근 검색어</h2>
          {recentSearches.map((search) => (
            <div key={search.id} className="flex justify-between items-center mb-5 ml-8">
              <div className="flex items-center space-x-2 cursor-pointer"
                   onClick={() => handleRecentSearchClick(search.keyword)}>
                <LuSearch className="text-gray-400 mr-5" size={22} />
                <span className="text-gray-600 text-xl">{search.keyword}</span>
              </div>
              <LuX
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
                size={20}
                onClick={() => handleDeleteSearch(search.id)} 
              />
            </div>
          ))}
        </div>

        {/* 회색 구분선 */}
        <hr className="border-b-5 border-gray-100 -mx-4 mb-6" />
      </div>
    </div>
  );
}
