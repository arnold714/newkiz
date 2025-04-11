import { handleLogin } from "@/pages/login";
import "@shared/styles/CustomScroll.css"

export default function LoginPage() {
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

  const handleKakaoLogin = () => {
    handleLogin();
  };

  return (
    <div className="w-full h-screen overflow-y-auto bg-white scroll">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* 로고 */}
        <div className="text-center mb-10">
          <img
            src={`${imgUrl}assets/Logo.png`}
            alt="Logo"
            className="mx-auto w-auto"
          />
          <p className="text-gray-500 mt-2 text-lg font-bold">
            <span className="text-blue-500">세상</span>을 재미있게 배우자!
          </p>
        </div>

        {/* 뉴스 이미지 */}
        <img
          src={`${imgUrl}assets/news.png`}
          alt="News"
          className="w-full h-auto mb-10"
        />

        {/* 카카오 로그인 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleKakaoLogin}
            className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-6 py-3 shadow-md flex items-center gap-2 text-lg transition-colors duration-300"
          >
            <img
              src={`${imgUrl}assets/kakao.png`}
              alt="KakaoTalk Logo"
              className="w-6 h-6"
            />
            카카오톡으로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
