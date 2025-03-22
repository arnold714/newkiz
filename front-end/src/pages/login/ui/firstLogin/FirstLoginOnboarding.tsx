import React, { useState } from "react";
import FirstLoginInfo from "./FirstLoginInfo";
import FirstInterestSelection from "./FirstInterestSelection";
import FirstCharacterSelection from "./FirstCharacterSelection";
import FinalConfirm from "./FinalConfirm";

export default function OnboardingContainer() {
  const [step, setStep] = useState(1);

  // 예시: 각 단계에서 입력받은 값들을 상위에서 관리
  const [basicInfo, setBasicInfo] = useState({ nickname: "", birthdate: "", school: "", gender: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>("");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <FirstLoginInfo
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <FirstInterestSelection
            interests={interests}
            setInterests={setInterests}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <FirstCharacterSelection
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <FinalConfirm
            basicInfo={basicInfo}
            interests={interests}
            selectedCharacter={selectedCharacter}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#FFFFFF]">
      {/* 페이지 인디케이터 */}
      <div className="mb-4">
        <div className="flex space-x-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-1 h-1 rounded-full ${
                step === num ? "bg-[#748BFF]" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 스텝 렌더링 */}
      {renderStep()}
    </div>
  );
}