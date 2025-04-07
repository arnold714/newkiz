import { LuX } from "react-icons/lu";
import { useEffect, useState } from "react";
import { QuizData } from "@/features/detail/model/types";
import { QuizResult } from "./QuizResult";
import { GetNewsQuiz } from "../api/DetailApi";
import Swal from "sweetalert2";  

interface QuizModalProps {
  closeModal: () => void;
  id?: string;
}

export const QuizModal = ({ closeModal, id }: QuizModalProps) => {
  const [newsQuizData, setNewsQuizData] = useState<QuizData|null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  useEffect(() => {
    if (!id) {
      setErrorMessage("올바른 뉴스 id가 제공되지 않았습니다.");
      return;
    }
    GetNewsQuiz(id)
    .then((data) => {
      if(data) {
        setNewsQuizData(data);
      }
    })
    .catch((error) => {
      console.log('퀴즈 불러오기 실패:', error);
    });
  },[id]);
  if (errorMessage) return <div>Error: {errorMessage}</div>;
  if (!newsQuizData) return <div>Loading...</div>;
  // 답 클릭
  const handleChoiceClick = (choiceId: number) => {
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
  const isCorrect = selectedChoice === newsQuizData?.quiz.multipleChoiceQuiz.options.indexOf(newsQuizData?.quiz.multipleChoiceQuiz.answer);
  
  return (
    <div>
      {!isAnswerSubmitted ? (
        <div>
          <div className="flex justify-end">
            <LuX size={30} onClick={() => closeModal()} />
          </div>
          <div className="m-5">
            <p>퀴즈 | 다음 문제를 읽고 답을 고르시오.</p>
            {newsQuizData ? (
              <>
                <h2 className="text-3xl font-bold">{newsQuizData.quiz.multipleChoiceQuiz.question}</h2>
                <div className="flex flex-col justify-start items-start">
                  {newsQuizData.quiz.multipleChoiceQuiz.options.map((choice, index) => (
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
        <QuizResult isCorrect={isCorrect} onClose={closeModal} />
      )}
    </div>
  );
};