import { QuestionProps } from "../model/type"
import { useEffect, useState } from "react"

export const QuestionComponent = ({ questionNo, question, timeLeft, quizResult }: QuestionProps) => {
  const [time, setTime] = useState<number | undefined>(timeLeft);

  useEffect(() => {
    // timeLeft가 변경되면 time 상태 업데이트
    setTime(timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (!time) return;

    // 1초마다 시간 감소
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime && prevTime > 0) {
          return prevTime - 1;
        }
        return 0;
      });
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, [time]);


  return (
    <div className="h-full w-full flex flex-col items-center bg-white opacity-70 rounded-xl relative">
      <div className="font-bold text-4xl absolute right-5">남은 시간 : {time}</div>
      <p className="mt-5 text-3xl font-bold text-[#7CBA36]">Q{questionNo}.</p>
      <div className="w-[90%] mt-3 font-bold text-lg mb-10">
        <p>{question}</p>
        <p>{quizResult?.explanation}</p>
      </div>
    </div>
  )
}
