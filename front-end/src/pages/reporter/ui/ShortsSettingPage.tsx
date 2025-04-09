import { useLocation, useNavigate } from 'react-router-dom';
import { LuX } from 'react-icons/lu';
import { useState } from 'react';

const ShortsSettingPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { videoFile, videoUrl } = state || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = () => {
    // 제목/설명 작성 후 서버 업로드 처리
    console.log("업로드 실행", videoFile, title, description);
  };

  const handleClose = () => navigate(-1);

  return (
    <div className="min-h-[calc(100vh-130px)] px-4 py-5 flex justify-center items-start scroll pb-24">
      <div className="w-full max-w-md h-full">
        <div className="bg-white rounded-xl shadow-lg p-6 relative flex flex-col min-h-[550px] mt-10">
          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
          >
            <LuX size={24} />
          </button>

          {/* 상단 안내 문구 - 고정 위치 */}
          <div className="flex items-center mt-3 mb-6">
            <img
              src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png"
              alt="character"
              className="w-6 h-6 mr-2"
            />
            <p className="font-semibold text-xl">
              등록하려는 영상을 소개해주세요!
            </p>
          </div>

          {/* 입력 폼 영역 */}
          <div className="flex flex-col h-full">
            {/* 제목 입력 영역 */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">제목 (필수 항목)</label>
              <input 
                type="text" 
                className="w-full border px-3 py-2 rounded-md bg-[#F4F4F8]" 
                placeholder="제목을 입력해주세요" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 설명 입력 영역 - 확장 가능 */}
            <div className="flex-1 mb-4">
              <label className="block text-sm font-semibold mb-1">설명</label>
              <textarea 
                className="w-full h-[calc(100%-25px)] min-h-[150px] border px-3 py-2 rounded-md bg-[#F4F4F8] resize-none" 
                placeholder="영상에 대해 설명해주세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            {/* 하단 고정 영역 */}
            <div className="mt-auto">
              {/* 영상 미리보기 */}
              {videoUrl && (
                <div className="mb-4">
                  <div className="rounded-md overflow-hidden bg-black">
                    <video src={videoUrl} controls className="w-full h-48" />
                  </div>
                </div>
              )}

              {/* 등록 버튼 */}
              <button 
                onClick={handleSubmit} 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortsSettingPage;