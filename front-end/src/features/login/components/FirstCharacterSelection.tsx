import React from "react";
import { LuChevronLeft } from "react-icons/lu";

interface BasicInfo {
  nickname: string;
  birthdate: string;
  school: string;
  gender: string;
}

interface FirstCharacterSelectionProps {
  basicInfo?: BasicInfo; // Optional BasicInfo prop
  selectedCharacter: string;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void;
  prevStep: () => void;
}

export default function FirstCharacterSelection({
  basicInfo, 
  selectedCharacter,
  setSelectedCharacter,
  nextStep,
  prevStep,
}: FirstCharacterSelectionProps) {
  const characters = [
    { id: "cole", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/cole.png" },
    { id: "doux", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/doux.png" },
    { id: "kira", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/kira.png" },
    { id: "kuro", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/kuro.png" },
    { id: "loki", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/loki.png" },
    { id: "mono", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/mono.png" },
    { id: "mort", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/mort.png" },
    { id: "nico", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" },
    { id: "olaf", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/olaf.png" },
    { id: "sena", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/sena.png" },
    { id: "tard", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/tard.png" },
    { id: "vita", img: "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/vita.png" },
  ];

  const handleSelect = (id: string) => {
    setSelectedCharacter(id);
  };

  const handleNext = () => {
    if (!selectedCharacter) {
      alert("캐릭터를 선택해주세요.");
      return;
    }
    nextStep();
  };

  return (
    <div className="w-full h-full">
      {/* 상대 포지셔닝을 위한 컨테이너 */}
      <div className="absolute inset-0 rounded-[15px] shadow-[0px_0px_20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden">
        {/* 배경 장식 요소 */}
        <div className="absolute top-0 left-0 right-0 h-43 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-60" />
        
        {/* 고정 헤더 부분 - 상단에 고정 */}
        <div className="relative z-10 px-6 pt-6 pb-3">
          {/* 뒤로가기 버튼과 페이지 인디케이터 */}
          <div className="flex items-center w-full mb-2">
            <button onClick={prevStep} className="p-1 rounded-full transition duration-200">
              <LuChevronLeft size={24} />
            </button>
            
            <div className="flex-grow flex justify-center -ml-6">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
                <div className="w-2 h-2 rounded-full bg-[#748BFF] animate-pulse" />
              </div>
            </div>
          </div>

          {/* 닉네임과 선택된 캐릭터 표시 */}
          <div className="flex flex-col items-center mt-1">
            <h2 className="text-3xl font-bold text-indigo-800">{basicInfo?.nickname || "닉네임"}</h2>
            
            <div className="mt-3 bg-white rounded-full p-1 shadow-md">
              {selectedCharacter ? (
                <div className="relative">
                  <img 
                    src={characters.find(c => c.id === selectedCharacter)?.img || "https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/kira.png"} 
                    alt="Selected character" 
                    className="w-24 h-24 rounded-full transition-all duration-300 hover:scale-105"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md">
                    ✓
                  </div>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">선택</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* 스크롤 영역 - 고정 헤더 아래 배치, 화면 끝까지 확장 */}
        <div className="relative z-10 flex-1 px-6 overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
          {/* 회색 구분선 */}
          <div className="w-full border-t border-gray-200 mb-3" />

          {/* 캐릭터 선택 타이틀 */}
          <div className="text-center mb-3">
            <p className="text-gray-500 text-md">마음에 드는 캐릭터를 골라보세요!</p>
          </div>

          {/* 캐릭터 선택 그리드 */}
          <div className="grid grid-cols-3 gap-4 justify-items-center mb-4">
            {characters.map((char) => (
              <button
                key={char.id}
                onClick={() => handleSelect(char.id)}
                className={`w-[85px] h-[85px] rounded-full flex items-center justify-center p-1 mb-2
                  ${selectedCharacter === char.id 
                    ? "ring-3 ring-blue-500 bg-blue-50 transform scale-105 shadow-lg transition-all duration-300" 
                    : "bg-white hover:bg-gray-50 shadow hover:shadow-md transition-all duration-200"}`}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={char.img}
                    alt={char.id}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* 다음 버튼 */}
          <div className="sticky bottom-4 mt-2 mb-4">
            <button
              onClick={selectedCharacter ? handleNext : undefined}
              disabled={!selectedCharacter}
              className={`w-full font-semibold text-lg py-3 rounded-lg transition-all duration-300 transform
                ${selectedCharacter 
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white cursor-pointer hover:from-indigo-600 hover:to-blue-600 hover:shadow-lg" 
                  : "bg-[#F5F6FA] text-[#BDBDBD] cursor-not-allowed"
                }`}
            >
              {selectedCharacter ? "뉴스 보러가기" : "뉴스 보러가기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}