import { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaCheckCircle } from "react-icons/fa";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "@shared/styles/CustomScroll.css";
import { SelectCharacterModal } from "@/widgets/mypage";
import { fetchMyPage, updateMyPage } from "@/pages/mypage";
import { interestMap, interestMapReverse } from "@/features/mypage"
import { SchoolSearchModal } from "@/widgets/login";

Modal.setAppElement("#root")

export const ModifyInfoPage = () => {
  const [isCharacterMoalOpen, setIsCharacterModalOpen] = useState<boolean>(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["userProfile"]);

  const navigate = useNavigate()
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

   // 표시용 상태 (읽기 전용)
   const [birthday, setBirthday] = useState<string>("");
   const [gender, setGender] = useState<string>("");   
  // 사용자 정보 상태
  const [nickname, setNickname] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState<number>(0); 
  const [difficulty, setDifficulty] = useState<number>(2); 
  const [characterId, setCharacterId] = useState<string>("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = ["경제", "정치", "사회", "스포츠", "세계", "생활/문화", "IT/과학"];

   // 마이페이지 조회 API 호출
   useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyPage();
        if (data.success) {
          const { profile, interests } = data.data;

          // 읽기 전용: birthday, gender
          setBirthday(profile.birthday); 
          setGender(profile.gender === "MALE" ? "남자" : "여자");

          // 수정 가능: nickname, school, difficulty, characterId, interests
          setNickname(profile.nickname);
          setSchoolName(profile.school.name);
          setSchoolId(profile.school.id);
          setDifficulty(profile.difficulty);
          setCharacterId(profile.characterId || "");

          // 관심사 대문자 -> 한글
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

  // 관심사 토글
  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleDifficultyClick = (level: number) => {
    setDifficulty(level);
  };

  const handleSave = async () => {
    try {
      const uppercaseInterests = selectedInterests.map(
        (item) => interestMap[item] || item.toUpperCase()
      );

      // PATCH 요청에 보낼 객체 (read-only 값은 제외)
      const patchData = {
        nickname,
        school: schoolId, 
        difficulty,
        characterId,
        interests: uppercaseInterests,
      };

      await updateMyPage(patchData);
      alert("수정이 완료되었습니다.");

      // 기존 쿠키에서 프로필 정보를 읽고, 변경된 값들을 병합
      let existingProfile: any = {};
      if (cookies.userProfile) {
        existingProfile =
          typeof cookies.userProfile === "string"
            ? JSON.parse(cookies.userProfile)
            : cookies.userProfile;
      }
      // updatedProfile 수정 가능한 필드는 새 값으로 업데이트
      const updatedProfile = {
        ...existingProfile,
        nickname,
        school: { id: schoolId, name: schoolName, address: existingProfile.school?.address || "" },
        difficulty,
        characterId,
        interests: uppercaseInterests,
      };

      // 쿠키 업데이트 (7일 유효)
      setCookie("userProfile", JSON.stringify(updatedProfile), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

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
        <div className="flex flex-row justify-center my-5 cursor-pointer" onClick={()=>{setIsCharacterModalOpen(true)}}>
        <img src={`${imgUrl}dinos/${characterId}.png`} alt="user character image" className="h-20" />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">닉네임</p>
          <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" value={nickname}
            onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">생년월일</p>
          <input type="text" readOnly className="border-1 border-gray-200 w-full h-10 rounded-lg px-3 bg-gray-100 text-gray-600" value={birthday} />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">출신 학교</p>
          <div className="flex gap-2">
            <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" value={schoolName} readOnly placeholder="학교를 검색해주세요." />
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
          <input type="text" readOnly className="border-1 border-gray-200 w-full h-10 rounded-lg px-3 bg-gray-100 text-gray-600" value={gender} />
        </div>
        <div className="flex flex-col items-start w-full px-3 gap-2">
          <p className="font-semibold">난이도</p>
          <div className="flex items-center gap-2">
            {/* 하(1), 중(2), 상(3) */}
            <button
              className={`px-4 py-2 rounded-md ${difficulty === 1 ? "bg-[#7CBA36] text-white" : "bg-gray-200"}`}
              onClick={() => handleDifficultyClick(1)}
            >
              하
            </button>
            <button
              className={`px-4 py-2 rounded-md ${difficulty === 2 ? "bg-[#7CBA36] text-white" : "bg-gray-200"}`}
              onClick={() => handleDifficultyClick(2)}
            >
              중
            </button>
            <button
              className={`px-4 py-2 rounded-md ${difficulty === 3 ? "bg-[#7CBA36] text-white" : "bg-gray-200"}`}
              onClick={() => handleDifficultyClick(3)}
            >
              상
            </button>
          </div>
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
      <Modal isOpen={isCharacterMoalOpen} onRequestClose={() => setIsCharacterModalOpen(false)} className="modal ranking-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
      <SelectCharacterModal
          closeModal={() => setIsCharacterModalOpen(false)}
          currentCharacter={characterId}
          onSelectCharacter={(newChar) => {
            setCharacterId(newChar);
            setIsCharacterModalOpen(false);
          }}
        />
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
          onSelectSchool={(id, name, _address) => {
            setSchoolId(id);
            setSchoolName(name);
            setIsSchoolModalOpen(false);
          }}
        />
      </Modal>
    </div>
  )
}
