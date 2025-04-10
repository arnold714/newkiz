import { useState, useEffect } from "react";
import { LuX } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { showError, showSuccess, useUserProfile } from "@/shared";
import { createArticle, updateArticle } from "@/pages/reporter";
import "@shared/styles/CustomScroll.css"

export default function ArticlePreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userProfile = useUserProfile();
  const { isEdit, articleId, title, content, imageFile } = location.state || {};
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);

      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    }
  }, [imageFile]);

  const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

  const reporterImgUrl = userProfile && userProfile.characterId 
  ? `${imgUrl}dinos/${userProfile.characterId}.png`
  : `${imgUrl}dinos/nico.png`;

  const handleBack = () => window.history.back();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", userProfile ? userProfile.nickname : "anonymous");
    if (imageFile) {
      formData.append("image", imageFile);
    }
  
    if (!isEdit) {
      // 신규 작성 - POST 요청
      const result = await createArticle(formData);
      if (result.success) {
        showSuccess("새 기사가 등록되었습니다!");
        navigate("/reporter");
      } else {
        showError("기사 등록 실패");
      }
    } else {
      // 수정 모드 - 기존 기사 ID를 활용한 PATCH 요청
      if (!articleId) {
        showError("수정 대상 기사가 없습니다.");
        return;
      }
      const result = await updateArticle(articleId, formData);
      if (result.success) {
        showSuccess("기사 수정이 완료되었습니다!");
        navigate("/reporter");
      } else {
        showError("기사 수정 실패");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-130px)] px-4 py-5 flex justify-center items-start md:items-center scroll pb-25">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative mt-10 min-h-[70vh] flex flex-col justify-between">
        {/* 닫기 버튼 */}
        <button
          onClick={handleBack}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <LuX size={24} />
        </button>

        {/* 상단 안내 문구 */}
        <div className="flex items-center mt-3 mb-5">
          <img
            src={reporterImgUrl}
            alt="character"
            className="w-10 h-12 mr-2"
          />
          <p className="font-bold text-lg leading-tight">
            작성된 기사를 확인해보세요! <br />
            이제 {isEdit ? "기사를 수정" : "기사를 등록"}해볼까요?
          </p>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col justify-start">
          {/* 대표 이미지 */}
          <div className="flex-1 min-h-[250px] bg-gray-200 rounded-xl flex items-center justify-center mb-5">
            {imagePreview ? (
              <img src={imagePreview} alt="uploaded preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500">업로드된 이미지가 없습니다.</span>
            )}
          </div>

          {/* 기사 요약 */}
          <p className="text-md font-semibold leading-tight mb-3">
            {title}
          </p>


          {/* 기자 정보 */}
          <div className="flex justify-end items-center gap-1 mb-5">
            <img
              src={reporterImgUrl}
              alt="profile"
              className="w-5 h-5"
            />
            <p className="text-sm text-gray-600">{userProfile ? userProfile.nickname : "anonymous"} 기자</p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold text-md rounded-full w-[120px] h-[36px]"
          >
            {isEdit ? "기사 수정하기" : "기사 등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
