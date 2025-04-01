import { useState } from "react";
import FirstLoginInfo from "@/widgets/login/ui/FirstLoginInfo";
import FirstInterestSelection from "@/widgets/login/ui/FirstInterestSelection";
import FirstCharacterSelection from "@/widgets/login/ui/FirstCharacterSelection";
import FinalConfirm from "@/widgets/login/ui/FinalConfirm";

export default function FirstLoginOnboarding() {
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
            basicInfo={basicInfo}
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
            selectedCharacter={selectedCharacter}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[600px] mx-auto">
        {renderStep()}
      </div>
    </div>
  );
}