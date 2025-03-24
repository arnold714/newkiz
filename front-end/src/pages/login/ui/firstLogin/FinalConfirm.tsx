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
    window.location.href = "/"; 
  };

  // 캐릭터 이미지 경로 가져오기
  const getCharacterImage = () => {
    return `/images/${selectedCharacter}.png`;
  };

  return (
    <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-[15px] w-full h-[610px] flex flex-col justify-center ">
      <div className="text-center w-full flex flex-col items-center gap-2 mb-6">
        <h2 className="text-xl font-bold">
          안녕하세요 {basicInfo.nickname}님
        </h2>
        <p className="text-lg">
          우리 함께 <span className="text-blue-500">세상</span>을 알아봐요
        </p>
      </div>

      <div className="mb-6 text-center">
        <p className="text-gray-600">{basicInfo.nickname}</p>
        <img 
          src={getCharacterImage()} 
          alt="Selected character" 
          className="w-20 h-20 mx-auto mt-2"
        />
      </div>

      <div className="py-8 px-6">
        <button
          onClick={handleConfirm}
          className="w-full bg-[#748BFF] text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  );
}