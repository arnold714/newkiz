import { WrongAnswerItem } from "@/features/mypage";
import { LuChevronLeft } from "react-icons/lu";
import { FaLightbulb, FaQuestionCircle, FaTrashAlt } from "react-icons/fa";
import { PostWrongAnswer } from "@/widgets/mypage";
import { showError, showSuccess } from "@/shared";

interface WrongAnswerModalProps {
    closeModal: () => void;
    wrongdata: WrongAnswerItem | undefined;
    onQuizDeleted: (quizId: string) => void;
}

export const WrongAnswerModal = ({ closeModal, wrongdata, onQuizDeleted }: WrongAnswerModalProps) => {
    const handleDeleteQuiz = async () => {
        if (!wrongdata) return;
        try {
            await PostWrongAnswer(wrongdata.id);
            showSuccess("퀴즈가 삭제되었습니다.");
            onQuizDeleted(wrongdata.id);
            closeModal();
        } catch (error) {
            showError("퀴즈 삭제에 실패했습니다.");
        }
    };

    if (!wrongdata) {
        return <div>오답 데이터가 없습니다.</div>;
    }

    const { question, answer, explanation } = wrongdata.quiz.multipleChoiceQuiz;

    return (
        <div className="w-full h-full flex flex-col items-center bg-gray-50 overflow-hidden">
            <div className="flex flex-row w-full justify-start items-center gap-3 p-3 bg-white shadow-sm sticky top-0 z-10 mb-2">
                <LuChevronLeft className="text-[20px] cursor-pointer text-gray-700 hover:text-black transition-colors" onClick={closeModal} />
                <p className="font-bold text-xl text-gray-800">해설</p>
            </div>

            <div className="w-full flex-1 overflow-y-auto p-4">
                <div className="flex flex-col w-full mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-blue-500 py-2 px-3 flex items-center">
                        <FaQuestionCircle className="text-white text-sm mr-2" />
                        <p className="font-medium text-white text-base">문제</p>
                    </div>

                    <div className="p-4">
                        <p className="font-medium text-base text-gray-800 mb-3">{question}</p>
                        <div className="flex flex-row w-full justify-end">
                            <div className="flex items-center bg-[#7CBA36] text-white px-3 py-1 rounded-lg shadow-sm">
                                <p className="font-medium text-sm">정답: {answer}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full mb-6 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-amber-500 py-2 px-3 flex items-center">
                        <FaLightbulb className="text-white text-sm mr-2" />
                        <p className="font-medium text-white text-base">해설</p>
                    </div>

                    <div className="p-4">
                        <p className="font-medium text-gray-700 text-base leading-relaxed">{explanation}</p>
                    </div>
                </div>

                <div className="flex justify-center my-2">
                    <button
                        onClick={handleDeleteQuiz}
                        className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <FaTrashAlt className="mr-2 text-sm" />
                        <span className="text-sm">퀴즈 삭제</span>
                    </button>
                </div>
            </div>
        </div>
    );
};