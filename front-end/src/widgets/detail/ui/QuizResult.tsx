import { LuX, LuCircle } from "react-icons/lu";

interface QuizResultProps {
  isCorrect: boolean;
  explanation:string;
  onClose: () => void;

}

export const QuizResult = ({ isCorrect, onClose, explanation }: QuizResultProps) => {
  
  
  return (
    <div>
      <div className="flex justify-end">
        <LuX size={30} onClick={onClose} />
      </div>
      <div className="m-5">
        <div className="flex justify-center items-center mt-10">
          {isCorrect ? (
            <LuCircle
              size={180}
              className="stroke-[#748BFF] stroke-3"
            />
          ) : (
            <LuX
              size={180}
              className="stroke-[#EF4452] stroke-3"
            />
          )}
        </div>
        <p className="flex justify-center items-center mt-10 font-bold text-3xl">
          {isCorrect ? `정답입니다!` : "아쉬워요.. !"}
        </p>
        <p>{explanation}</p>
      </div>
      
      {isCorrect ? (
        // 정답일 경우 뉴스로 돌아가기 버튼만 표시
        <div className="flex justify-center">
          <button
            className="bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
            onClick={onClose}
          >
            뉴스로 돌아가기
          </button>
        </div>
      ) : (
        // 오답일 경우 오답노트로 가기와 뉴스로 돌아가기 버튼을 수평 배열
        <div className="flex justify-center space-x-4">
          <button
            className="bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
            onClick={onWrongNote}
          >
            오답노트로 가기
          </button>
          <button
            className="bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
            onClick={onClose}
          >
            뉴스로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};