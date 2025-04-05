import { QuizResult, State } from "@/features/game/model/types";

export type RankType = "school" | "personal";

export interface QuestionProps {
    questionNo: number | undefined
    question: string | undefined
    timeLeft: number | undefined
    quizResult: QuizResult | null
    gameState: State
}