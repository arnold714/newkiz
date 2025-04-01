import { handleLogin } from "@/pages/login/api/LoginApi";

export default function LoginPage() {
  const handleKakaoLogin = () => {
    handleLogin(); // 카카오 로그인 페이지로 리다이렉트
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white relative">
      {/* 로고 */}
      <div className="text-center h-[250px]">
        <img
          src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/Logo.png"
          alt="Logo"
          className="mx-auto w-auto"/>
        <p className="text-gray-500 mt-2 text-lg font-bold">
          <span className="text-blue-500">세상</span>을 재미있게 배우자!
        </p>
      </div>

      {/* 뉴스 이미지 */}
      <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/news.png" alt="News" className="w-70 h-auto mb-15" />

      {/* 카카오톡 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-6 py-3 shadow-md flex items-center gap-2 text-lg transition-colors duration-300"
      >
        <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/kakao.png" alt="KakaoTalk Logo" className="w-6 h-6" />
        카카오톡으로 시작하기
      </button>
    </div>
  );
}
