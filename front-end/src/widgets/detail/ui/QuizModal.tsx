import { useDispatch } from "react-redux";
import { LuX } from "react-icons/lu";
import { quizModal } from "@/features/detail"; // 올바른 경로로 import 확인
import { useState } from "react";
import { QuizData } from "@/features/detail/types";
import { QuizResult } from "./QuizResult";
import Swal from "sweetalert2";  

export const QuizModal = () => {
  const dispatch = useDispatch();
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const handleXClick = () => {
    dispatch(quizModal()); 
  };
  //일단 퀴즈 데이터 하드 코딩
  const quizData: QuizData = {
    id: 1,
    question: "대한민국의 수도는 어디인가?",
    correct_choice_id: 2,
    choices: [
      { id: 1, number: 1, content: "부산" },
      { id: 2, number: 2, content: "서울" },
      { id: 3, number: 3, content: "대구" },
      { id: 4, number: 4, content: "인천" },
    ],
  };
  
  // 답 클릭
  const handleChoiceClick = (choiceId) => {
    setSelectedChoice(choiceId)
  };

  //제출
  const handleSubmit = () => {
    if (selectedChoice === null) {
      Swal.fire({
      icon: "warning",
      title: "답을 선택해 주세요!",
      text: "제출 전에 답을 선택해야 합니다.",
      confirmButtonText: "확인",
      });
    } else {
      setIsAnswerSubmitted(true);
    }
  };

  //정답확인 
  const isCorrect = selectedChoice === quizData.correct_choice_id;
  
  return (
    <div>
      {!isAnswerSubmitted ? (
        <div>
          <div className="flex justify-end">
            <LuX size={30} onClick={handleXClick} />
          </div>
          <div className="m-5">
            <p>퀴즈 | 다음 문제를 읽고 답을 고르시오.</p>
            <h2 className="text-3xl font-bold">{quizData.question}</h2>
            <div className="flex flex-col justify-center items-center">
              {quizData.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice.id)}
                  className={`min-w-[200px] w-auto font-bold text-2xl border-[#BDBDBD] rounded-lg shadow-[4px_4px_5px_2px_rgba(0,0,0,0.1)] mt-5 p-3 hover:scale-105 hover:bg-[#7CBA36] hover:text-white ${
                    selectedChoice === choice.id 
                      ? "bg-[#7CBA36] text-white" 
                      : "bg-white text-[#202020]"
                  }`}
                >
                  {choice.id}. {choice.content}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                className="mt-[30px] h-[60px] w-[200px] text-3xl text-white font-bold bg-[#B6D88F] hover:bg-[#7CBA36] rounded-lg hover:scale-105 transition duration-300"
                onClick={handleSubmit}
              >
                제출
              </button>
            </div>
          </div>
        </div>
      ) : (
        // QuizResult 모달 표시
        <QuizResult isCorrect={isCorrect} onClose={handleXClick} />
      )}
    </div>
  );
};
