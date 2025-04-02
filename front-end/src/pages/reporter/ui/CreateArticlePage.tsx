import { useState } from "react";
import { LuX } from "react-icons/lu";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-160px)] px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        {/* 닫기 버튼 (오른쪽 상단) */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black transition">
          <LuX size={24} />
        </button>

        {/* 상단 닉네임 및 타이틀 */}
        <div className="flex items-center mb-5">
          <img
            src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png"
            alt="character"
            className="w-10 h-10 mr-2"
          />
          <p className="font-bold text-lg">
            sin승아님의 <span className="text-black">기사를 작성해보세요!</span>
          </p>
        </div>

        {/* 제목 입력 */}
        <div className="mb-4">
          <label className="block font-bold mb-1">제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#F4F4F8] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* 기사 내용 */}
        <div className="mb-5">
          <label className="block font-bold mb-1">기사 작성</label>
          <textarea
            placeholder="내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full bg-[#F4F4F8] border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* 버튼 */}
        <button className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold text-sm rounded-full w-[120px] h-[36px] ml-auto flex items-center justify-center">
          표지 생성하기
        </button>
      </div>
    </div>
  );
}
