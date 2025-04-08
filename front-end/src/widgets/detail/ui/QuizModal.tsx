import { LuX } from "react-icons/lu";
import {  useState } from "react";
import { QuizData } from "@/features/detail/model/types";
import { QuizResult } from "./QuizResult";
import { PostNewsQuiz } from "../api/DetailApi";
import Swal from "sweetalert2";  

interface QuizModalProps {
  closeModal: () => void;
  id?: string;
  quizData: QuizData | null; 
}

export const QuizModal = ({ closeModal, id, quizData }: QuizModalProps) => {
  

  // 내가 선택한 답
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  //제출 여부 관리
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean | null>(false);



  // 답 클릭
  const handleChoiceClick = (choiceId: number) => {
    setSelectedChoice(choiceId)
  }; 
  if (!quizData) return <div>퀴즈 데이터를 불러오는 중...</div>;

  const correctAnswerIndex = quizData.quiz.multipleChoiceQuiz.options.indexOf(
    quizData.quiz.multipleChoiceQuiz.answer
  );
  const isCorrect = selectedChoice === correctAnswerIndex;
  //제출
  const handleSubmit = async () => {
    if (selectedChoice === null) {
      Swal.fire({
        icon: "warning",
        title: "답을 선택해 주세요!",
        text: "제출 전에 답을 선택해야 합니다.",
        confirmButtonText: "확인",
      });
    } else {
      try {
        // PostNewsQuiz API 호출
        const response = await PostNewsQuiz(id as string, isCorrect);
        if (response) {
          setIsAnswerSubmitted(true);
        }
      } catch (error) {
        console.log("퀴즈 제출 실패:", error);
      }
    }
  };

  return (
    <div>
      {!isAnswerSubmitted ? (
        <div>
          <div className="flex justify-end">
            <LuX size={30} onClick={() => closeModal()} />
          </div>
          <div className="m-5">
            <p>퀴즈 | 다음 문제를 읽고 답을 고르시오.</p>
            {quizData ? (
              <>
                <h2 className="text-3xl font-bold">{quizData.quiz.multipleChoiceQuiz.question}</h2>
                <div className="flex flex-col justify-start items-start">
                  {quizData.quiz.multipleChoiceQuiz.options.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleChoiceClick(index)}
                      className={`min-w-[200px] w-auto font-bold text-2xl rounded-lg mt-3 p-2 hover:scale-105 hover:bg-[#7CBA36] hover:text-white text-left ${
                        selectedChoice === index
                          ? " text-[#202020]  border-[#BDBDBD] border-2  shadow-[4px_4px_5px_2px_rgba(0,0,0,0.1)] "
                          : "bg-white text-[#202020]"
                      }`}
                    >
                      {index + 1}. {choice}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div>퀴즈 데이터를 불러오는 중...</div>
            )}
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
        <QuizResult isCorrect={isCorrect} explanation={quizData.quiz.multipleChoiceQuiz.explanation} onClose={closeModal} />
      )}
    </div>
  );
};