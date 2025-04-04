import React, { useEffect, useState } from "react";
import { getSchoolList } from "@/pages/login/api/SchoolApi";
import { LuSearch, LuX } from "react-icons/lu";
interface SchoolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSchool: (schoolName: string) => void;
}

export default function SchoolSearchModal({
  isOpen,
  onClose,
  onSelectSchool,
}: SchoolSearchModalProps) {
  // 검색어
  const [keyword, setKeyword] = useState("");
  // 검색 결과
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // 모달이 열릴 때 기본 검색 실행
    if (isOpen) {
      handleSearch();
    } else {
      // 모달이 닫힐 때는 기존 결과 초기화
      setSearchResults([]);
    }
  }, [isOpen]);

   // 실제 학교 목록 검색 수행
   const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const data = await getSchoolList(keyword);
      // API에서 받은 데이터 그대로 사용
      setSearchResults(data);
    } catch (error) {
      console.error("학교 목록 검색 에러:", error);
      setSearchResults([]);
    }
  };
  

  // 검색 버튼 클릭 시
  const handleSearchClick = () => {
    handleSearch();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 목록에서 항목 선택 시
  const handleSelect = (school: any) => {
    onSelectSchool(school.name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white w-[90%] max-w-[450px] h-[80%] rounded-lg shadow-xl p-4 sm:p-6 relative overflow-hidden flex flex-col">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <h2 className="text-xl font-bold text-gray-800">학교 검색</h2>
          {/* 닫기 버튼 */}
          <LuX
            onClick={onClose}
            className="rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
          />
        </div>

        {/* 검색 영역 */}
        <div className="flex mb-4 shadow-sm rounded-lg overflow-hidden border">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="학교 이름을 검색하세요"
            className="p-2 sm:p-3 flex-1 focus:outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 text-white px-3 sm:px-5 whitespace-nowrap hover:bg-blue-600 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            검색
          </button>
        </div>

        {/* 검색 결과 리스트 */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {searchResults.length === 0 ? (
            <div className="text-gray-500 text-center py-10 flex flex-col items-center">
              <LuSearch size={48} />
              {keyword.trim() ? "검색 결과가 없습니다." : "학교 이름을 검색해 주세요."}
            </div>
          ) : (
            <ul className="divide-y">
              {searchResults.map((school) => (
                <li
                  key={school.id}
                  className="py-3 hover:bg-gray-50 transition-colors px-2 cursor-pointer"
                  onClick={() => handleSelect(school)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{school.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {school.address}
                      </div>
                    </div>
                    <button className="bg-gray-100 text-sm px-3 py-1.5 rounded-full border text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors ml-2">
                      선택
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}