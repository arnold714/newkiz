import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaCheckCircle } from "react-icons/fa";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "@shared/styles/CustomScroll.css";
import { SelectCharacterModal } from "@/widgets/mypage";
import { fetchMyPage, updateMyPage } from "@/pages/mypage";
import { interestMap, interestMapReverse } from "@/features/mypage"
import { SchoolSearchModal } from "@/widgets/login";

Modal.setAppElement("#root")

export const ModifyInfoPage = () => {
  const [isCharacterMoalOpen, setIsCharacterMoalOpen] = useState<boolean>(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState<boolean>(false);

  const navigate = useNavigate()
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // 사용자 정보
  const [nickname, setNickname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [gender, setGender] = useState("남자"); // "남자" | "여자" 로 구분

  const interests = ["경제", "정치", "사회", "스포츠/연예", "세계", "문화"]

   // 마이페이지 조회 API 호출
   useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyPage();
        if (data.success) {
          const { profile, interests } = data.data;
          setNickname(profile.nickname);
          setBirthday(profile.birthday);
          setSchoolName(profile.school.name);
          setGender(profile.gender === "MALE" ? "남자" : "여자");

          // 서버의 대문자 interests를 UI 한글로 매핑
          const mappedInterests = interests
            .map((item) => interestMapReverse[item] || item)
            .filter(Boolean);
          setSelectedInterests(mappedInterests);
        }
      } catch (error) {
        console.error("마이페이지 조회 실패:", error);
      }
    })();
  }, []);

  // 관심사 토글 함수
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prev) => prev.filter((item) => item !== interest));
    } else {
      setSelectedInterests((prev) => [...prev, interest]);
    }
  };

  // 저장하기 (PATCH) 요청
  const handleSave = async () => {
    try {
      // UI 한글 관심사 → 서버 전송용 대문자 관심사
      const uppercaseInterests = selectedInterests.map((item) => {
        return interestMap[item] || item.toUpperCase();
      });

      const patchData = {
        nickname,
        birthday,
        schoolName,
        // UI의 "남자"/"여자"를 API에 맞게 "MALE"/"FEMALE"로 변환
        gender: gender === "남자" ? "MALE" : "FEMALE",
        interests: uppercaseInterests,
      };

      await updateMyPage(patchData);
      alert("수정이 완료되었습니다.");
      navigate(-1);
    } catch (error) {
      console.error("마이페이지 수정 실패:", error);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col mt-5">
      <div className="flex flex-row justify-start items-center gap-3">
        <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
        <p className="font-bold text-xl">내 정보</p>
      </div>
      <div className="flex flex-col items-center w-full gap-3">
        <div className="flex flex-row justify-center my-5 cursor-pointer" onClick={()=>{setIsCharacterMoalOpen(true)}}>
          <img src={`${imgUrl}dinos/nico.png`} alt="user character image" className="h-20" />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">닉네임</p>
          <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" value={nickname}
            onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">생년월일</p>
          <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" value={birthday}
            onChange={(e) => setBirthday(e.target.value)} />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">출신 학교</p>
          <div className="flex gap-2">
            <input
              type="text"
              className="border-1 border-gray-200 w-full h-10 rounded-lg px-3"
              value={schoolName}
              readOnly
              placeholder="학교를 검색해주세요."
            />
            <button
              onClick={() => setIsSchoolModalOpen(true)}
              className="bg-[#4285F4] text-white px-3 py-2 rounded-lg text-md whitespace-nowrap"
            >
              학교 검색
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">성별</p>
          <select
            className="border border-gray-200 w-full h-10 rounded-lg px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#7CBA36] focus:border-transparent"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
        </div>
      </div>
      <hr className="border-2 border-gray-100 w-full my-5" />
      <div className="flex flex-col items-start w-full px-3 gap-2">
        <p className="font-semibold">관심사</p>
        <div className="grid grid-cols-2 gap-3 w-full">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`w-full h-10 rounded-lg border flex justify-between items-center px-3 ${
                selectedInterests.includes(interest)
                  ? "border-3 border-[#7CBA36] text-black bg-white"
                  : "border-3 border-gray-200 text-black bg-white"
              }`}
            >
              {interest}
              {selectedInterests.includes(interest) ? (
                <FaCheckCircle className="text-[#7CBA36]" />
              ) : (
                <FaCheckCircle className="text-gray-400" />
              )}
            </button>
          ))}
        </div>
      </div>
      <hr className="border-2 border-gray-100 w-full my-5" />
      <div className="flex flex-row justify-center items-center">
        <button
          className="flex justify-center items-center bg-[#7CBA36] py-3 rounded-lg w-full text-white font-semibold text-lg"
          onClick={handleSave}
        >
          저장하기
        </button>
      </div>
      <Modal isOpen={isCharacterMoalOpen} onRequestClose={() => setIsCharacterMoalOpen(false)} className="modal ranking-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
        <SelectCharacterModal closeModal={() => setIsCharacterMoalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isSchoolModalOpen}
        onRequestClose={() => setIsSchoolModalOpen(false)}
        className="relative bg-white w-[90%] max-w-[450px] h-[80%] rounded-lg shadow-xl p-4 sm:p-6 m-auto"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
      >
        <SchoolSearchModal
          isOpen={isSchoolModalOpen}
          onClose={() => setIsSchoolModalOpen(false)}
          onSelectSchool={(schoolId, name, address) => {
            setSchoolName(name);
            setIsSchoolModalOpen(false);
          }}
        />
      </Modal>
    </div>
  )
}
