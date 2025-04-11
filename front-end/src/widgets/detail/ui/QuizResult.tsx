import { LuX, LuCircle } from "react-icons/lu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface QuizResultProps {
  isCorrect: boolean;
  explanation: string;
  onClose: () => void;
}

export const QuizResult = ({ isCorrect, onClose, explanation }: QuizResultProps) => {
  const [shouldReRender, setShouldReRender] = useState(false);
  const navigate = useNavigate();

  const isRedirectToWrongNote = () => {
    navigate('/mypage/wronganswer')
  };
  
  // 상태 변경 시 컴포넌트가 리렌더링되도록 처리
  useEffect(() => {
    if (shouldReRender) {
      setShouldReRender(false);
    }
  }, [shouldReRender]);

  const handleClose = () => {
    setShouldReRender(true); // 상태를 true로 설정하여 리렌더링 트리거
    onClose(); // 부모 컴포넌트에서 제공하는 onClose 함수 호출
  };

  return (
    <div>
      <div className="m-5">
        <div className="flex justify-center items-center mt-10">
          {isCorrect ? (
            <LuCircle size={180} className="stroke-[#748BFF] stroke-3" />
          ) : (
            <LuX size={180} className="stroke-[#EF4452] stroke-3" />
          )}
        </div>
        <p className="flex justify-center items-center mt-10 font-bold text-3xl">
          {isCorrect ? `정답입니다!` : "아쉬워요.. !"}
        </p>
        <p className="mt-5">해설: {explanation}</p>
      </div>

      {isCorrect ? (
        // 정답일 경우 뉴스로 돌아가기 버튼만 표시
        <div className="flex justify-center">
          <button
            className="bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
            onClick={handleClose}
          >
            뉴스로 돌아가기
          </button>
        </div>
      ) : (
        // 오답일 경우 오답노트로 가기와 뉴스로 돌아가기 버튼을 수평 배열
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 max-w-[250px] mx-auto">
          <button
            className="bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
            onClick={isRedirectToWrongNote}
          >
            오답노트로 가기
          </button>
          <button
            className="bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
            onClick={handleClose}
          >
            뉴스로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};
