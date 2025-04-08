import React, { useEffect, useState } from "react"
import { QuestionProps } from "../model/type"
import { FaRegCircle } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { useAppDispatch } from "@/app/redux/hooks"
import { setMovementProhibition } from "@/features/game/model/gameSlice"

export const QuestionComponent: React.FC<QuestionProps> = ({ questionNo, question, timeLeft, quizResult, gameState }) => {
  const [time, setTime] = useState<number | undefined>(timeLeft)
  const [showAnswer, setShowAnswer] = useState(false)
  const [startTimer, setStartTimer] = useState<number | undefined>(gameState?.timeLeft)

  const dispatch = useAppDispatch()

  // 게임 시작 타이머 처리
  useEffect(() => {
    setStartTimer(gameState?.timeLeft)

    if (gameState?.state === "PLAYING" && gameState?.timeLeft !== undefined) {
      const startCountdown = setInterval(() => {
        setStartTimer((prevTime) => {
          if (prevTime === undefined || prevTime <= 1) {
            clearInterval(startCountdown)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(startCountdown)
    }
  }, [gameState?.timeLeft])

  useEffect(() => {
    setTime(timeLeft)
    setShowAnswer(false)

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          setShowAnswer(true)
          clearInterval(timer)
          return 0
        }
        return prevTime! - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [questionNo])

  useEffect(() => {
    if (showAnswer) {
      dispatch(setMovementProhibition(true))
    } else {
      dispatch(setMovementProhibition(false))
    }
  }, [showAnswer])

  return (
    <div className="flex flex-col items-center h-full w-full bg-white bg-opacity-50 rounded-xl p-6 relative px-4 z-999">
      {startTimer && startTimer > 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="font-bold text-xl">게임이 곧 시작합니다.</p>
          <p className="font-bold text-6xl text-[#7CBA36]">{startTimer}</p>
        </div>
      ) : (
        <>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-black text-2xl font-bold">{!showAnswer && <>남은 시간: {time}</>}</div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#7CBA36]">Q{questionNo}.</p>
            <p className="mt-4 text-xl font-semibold">{question}</p>
          </div>
          {showAnswer && quizResult && (
            <div className="flex flex-col mt-6 text-center gap-2">
              <div className="flex flex-row justify-center items-center gap-2">
                <p className="text-lg font-semibold">정답은</p>
                {quizResult.answer ? <FaRegCircle className="text-3xl text-[#748BFF]" strokeWidth={10} /> : <IoClose className="text-3xl text-[#EF4452]" strokeWidth={10} />}
              </div>
              <p className="text-lg font-semibold text-gray-600">{quizResult?.explanation}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
