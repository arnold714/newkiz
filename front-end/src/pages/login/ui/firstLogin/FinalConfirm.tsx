import React from "react";

interface BasicInfo {
  nickname: string;
  birthdate: string;
  school: string;
  gender: string;
}

interface StepConfirmProps {
  basicInfo: BasicInfo;
  interests: string[];
  selectedCharacter: string;
  prevStep: () => void;
}

export default function StepConfirm({
  basicInfo,
  interests,
  selectedCharacter,
  prevStep,
}: StepConfirmProps) {
  const handleConfirm = () => {
    // 여기서 서버에 가입완료 요청을 보내거나, 상태를 저장하고
    // 메인 페이지로 이동
    window.location.href = "/"; // 
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">정보가 맞는지 확인해주세요!</h2>

      <div className="mb-2">
        <span className="font-medium">닉네임:</span> {basicInfo.nickname}
      </div>
      <div className="mb-2">
        <span className="font-medium">생년월일:</span> {basicInfo.birthdate}
      </div>
      <div className="mb-2">
        <span className="font-medium">출신 학교:</span> {basicInfo.school}
      </div>
      <div className="mb-2">
        <span className="font-medium">성별:</span> {basicInfo.gender}
      </div>
      <div className="mb-2">
        <span className="font-medium">관심사:</span> {interests.join(", ")}
      </div>
      <div className="mb-4">
        <span className="font-medium">캐릭터:</span> {selectedCharacter}
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
        >
          이전
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
}
