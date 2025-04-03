import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPlus, LuCamera, LuX } from 'react-icons/lu';

const ShortsUploadPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sourceType, setSourceType] = useState<"file" | "camera" | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(file);
      setVideoUrl(url);
      setSourceType("file");

      // ✅ 파일 등록 시 자동 이동
      navigate("/reporter/setting", {
        state: {
          videoFile: file,
          videoUrl: url,
        },
      });
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setSourceType("camera");

    // ✅ 임시 녹화 예시
    const dummyVideoFile = new File(["dummy"], "camera-video.mp4", {
      type: "video/mp4",
    });
    const url = URL.createObjectURL(dummyVideoFile);

    setVideoFile(dummyVideoFile);
    setVideoUrl(url);
  };

  const handleUpload = () => {
    if (videoFile) {
      navigate("/reporter/setting", {
        state: {
          videoFile,
          videoUrl,
        },
      });
    }
  };

  const handleClose = () => navigate(-1);

  return (
    <div className="min-h-[calc(100vh-130px)] px-4 py-5 flex justify-center items-start scroll pb-24">
      <div className="w-full max-w-md h-full">
        <div className="bg-white rounded-xl shadow-lg p-6 relative flex flex-col h-[70vh] mt-10">
          
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
              <span className="text-black">sin숭이님</span>의 영상을 올려볼까요?
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col justify-between">
              {/* 영상 등록 버튼 */}
              <div className="flex-1 mb-6">
                <button
                  onClick={() => document.getElementById('video-upload')?.click()}
                  className="w-full h-full bg-[#F9F9F9] border border-gray-300 rounded-lg flex flex-col items-center justify-center"
                >
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="mb-2">
                    <LuPlus size={40} className="text-gray-600" />
                  </div>
                  <span className="text-xl text-gray-800 text-center">
                    영상 등록하기
                  </span>
                </button>
              </div>

              {/* 영상 촬영 버튼 */}
              <div className="flex-1 mb-6">
                <button
                  onClick={handleStartRecording}
                  className="w-full h-full bg-[#F9F9F9] border border-gray-300 rounded-lg flex flex-col items-center justify-center"
                >
                  <div className="mb-2">
                    <LuCamera size={40} className="text-black" />
                  </div>
                  <span className="text-xl text-gray-900 text-center">
                    영상 촬영하기
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 영상 미리보기 */}
          <div className="mb-4">
            {videoUrl && (
              <div className="mt-4">
                <video className="w-full rounded-md" controls>
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            )}

            {isRecording && (
              <p className="mt-3 text-center text-red-500 text-sm">녹화 중입니다...</p>
            )}
          </div>

          {/* 업로드 버튼 (촬영한 경우에만) */}
          <div className="flex-none">
            {videoFile && sourceType === "camera" && (
              <button
                onClick={handleUpload}
                className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
              >
                업로드
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortsUploadPage;
