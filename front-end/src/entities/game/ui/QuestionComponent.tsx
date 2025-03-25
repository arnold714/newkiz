import { QuestionProps } from "../model/type"
import { useEffect, useState } from "react"

export const QuestionComponent = ({ questionNo, question }: QuestionProps) => {
  const [timeLeft, setTimeLeft] = useState(5)

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  return (
    <div className="h-full w-full flex flex-col items-center bg-white opacity-70 rounded-xl relative">
      <div className="font-bold text-4xl absolute right-5">{timeLeft > 0 ? `${timeLeft}` : ""}</div>
      <p className="mt-5 text-3xl font-bold text-[#7CBA36]">Q{questionNo}.</p>
      <div className="w-[90%] mt-3 font-bold text-lg mb-10">
        <p>{question}</p>
      </div>
    </div>
  )
}
