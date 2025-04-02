import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuX } from "react-icons/lu";
import "@shared/styles/CustomScroll.css";

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleReturn = () => {
    window.history.back();
  };
  const handleGenerate = () => {
    navigate("/reporter/preview");
  };

  return (
    <div className="min-h-[calc(100vh-130px)] px-4 overflow-y-auto scroll pb-17">
      <div className="flex flex-col justify-center min-h-full py-10">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto relative min-h-[70vh] flex flex-col">
          {/* 닫기 버튼 */}
          <button
            onClick={handleReturn}
            className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
          >
            <LuX size={24} />
          </button>

          {/* 상단 타이틀 */}
          <div className="flex items-center mt-3 mb-5">
            <img
              src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png"
              alt="character"
              className="w-10 h-12 mr-2"
            />
            <p className="font-bold text-xl">
              sin승아님의 <span className="text-black">기사를 작성해보세요!</span>
            </p>
          </div>

          {/* 제목 입력 */}
          <div className="mb-5">
            <label className="block font-bold mb-1 text-lg">제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F4F4F8] border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* 본문 영역 + 버튼을 아래로 밀어넣기 위한 flex-1 block */}
          <div className="flex-1 flex flex-col justify-between">
            {/* 기사 작성 */}
            <div className="flex flex-col flex-1 mb-5">
              <label className="block font-bold mb-1 text-lg">기사 작성</label>
              <textarea
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full flex-1 h-full bg-[#F4F4F8] border border-gray-300 rounded-lg px-4 py-2 resize-none
                  focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[160px]"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold text-md rounded-full w-[120px] h-[36px] flex items-center justify-center"
              >
                표지 생성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
