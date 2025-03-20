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

  // 선택된 학교가 있을 경우 basicInfo.school에 저장
  const handleSelectSchool = (schoolName: string) => {
    setBasicInfo((prev) => ({ ...prev, school: schoolName }));
  };

  const handleNext = () => {
    // 유효성 검사 후
    nextStep();
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-[300px]">
      <h2 className="text-xl font-bold mb-4">기본 정보</h2>

      {/* 닉네임 */}
      <label className="block mb-2">
        닉네임
        <input
          type="text"
          name="nickname"
          placeholder="닉네임을 입력해주세요"
          value={basicInfo.nickname}
          onChange={handleChange}
          className="border w-full px-2 py-1 rounded mt-1"
        />
      </label>

      {/* 생년월일 */}
      <label className="block mb-2">
        생년월일
        <input
          type="date"
          name="birthdate"
          value={basicInfo.birthdate}
          onChange={handleChange}
          className="border w-full px-2 py-1 rounded mt-1"
        />
      </label>

      {/* 출신 학교 */}
      <label className="block mb-2">
        출신 학교
        <div className="flex">
          <input
            type="text"
            name="school"
            value={basicInfo.school}
            onChange={handleChange}
            className="border w-full px-2 py-1 rounded mt-1 mr-1"
            placeholder="학교를 검색해주세요."
            readOnly
          />
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-1"
          >
            학교 검색
          </button>
        </div>
      </label>

      {/* 성별 */}
      <label className="block mb-4">
        성별
        <select
          name="gender"
          value={basicInfo.gender}
          onChange={handleChange}
          className="border w-full px-2 py-1 rounded mt-1"
        >
          <option value="">선택하세요</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </select>
      </label>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4 border-2 border-dotted border-purple-300"
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
