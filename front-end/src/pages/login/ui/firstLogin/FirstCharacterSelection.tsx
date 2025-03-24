import React from "react";

interface BasicInfo {
  nickname: string;
  birthdate: string;
  school: string;
  gender: string;
}

interface StepCharactersProps {
  basicInfo?: BasicInfo; // Optional BasicInfo prop
  selectedCharacter: string;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void;
  prevStep: () => void;
  // 인디케이터에 표시할 스텝 정보도 추가할 수 있지만, 고정값으로 구현
}

export default function StepCharacters({
  basicInfo, // Include basicInfo in destructuring
  selectedCharacter,
  setSelectedCharacter,
  nextStep,
  prevStep,
}: StepCharactersProps) {
  const characters = [
    { id: "char1", img: "/images/char1.png" },
    { id: "char2", img: "/images/char2.png" },
    { id: "char3", img: "/images/char3.png" },
    { id: "char4", img: "/images/char4.png" },
    { id: "char5", img: "/images/char5.png" },
    { id: "char6", img: "/images/char6.png" },
    { id: "char7", img: "/images/char7.png" },
    { id: "char8", img: "/images/char8.png" },
    { id: "char9", img: "/images/char9.png" },
    { id: "char10", img: "/images/char10.png" },
    { id: "char11", img: "/images/char11.png" },
    { id: "char12", img: "/images/char12.png" },
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
    <div className="rounded-[15px] w-full h-full overflow-hidden relative mx-auto shadow-[0px_0px_20px_rgba(0,0,0,0.15)]">
      {/* 컨텐츠 */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* 뒤로가기 버튼과 페이지 인디케이터를 포함하는 row */}
        <div className="flex items-center w-full mb-2">
          {/* 뒤로가기 버튼 왼쪽에 고정 */}
          <button onClick={prevStep} className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* 페이지 인디케이터 (가운데 위치) - 뒤로가기 버튼을 제외한 영역에서 가운데 정렬 */}
          <div className="flex-grow flex justify-center -ml-6">
            <div className="flex space-x-2">
              <div className="w-1 h-1 rounded-full bg-[#D9D9D9]" />
              <div className="w-1 h-1 rounded-full bg-[#D9D9D9]" />
              <div className="w-1 h-1 rounded-full bg-[#748BFF]" />
            </div>
          </div>
        </div>

        {/* 닉네임과 선택된 캐릭터 표시 */}
        <div className="flex flex-col items-center mt-2 mb-3">
          <h2 className="text-xl font-bold">{basicInfo?.nickname || "닉네임"}</h2>
          <div className="mt-2">
            {selectedCharacter ? (
              <img 
                src={characters.find(c => c.id === selectedCharacter)?.img || "/images/char1.png"} 
                alt="Selected character" 
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <img src="/images/char1.png" alt="Default character" className="w-20 h-20 rounded-full" />
            )}
          </div>
        </div>

        {/* 캐릭터 선택 그리드 */}
        <div className="grid grid-cols-3 gap-4 mt-2 mb-6">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => handleSelect(char.id)}
              className={`w-[80px] h-[80px] rounded-full flex items-center justify-center p-1
                ${selectedCharacter === char.id ? "ring-2 ring-blue-500 bg-white/90" : "bg-white/90"}`}
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
        <div className="mt-auto mb-4">
          <button
            onClick={selectedCharacter ? handleNext : undefined}
            disabled={!selectedCharacter}
            className={`w-full font-semibold py-3 rounded-lg ${
              selectedCharacter 
                ? "bg-[#748BFF] text-white cursor-pointer" 
                : "bg-[#F5F6FA] text-[#BDBDBD] cursor-not-allowed"
            }`}
          >
            뉴스 보러가기
          </button>
        </div>
      </div>
    </div>
  );
}