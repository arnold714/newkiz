import { QuizModal, QuizResult, GetNewsQuizCheck, GetNewsQuiz } from "@/widgets/detail";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@/pages/detail/styles/Detail.css";
import { QuizData } from "@/features/detail";

Modal.setAppElement('#root');

interface NewsDetailContentProps {
  id?: string;
}

const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL;

export const ParticipationOptions: React.FC<NewsDetailContentProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태 관리
    //퀴즈 데이터
    const [newsQuizData, setNewsQuizData] = useState<QuizData|null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // GetNewsQuizCheck 호출 (id가 없으면 기본값 설정)
  const { data } = id ? GetNewsQuizCheck(id) : { data: null };

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

  const handleQuizCheck = () => {
    if (id) {
      setIsModalOpen(true); // 모달 열기
    } else {
      // id가 없을 때 추가 처리 (예: 경고 메시지)
      console.error("ID is missing!");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-10 gap-responsive m-5">
        {/* 뉴스 요약 */}
        <div className="bg-[#F8D460] w-35 min-w-25 h-35 min-h-25 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)]">
          <Link to={`/newssummary/${id}`}>
            <img
              src={`${imgUrl}assets/ai_news_summary.svg`}
              alt="ai_news_summary_icon"
              className="h-[80px]"
            />
            <p className="text-white font-semibold text-center text-2xl text-responsive">뉴스 요약</p>
          </Link>
        </div>

        {/* 퀴즈 도전 */}
        <div
          className="bg-[#FF5C5C] w-35 h-35 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)]"
          onClick={handleQuizCheck} // 클릭 시 퀴즈 풀이 여부 확인 후 모달 열기
        >
          <img
            src={`${imgUrl}assets/quiz.svg`}
            alt="quiz_icon"
            className="h-[90px]"
          />
          <p className="text-white font-semibold text-center text-2xl text-responsive">퀴즈 도전</p>
        </div>

        {/* 모달 */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="modal my-info-modal"
          overlayClassName="modal-overlay"
          shouldCloseOnOverlayClick={true}
        >

          {data && data.data === true ? (
            <QuizResult
              isCorrect={true} // 퀴즈 풀이 완료
              explanation={newsQuizData.quiz.multipleChoiceQuiz.explanation} 
              onClose={() => setIsModalOpen(false)}
            />
          ) : data && data.data === false ? (
            <QuizModal 
              closeModal={() => setIsModalOpen(false)} 
              id={id} 
              quizData={newsQuizData}
            />
          ) : null} {/* data가 null일 경우 아무것도 렌더링하지 않음 */}
        </Modal>
      </div>
    </div>
  );
};
