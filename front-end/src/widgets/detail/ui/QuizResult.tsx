import { LuX, LuCircle } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

interface QuizResultProps {
  isCorrect: boolean;
  explanation: string;
  onClose: () => void;
  onQuizResultUpdate?: () => void; 
}

export const QuizResult = ({ isCorrect, onClose, explanation, onQuizResultUpdate  }: QuizResultProps) => {
 
  const navigate = useNavigate();

  const isRedirectToWrongNote = () => {
    navigate('/mypage/wronganswer')
  };
  
  // 상태 변경 시 컴포넌트가 리렌더링되도록 처리
  const handleClose = () => {
    onClose(); // 부모 컴포넌트에서 제공하는 onClose 함수 호출
    if (onQuizResultUpdate) {
      onQuizResultUpdate(); // 부모 컴포넌트에 퀴즈 결과 업데이트 알림
    }
  };

  return (
    <div>
      <div className="mx-5 mb-5">
        <div className="flex justify-center items-center">
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
