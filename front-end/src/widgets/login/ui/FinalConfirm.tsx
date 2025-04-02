import "@shared/styles/CustomScroll.css"

interface BasicInfo {
  nickname: string;
  birthdate: string;
  school: string;
  gender: string;
}

interface FinalConfirmProps {
  basicInfo: BasicInfo;
  selectedCharacter: string;
}

export default function FinalConfirm({
  basicInfo,
  selectedCharacter,
}: FinalConfirmProps) {
  const handleConfirm = () => {
    window.location.href = "/"; 
  };

  // 캐릭터 이미지 경로 가져오기
  const getCharacterImage = () => {
    return `https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/${selectedCharacter}.png`;
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
              <img 
                src={getCharacterImage()} 
                alt="Selected character" 
                className="w-28 h-28 mx-auto rounded-full"
              />
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