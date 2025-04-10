import { WrongAnswerItem } from "@/features/mypage";
import { LuChevronLeft } from "react-icons/lu";
import { FaLightbulb, FaQuestionCircle, FaTrashAlt } from "react-icons/fa";
import { PostWrongAnswer } from "@/widgets/mypage";

interface WrongAnswerModalProps {
    closeModal: () => void;
    wrongdata: WrongAnswerItem[] | undefined;
    onQuizDeleted: (quizId: string) => void; // 삭제 후 상태 갱신을 위한 함수 추가
}

export const WrongAnswerModal = ({ closeModal, wrongdata, onQuizDeleted }: WrongAnswerModalProps) => {

    const handleDeleteQuiz = async (quizId: string) => {
        try {
            await PostWrongAnswer(quizId);  // Post 요청 보내기
            alert("퀴즈가 삭제되었습니다.");  // 삭제 완료 후 알림
            onQuizDeleted(quizId);  // 삭제된 퀴즈 반영
            closeModal();  // 모달 닫기
        } catch (error) {
            alert("퀴즈 삭제에 실패했습니다.");
        }
    };

    if (!wrongdata || wrongdata.length === 0) {
        return <div>오답 데이터가 없습니다.</div>;  // 데이터가 없을 경우 기본 메시지 반환
    }

    return (
        <div className="w-full h-full flex flex-col items-center bg-gray-50 overflow-hidden">
            {/* 헤더 */}
            <div className="flex flex-row w-full justify-start items-center gap-3 p-3 bg-white shadow-sm sticky top-0 z-10 mb-2">
                <LuChevronLeft className="text-[20px] cursor-pointer text-gray-700 hover:text-black transition-colors" onClick={() => closeModal()} />
                <p className="font-bold text-xl text-gray-800">해설</p>
            </div>
            
            {/* 스크롤 가능한 콘텐츠 영역 */}
            <div className="w-full flex-1 overflow-y-auto p-4">
                {/* 문제 섹션 */}
                <div className="flex flex-col w-full mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* 문제 헤더 */}
                    <div className="bg-blue-500 py-2 px-3 flex items-center">
                        <FaQuestionCircle className="text-white text-sm mr-2" />
                        <p className="font-medium text-white text-base">문제</p>
                    </div>
                    
                    {/* 문제 내용 */}
                    <div className="p-4">
                        <p className="font-medium text-base text-gray-800 mb-3">{wrongdata[0]?.quiz.multipleChoiceQuiz.question}</p>
                        
                        <div className="flex flex-row w-full justify-end">
                            <div className="flex items-center bg-[#7CBA36] text-white px-3 py-1 rounded-lg shadow-sm">
                                <p className="font-medium text-sm">정답: {wrongdata[0]?.quiz.multipleChoiceQuiz.answer}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* 해설 섹션 */}
                <div className="flex flex-col w-full mb-6 bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* 해설 헤더 */}
                    <div className="bg-amber-500 py-2 px-3 flex items-center">
                        <FaLightbulb className="text-white text-sm mr-2" />
                        <p className="font-medium text-white text-base">해설</p>
                    </div>
                    
                    {/* 해설 내용 */}
                    <div className="p-4">
                        <p className="font-medium text-gray-700 text-base leading-relaxed">
                            {wrongdata[0]?.quiz.multipleChoiceQuiz.explanation}
                        </p>
                    </div>
                </div>
                
                {/* 삭제 버튼 */}
                <div className="flex justify-center my-2">
                    <button 
                        onClick={() => handleDeleteQuiz(wrongdata[0]?.id || '')}
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
