import React from "react";
import { handleLogin, checkUserExists } from "../api/LoginApi";

export default function LoginPage() {
  const handleKakaoLogin = async () => {
    await handleLogin(); // 카카오 인증 진행
    const kakaoToken = "카카오에서 받은 토큰"; // 실제 토큰 값을 받아옴
    const userExists = await checkUserExists(kakaoToken);

    if (!userExists) {
      window.location.href = "/signup"; // 회원가입 페이지로 이동
    } else {
      window.location.href = "/home"; // 메인 페이지로 이동
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white relative">
      {/* 로고 */}
      <div className="text-center h-[270px]">
        <img
          src="/Logo.png"
          alt="Logo"
          className="mx-auto w-auto h12"/>
        <p className="text-gray-500 mt-2 text-lg font-bold">
          <span className="text-blue-500">세상</span>을 재미있게 배우자!
        </p>
      </div>

      {/* 뉴스 이미지 */}
      <img src="/news.png" alt="News" className="w-40 h-auto my-8" />

      {/* 카카오톡 로그인 버튼 */}
      <button
        onClick={handleKakaoLogin}
        className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-6 py-3 shadow-md flex items-center gap-2 text-lg transition-colors duration-300"
      >
        <img src="/kakao.png" alt="KakaoTalk Logo" className="w-6 h-6" />
        카카오톡으로 시작하기
      </button>
    </div>
  );
}
