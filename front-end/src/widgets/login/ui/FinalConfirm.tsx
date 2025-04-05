import "@shared/styles/CustomScroll.css"
import { BasicInfo, MyPageRequest } from "@/features/login/model/types";
import { interestMap } from "@/features/login";
import { postFirstLogin } from "@/widgets/login";

interface FinalConfirmProps {
  basicInfo: BasicInfo;
  interests: string[];
  selectedCharacter: string;
}

export default function FinalConfirm({
  basicInfo,
  interests,
  selectedCharacter,
}: FinalConfirmProps) {
  const getCharacterImage = () => {
    return `https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/${selectedCharacter}.png`;
  };

  const handleConfirm = async () => {
    try {
      // gender 변환
      const mappedGender =
        basicInfo.gender === "male" ? "MALE" : "FEMALE";

      // 관심사 한글 → 영문
      const mappedInterests = interests.map(
        (i) => interestMap[i] || i.toUpperCase()
      );

      const requestData: MyPageRequest = {
        profile: {
          nickname: basicInfo.nickname,
          birthday: basicInfo.birthdate,
          school: {
            id: basicInfo.schoolId || null,
            name: basicInfo.schoolName,
            address: basicInfo.schoolAddress,
          },
          gender: mappedGender,
          // 캐릭터 필드가 백엔드에 생기면 추가
          // characterId: selectedCharacter,
        },
        interests: mappedInterests,
      };

      await postFirstLogin(requestData);
      alert("정보가 성공적으로 등록되었습니다!");

      // 등록 완료 후 메인 페이지 등으로 이동
      window.location.href = "/";
    } catch (error) {
      console.error("정보 등록 실패:", error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] rounded-[15px] w-full max-h-[90vh] overflow-y-auto scroll">
      {/* 그라데이션 배경과 텍스트를 포함하는 상단 영역 */}
      <div className="relative w-full">
        {/* 배경 장식 요소 - 상단 파스텔 무지개 그라데이션 */}
        <div className="w-full h-32 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-60" />
        
        {/* 배경 위에 텍스트 배치 */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <h2 className="text-4xl font-bold text-indigo-800">
            안녕하세요 {basicInfo.nickname}님
          </h2>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="px-6 py-6 flex flex-col items-center">
        <div className="text-center w-full mb-8">
          <p className="text-2xl">
            우리 함께 <span className="text-blue-500 font-semibold">세상</span>을 알아봐요
          </p>
        </div>

        <div className="mb-10 text-center">
          <div className="bg-gradient-to-b from-blue-50 to-purple-50 p-6 rounded-xl shadow-md">
            <div className="bg-white rounded-full p-3 shadow-md inline-block">
            {selectedCharacter ? (
                <img
                  src={getCharacterImage()}
                  alt="Selected character"
                  className="w-28 h-28 mx-auto rounded-full"
                />
              ) : (
                <div className="w-28 h-28 mx-auto rounded-full bg-gray-200" />
              )}
            </div>
            <p className="mt-4 text-indigo-600 font-semibold">{basicInfo.nickname}</p>
          </div>
        </div>

        <div className="w-full px-4 mb-6">
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-lg text-white py-3 rounded-lg font-semibold shadow-md transition-all duration-300 hover:from-indigo-600 hover:to-blue-600 hover:shadow-lg transform hover:-translate-y-1"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}