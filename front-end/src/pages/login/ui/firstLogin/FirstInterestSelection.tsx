import React from "react";

interface StepInterestsProps {
  interests: string[];
  setInterests: React.Dispatch<React.SetStateAction<string[]>>;
  nextStep: () => void;
  prevStep: () => void;
}

export default function StepInterests({
  interests,
  setInterests,
  nextStep,
  prevStep,
}: StepInterestsProps) {
  const possibleInterests = ["경제", "정치", "사회", "스포츠", "연예", "IT"];

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
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">관심사 선택</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {possibleInterests.map((item) => (
          <button
            key={item}
            onClick={() => toggleInterest(item)}
            className={`px-4 py-2 rounded-full border
              ${
                interests.includes(item)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          캐릭터 선택하러 가기
        </button>
      </div>
    </div>
  );
}
