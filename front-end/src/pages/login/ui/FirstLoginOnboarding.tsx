import { useState } from "react";
import { FirstLoginInfo, FirstInterestSelection, FirstCharacterSelection, FinalConfirm } from "@/widgets/login";
import { BasicInfo } from "@/features/login";

export default function FirstLoginOnboarding() {
  const [step, setStep] = useState(1);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    nickname: "",
    birthdate: "",
    schoolId: null,
    schoolName: "",
    schoolAddress: "",
    gender: "",
  });
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
            interests={interests}
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