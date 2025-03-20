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
    // ...
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
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">캐릭터 선택</h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => handleSelect(char.id)}
            className={`border rounded p-2
              ${
                selectedCharacter === char.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
          >
            <img src={char.img} alt={char.id} className="w-16 h-16 mx-auto" />
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
          뉴스 보러가기
        </button>
      </div>
    </div>
  );
}
