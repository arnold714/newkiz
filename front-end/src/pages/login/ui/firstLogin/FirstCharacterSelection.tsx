import React from "react";

interface StepCharactersProps {
  selectedCharacter: string;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<string>>;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepCharacters({
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
    <div className="w-11/12 max-w-sm h-11/12 rounded-xl overflow-hidden relative mx-auto shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-[15px]">
      {/* 배경 이미지 */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ 
          backgroundImage: "url(https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {/* 작은 픽셀 배경 요소들은 배경 이미지에 포함되어 있다고 가정 */}
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10 h-full flex flex-col p-6">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center">
          <button onClick={prevStep} className="p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* 캐릭터 이름과 선택된 캐릭터 표시 */}
        <div className="flex flex-col items-center mt-2 mb-3">
          <h2 className="text-xl font-bold">닉네임</h2>
          <div className="mt-2">
            {selectedCharacter ? (
              <img 
                src={characters.find(c => c.id === selectedCharacter)?.img || "/images/char1.png"} 
                alt="Selected character" 
                className="w-20 h-20"
              />
            ) : (
              <img src="/images/char1.png" alt="Default character" className="w-20 h-20" />
            )}
          </div>
        </div>

        {/* 캐릭터 선택 그리드 */}
        <div className="grid grid-cols-3 gap-4 mt-2 mb-6">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => handleSelect(char.id)}
              className={`w-[80px] h-[80px] rounded-full bg-white/90 flex items-center justify-center p-1
                ${selectedCharacter === char.id ? "ring-2 ring-blue-500" : ""}`}
            >
              <img src={char.img} alt={char.id} className="w-14 h-14" />
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