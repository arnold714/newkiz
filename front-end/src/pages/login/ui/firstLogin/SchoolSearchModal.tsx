import React, { useEffect, useState } from "react";
import { searchPlaces } from "../../api/KakaoApi";

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

  // 실제 검색 수행
  const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const data = await searchPlaces(keyword);
      setSearchResults(data);
    } catch (error) {
      console.error("카카오맵 검색 에러:", error);
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
  const handleSelect = (place: any) => {
    // place.place_name, place.road_address_name 등
    onSelectSchool(place.place_name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[80%] max-w-[400px] h-[80%] rounded p-4 relative overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          X
        </button>

        {/* 검색 영역 */}
        <div className="flex mb-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border p-2 flex-1 rounded-l"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            검색
          </button>
        </div>

        {/* 검색 결과 리스트 */}
        {searchResults.length === 0 ? (
          <div className="text-gray-500">검색 결과가 없습니다.</div>
        ) : (
          <ul>
            {searchResults.map((place) => (
              <li
                key={place.id}
                className="border-b py-2 flex justify-between items-center cursor-pointer"
                onClick={() => handleSelect(place)}
              >
                <div>
                  <div className="font-bold">{place.place_name}</div>
                  <div className="text-sm text-gray-600">
                    {place.road_address_name || place.address_name}
                  </div>
                </div>
                <button className="bg-gray-100 text-sm px-2 py-1 rounded border">
                  선택
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
