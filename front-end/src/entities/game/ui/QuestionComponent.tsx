import React, { useEffect, useState } from "react";
import { QuestionProps } from "../model/type";
import { FaRegCircle } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

export const QuestionComponent: React.FC<QuestionProps> = ({ questionNo, question, timeLeft, quizResult }) => {
  const [time, setTime] = useState<number|undefined>(timeLeft);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setTime(timeLeft);
    setShowAnswer(false);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setShowAnswer(true);
          clearInterval(timer);
          return 0;
        }
        return (prevTime! - 1);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionNo]);

  return (
    <div className="flex flex-col items-center h-full w-full bg-white bg-opacity-50 rounded-xl p-6 relative px-4 z-999">
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-black text-2xl font-bold">
        {
          !showAnswer && <>남은 시간: {time}</>
        }
      </div>
      <div className="text-center">
          <p className="text-3xl font-bold text-[#7CBA36]">Q{questionNo}.</p>
        <p className="mt-4 text-xl font-semibold">{question}</p>
      </div>
      {showAnswer && quizResult && (
        <div className="flex flex-col mt-6 text-center">
          <div className="flex flex-row justify-center items-center gap-2">
            <p className="text-lg font-semibold">정답은</p>
            {quizResult.answer ? (<FaRegCircle className="text-3xl text-blue-600" strokeWidth={10} />):(<IoClose className="text-3xl text-red-600" strokeWidth={10} />)}
          </div>
          <p className="text-lg font-semibold text-gray-600">{quizResult?.explanation}</p>
        </div>
      )}
    </div>
  );
};
