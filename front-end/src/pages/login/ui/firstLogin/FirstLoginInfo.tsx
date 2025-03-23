import React, { ChangeEvent, useState } from "react";
import SchoolSearchModal from "./SchoolSearchModal";

interface BasicInfo {
  nickname: string;
  birthdate: string;
  school: string;
  gender: string;
}

interface FirstLoginInfoProps {
  basicInfo: BasicInfo;
  setBasicInfo: React.Dispatch<React.SetStateAction<BasicInfo>>;
  nextStep: () => void;
}

export default function FirstLoginInfo({
  basicInfo,
  setBasicInfo,
  nextStep,
}: FirstLoginInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectSchool = (schoolName: string) => {
    setBasicInfo((prev) => ({ ...prev, school: schoolName }));
  };

  const handleNext = () => {
    // 유효성 검사 후
    nextStep();
  };

  return (
    <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-[15px] w-[300px] h-[560px] py-8 px-5">
      <h2 className="text-black font-bold text-2xl text-center mb-8">기본 정보</h2>

      {/* 닉네임 */}
      <div className="mb-5">
        <label className="block text-[#1C1C1C] font-semibold text-sm mb-1">
          닉네임
        </label>
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={basicInfo.nickname}
          onChange={handleChange}
          className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-sm"
        />
      </div>

      {/* 생년월일 */}
      <div className="mb-5">
        <label className="block text-[#1C1C1C] font-semibold text-sm mb-1">
          생년월일
        </label>
        <input
          type="date" 
          name="birthdate"
          placeholder="연도-월-일"
          value={basicInfo.birthdate}
          onChange={handleChange}
          className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-sm"
        />
      </div>

      {/* 출신 학교 */}
      <div className="mb-5">
        <label className="block text-[#1C1C1C] font-semibold text-sm mb-1 flex items-center justify-between">
          <span>출신 학교</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="school"
            value={basicInfo.school}
            readOnly
            placeholder="학교를 검색해주세요."
            className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-sm"
          />
          <button
            onClick={handleOpenModal}
            className="bg-[#4285F4] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap"
          >
            학교 검색
          </button>
        </div>
      </div>

      {/* 성별 */}
      <div className="mb-8">
        <label className="block text-[#1C1C1C] font-semibold text-sm mb-1">
          성별
        </label>
        <div className="relative">
          <select
            name="gender"
            value={basicInfo.gender}
            onChange={handleChange}
            className="w-full appearance-none bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-sm"
          >
            <option value="">선택해주세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="w-full bg-[#748BFF] text-white font-semibold py-4 mt-2 rounded-lg"
      >
        관심사 등록하러 가기
      </button>

      {/* 학교 검색 모달 */}
      <SchoolSearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectSchool={handleSelectSchool}
      />
    </div>
  );
}