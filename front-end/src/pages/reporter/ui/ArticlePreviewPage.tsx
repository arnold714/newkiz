import { LuX } from "react-icons/lu";

export default function ArticlePreviewPage() {
  const handleBack = () => window.history.back();

  return (
    <div className="min-h-[calc(100vh-130px)] px-4 py-3 flex justify-center items-start scroll pb-25">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative min-h-[530px]">
        {/* 닫기 버튼 */}
        <button
          onClick={handleBack}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <LuX size={24} />
        </button>

        {/* 상단 안내 문구 */}
        <div className="flex items-center mb-5 mt-3">
          <img
            src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png"
            alt="character"
            className="w-10 h-12 mr-2"
          />
          <p className="font-bold text-lg leading-tight">
            생성된 표지를 확인해보세요! <br />
            이제 기사를 등록해볼까요?
          </p>
        </div>

        {/* 대표 이미지 영역 */}
        <div className="w-full h-[270px] bg-gray-200 rounded-xl flex items-center justify-center mb-5">
          <span className="text-gray-500">생성된 대표 이미지 영역</span>
        </div>

        {/* 기사 요약 */}
        <p className="text-md font-semibold leading-tight mb-1">
          ‘대충격’ ‘20분 퇴장’ 이토, 김민재 스피드 압도해 완벽 대체 가능” 日 언론… 20분 출전에 …
        </p>

        {/* 기자 이름 */}
        <div className="flex justify-end items-center gap-1 mt-2">
          <img
            src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png"
            alt="profile"
            className="w-5 h-5"
          />
          <p className="text-sm text-gray-600">sin숭이 기자</p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 mt-6 justify-end">
          <button className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold text-md rounded-full w-[120px] h-[36px] flex items-center justify-center">
            기사 등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
