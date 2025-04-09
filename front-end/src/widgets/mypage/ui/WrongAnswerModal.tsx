import { WrongAnswerItem } from "@/features/mypage";
import { LuChevronLeft } from "react-icons/lu"
import { PostWrongAnswer } from "../api/myPageApi";

interface WrongAnswerModalProps {
    closeModal: () => void;
    wrongdata: WrongAnswerItem[] | undefined;
}

export const WrongAnswerModal = ({ closeModal, wrongdata }: WrongAnswerModalProps) => {

    const handleDeleteQuiz = async (quizId: string) => {
        try {
            await PostWrongAnswer(quizId);  // Post 요청 보내기
            alert("퀴즈가 삭제되었습니다.");  // 삭제 완료 후 알림
            closeModal();  // 모달 닫기
            // 추가적인 상태 업데이트나 리렌더링 로직을 여기에 추가할 수 있습니다.
        } catch (error) {
            console.error("퀴즈 삭제 실패:", error);
            alert("퀴즈 삭제에 실패했습니다.");
        }
    };
    
    if (!wrongdata || wrongdata.length === 0) {
        return <div>오답 데이터가 없습니다.</div>;  // 데이터가 없을 경우 기본 메시지 반환
    }

    return (
        <div className="w-full h-[90%] flex flex-col items-center mt-5 overflow-auto scroll">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
                <p className="font-bold text-2xl">해설</p>
            </div>
            <div className="flex flex-col w-[90%] items-start mt-5 gap-5">
                <p className="font-semibold font-[#929292] text-lg">문제</p>
                <p className="font-semibold">{wrongdata[0]?.quiz.multipleChoiceQuiz.question}</p>
                <div className="flex flex-row w-full justify-end">
                    <p className="px-5 py-1 bg-[#7CBA36] text-white rounded-lg">{wrongdata[0]?.quiz.multipleChoiceQuiz.answer}</p>
                </div>
            </div>
            <div className="flex flex-col w-[90%] items-start mt-5 gap-5">
                <p className="font-semibold font-[#929292] text-lg">해설</p>
                <p className="font-semibold">{wrongdata[0]?.quiz.multipleChoiceQuiz.explanation}</p>
            </div>
            <button onClick={() => handleDeleteQuiz(wrongdata[0]?.id || '')}>
                [퀴즈 삭제]
            </button>
        </div>
    )
}