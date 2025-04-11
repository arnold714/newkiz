import { ChangeEvent, useState } from "react";
import {SchoolSearchModal} from "@/widgets/login";
import { LuChevronLeft } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import "@shared/styles/CustomScroll.css"
import { BasicInfo } from "@/features/login";
import { showError } from "@/shared";

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
  const [birthdateObj, setBirthdateObj] = useState<Date | null>(
    basicInfo.birthdate ? new Date(basicInfo.birthdate) : null
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 학교 검색 모달 열기/닫기
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // 학교 선택 시, id/name/address를 모두 저장
  const handleSelectSchool = (
    schoolId: number,
    schoolName: string,
    schoolAddress: string
  ) => {
    setBasicInfo((prev) => ({
      ...prev,
      schoolId,
      schoolName,
      schoolAddress,
    }));
  };

  const handleNext = () => {
    if (!basicInfo.nickname) {
      showError("닉네임을 입력해주세요.");
      return;
    }
    if (!basicInfo.birthdate) {
      showError("생년월일을 입력해주세요.");
      return;
    }
    if (!basicInfo.schoolName) {
      showError("출신 학교를 선택해주세요.");
      return;
    }
    if (!basicInfo.gender) {
      showError("성별을 선택해주세요.");
      return;
    }
    nextStep();
  };

  return (
    <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-[15px] w-full h-full max-h-[90vh] flex flex-col relative">
      {/* 페이지 인디케이터를 추가 */}
      <div className="flex items-center w-full py-4 px-5 sticky top-0 bg-white rounded-t-[15px] z-10">
        {/* 뒤로가기 버튼 자리는 비워둠 (첫 페이지이므로) */}
        <div className="p-1 invisible">
          <LuChevronLeft size={24} />
        </div>
        
        {/* 페이지 인디케이터 (가운데 위치) */}
        <div className="flex-grow flex justify-center -ml-6">
          <div className="flex space-x-2">
            <div className="w-1 h-1 rounded-full bg-[#748BFF]" />
            <div className="w-1 h-1 rounded-full bg-[#D9D9D9]" />
            <div className="w-1 h-1 rounded-full bg-[#D9D9D9]" />
          </div>
        </div>
      </div>

      {/* 스크롤 가능한 컨텐츠 */}
      <div className="overflow-y-auto px-5 pb-6 flex-1 scroll">
        <h2 className="text-black font-bold text-4xl text-center mb-8 pt-2">기본 정보</h2>

        {/* 닉네임 */}
        <div className="mb-5">
          <label className="block text-[#1C1C1C] font-semibold text-lg mb-1">
            닉네임
          </label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            value={basicInfo.nickname}
            onChange={handleChange}
            className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-base"
          />
        </div>

        {/* 생년월일 */}
        <div className="mb-5">
          <label className="block text-[#1C1C1C] font-semibold text-lg mb-1">
            생년월일
          </label>
          <DatePicker
            selected={birthdateObj}
            onChange={(date: Date | null) => {
              setBirthdateObj(date);
              setBasicInfo((prev) => ({
                ...prev,
                birthdate: date ? date.toISOString().split("T")[0] : "",
              }));
            }}
            locale={ko}
            placeholderText="연도-월-일"
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="block w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-base"
            popperPlacement="bottom-start"
          />
        </div>

        {/* 출신 학교 */}
        <div className="mb-5">
          <label className="block text-[#1C1C1C] font-semibold text-lg mb-1 items-center justify-between">
            <span>출신 학교</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="schoolName"
              value={basicInfo.schoolName}
              readOnly
              placeholder="학교를 검색해주세요."
              className="w-full bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-md"
            />
            <button
              onClick={handleOpenModal}
              className="bg-[#4285F4] text-white px-3 py-2 rounded-lg text-md whitespace-nowrap"
            >
              학교 검색
            </button>
          </div>
        </div>

        {/* 성별 */}
        <div className="mb-8">
          <label className="block text-[#1C1C1C] font-semibold text-lg mb-1">
            성별
          </label>
          <div className="relative">
            <select
              name="gender"
              value={basicInfo.gender}
              onChange={handleChange}
              className="w-full appearance-none bg-[#FAFAFA] border border-[#EFEFEF] rounded-lg px-3 py-3 text-base"
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
          className="w-full bg-[#748BFF] text-white font-semibold py-3 mt-2 rounded-lg text-lg"
        >
          관심사 등록하러 가기
        </button>
      </div>

      {/* 학교 검색 모달 */}
      <SchoolSearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectSchool={(schoolId, name, address) =>
          handleSelectSchool(schoolId, name, address)
        }
      />
    </div>
  );
}