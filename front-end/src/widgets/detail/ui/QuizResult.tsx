import { LuX, LuCircle } from "react-icons/lu";

export const QuizResult = ({ isCorrect, onClose }) => {
   

  return (
    <div>
      <div className="flex justify-end">
        <LuX size={30} onClick={onClose} />
      </div>
      <div className="m-5">
        <div className="flex justify-center item-center mt-10">
          {isCorrect ? <LuCircle 
                        size={200}
                        className="stroke-[#748BFF] stroke-3"
                        /> : 
                        <LuX
                        size={200}
                        className="stroke-[#EF4452] stroke-3"
                        />}
        </div>
        <p className="flex justify-center item-center mt-10 font-bold text-3xl">
        {isCorrect ? "축하합니다 정답을 맞히셨습니다!" : "아쉬워요.. !"}
        </p>
      </div>
      <div className='flex justify-center'>
            <button className='bg-[#7CBA36] min-w-[200px] h-[60px] rounded-[10px] text-white font-semibold text-2xl shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
              onClick={onClose}
            >
              뉴스로 돌아가기
            </button>
          </div>
    </div>
  );  
};