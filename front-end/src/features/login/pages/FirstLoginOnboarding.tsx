import React, { useState } from "react";
import FirstLoginInfo from "@/features/login/components/FirstLoginInfo";
import FirstInterestSelection from "@/features/login/components/FirstInterestSelection";
import FirstCharacterSelection from "@/features/login/components/FirstCharacterSelection";
import FinalConfirm from "@/features/login/components/FinalConfirm";

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

  // Style for full viewport background
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  // Style for content container (max 600px)
  const contentStyle = {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto'
  };

  return (
    // Use inline styles for critical layout to avoid any CSS conflicts
    <div style={containerStyle}>
      <div style={contentStyle}>
        {renderStep()}
      </div>
    </div>
  );
}