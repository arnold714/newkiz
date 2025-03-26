import React from "react";
import { LuChevronLeft } from "react-icons/lu";

interface FirstInterestSelectionProps {
  interests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
  nextStep: () => void;
  prevStep: () => void;
}

export default function FirstInterestSelection({
  interests,
  setInterests,
  nextStep,
  prevStep,
}: FirstInterestSelectionProps) {
  const possibleInterests = [
    { id: "경제", icon: "💰" },
    { id: "정치", icon: "📚" },
    { id: "사회", icon: "👪" },
    { id: "스포츠", icon: "🏆" },
    { id: "연예", icon: "🎬" },
    { id: "IT", icon: "💻" }
  ];

  const toggleInterest = (interest: string) => {
    // 최대 3개까지만 선택
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else if (interests.length < 3) {
      setInterests([...interests, interest]);
    }
  };

  const handleNext = () => {
    if (interests.length === 0) {
      alert("최소 1개 이상의 관심사를 선택해주세요.");
      return;
    }
    nextStep();
  };

  return (
    <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-[15px] w-full h-[610px] flex flex-col">
      <div className="py-6 px-6">
        {/* 뒤로가기 버튼과 페이지 인디케이터를 포함하는 row */}
        <div className="flex items-center w-full mb-2">
          {/* 뒤로가기 버튼 왼쪽에 고정 */}
          <button onClick={prevStep} className="p-1">
            <LuChevronLeft size={24} />
          </button>
          
          {/* 페이지 인디케이터 (가운데 위치) - 뒤로가기 버튼을 제외한 영역에서 가운데 정렬 */}
          <div className="flex-grow flex justify-center -ml-6">
            <div className="flex space-x-2">
              <div className="w-1 h-1 rounded-full bg-[#D9D9D9]" />
              <div className="w-1 h-1 rounded-full bg-[#748BFF]" />
              <div className="w-1 h-1 rounded-full bg-[#D9D9D9]" />
            </div>
          </div>
        </div>

        {/* 제목 */}
        <h2 className="text-4xl font-bold text-center mb-1">
          현재 가장 관심있는 분야가<br />무엇인가요?
        </h2>
      </div>

      {/* 관심사 선택 - 스크롤 영역 */}
      <div className="px-6 overflow-y-auto flex-1">
        <div className="space-y-3">
          {possibleInterests.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleInterest(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${
                interests.includes(item.id)
                  ? "bg-[#748BFF]/10 border-2 border-[#748BFF]"
                  : "bg-white border-2 border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-3 text-3xl">{item.icon}</span>
                <span className="font-medium text-xl">{item.id}</span>
              </div>
              {interests.includes(item.id) ? (
                <div className="w-6 h-6 rounded-full bg-[#748BFF] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6668 3.5L5.25016 9.91667L2.3335 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 다음 버튼 - 고정 위치 */}
      <div className="py-6 px-6">
        <button
          onClick={handleNext}
          className="w-full bg-[#748BFF] text-lg text-white font-semibold py-3 rounded-lg"
        >
          캐릭터 선택하러 가기
        </button>
      </div>
    </div>
  );
}