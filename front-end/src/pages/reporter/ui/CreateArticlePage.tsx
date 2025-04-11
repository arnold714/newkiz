import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuX } from "react-icons/lu";
import { useUserProfile } from "@/shared";
import "@shared/styles/CustomScroll.css";

export default function CreateArticlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userProfile = useUserProfile();
  // 쿼리 파라미터 및 state에서 수정 모드 및 articleId를 가져옵니다.
  const searchParams = new URLSearchParams(location.search);
  const isEdit = searchParams.get("edit") === "1";
  const articleId = searchParams.get("id");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL;
  const userImageUrl = userProfile && userProfile.characterId 
  ? `${imgUrl}dinos/${userProfile.characterId}.png`
  : `${imgUrl}dinos/nico.png`;

  useEffect(() => {
    if (isEdit && articleId) {
      const article = location.state; // ReporterNews에서 state로 전달된 article 정보
      setTitle(article.title);
      setContent(article.content);
      // 이미지 파일을 수정하려면 다시 업로드해야 하므로 이미지 링크로만 표시할 수도 있음
    }
  }, [isEdit, articleId, location.state]);

  const handleReturn = () => window.history.back();

  const handleGenerate = () => {
    navigate("/reporter/preview", {
      state: { 
        isEdit,
        articleId,
        title,
        content,
        imageFile
      },
    });
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

          <div className="flex items-center mt-3 mb-5">
            <p className="font-bold text-xl">{isEdit ? "기사 수정하기" : "기사 작성하기"}</p>
          </div>

          {/* 상단 타이틀 */}
          <div className="flex items-center mt-3 mb-5">
            <img
              src={userImageUrl}
              alt="character"
              className="w-10 h-12 mr-2"
            />
            <p className="font-bold text-xl">
              {userProfile ? `${userProfile.nickname}님` : "사용자님"}의 <span className="text-black">기사를 작성해보세요!</span>
            </p>
          </div>

          <div className="mb-5">
            <label className="block font-bold mb-1 text-lg">제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F4F4F8] border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col flex-1 mb-5">
              <label className="block font-bold mb-1 text-lg">기사 작성</label>
              <textarea
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full flex-1 h-full bg-[#F4F4F8] border border-gray-300 rounded-lg px-4 py-2 resize-none"
              />
            </div>

            <div className="mb-5">
              <label className="block font-bold mb-1 text-lg">대표 이미지 업로드</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleGenerate}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-md rounded-full w-[120px] h-[36px]"
              >
                {isEdit ? "기사 수정하기" : "기사 등록하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}