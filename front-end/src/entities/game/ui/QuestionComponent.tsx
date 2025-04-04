import { QuestionProps } from "../model/type"
import { useEffect, useState } from "react"
import { FaRegCircle } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

export const QuestionComponent = ({ questionNo, question, timeLeft, quizResult }: QuestionProps) => {
  const [time, setTime] = useState<number | undefined>(timeLeft);
  const [resultTime, setResultTime] = useState<number | undefined>(undefined);

  useEffect(() => {
    setTime(timeLeft);
    setResultTime(undefined);
  }, [timeLeft]);

  useEffect(() => {
    if (!time) return;

    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime && prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    if (time === 0 && resultTime === undefined) {
      setResultTime(3); // Start resultTime countdown from 5 seconds
    }
  }, [time, resultTime]);

  useEffect(() => {
    if (resultTime === undefined || resultTime <= 0) return;

    const timer = setInterval(() => {
      setResultTime((prevResultTime) =>
        prevResultTime && prevResultTime > 0 ? prevResultTime - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [resultTime]);

  return (
    <div className="flex flex-col items-center h-full w-full bg-white bg-opacity-50 rounded-xl p-6 relative px-4 z-999">
      {/* Timer */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-black text-2xl font-bold">
        {time && time > 0
          ? `남은 시간: ${time}`
          : resultTime && resultTime > 0
          ? `다음 문제까지: ${resultTime}`
          : "시간 종료"}
      </div>

      {/* Question */}
      <div className="text-center">
        <p className="text-3xl font-bold text-green-600">Q{questionNo}.</p>
        <p className="mt-4 text-xl font-semibold">{question}</p>
      </div>

      {/* Explanation */}
      {time === 0 && (
        <div className="flex flex-col mt-6 text-center">
          <div className="flex flex-row justify-center items-center gap-2">
            <p className="text-lg font-semibold">정답은</p>
            {quizResult?.answer ? (<FaRegCircle className="text-3xl text-blue-600" strokeWidth={10} />):(<IoClose className="text-3xl text-red-600" strokeWidth={10} />)}
          </div>
          <p className="text-lg font-semibold text-gray-600">{quizResult?.explanation}</p>
        </div>
      )}
    </div>
  );
};