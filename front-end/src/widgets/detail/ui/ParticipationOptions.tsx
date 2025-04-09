import { QuizModal, GetNewsQuizCheck, GetNewsQuiz, GetNewsSummary } from "@/widgets/detail";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/pages/detail/styles/Detail.css";
import { QuizData } from "@/features/detail";


Modal.setAppElement('#root');

interface NewsDetailContentProps {
  id?: string;
  summary: string;
}

const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL;

export const ParticipationOptions: React.FC<NewsDetailContentProps> = ({ id, summary }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 모달 상태 관리
  const [newsQuizData, setNewsQuizData] = useState<QuizData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  // 뉴스 퀴즈 중복 참여 여부 체크 (id가 없으면 기본값 설정)
  const { data } = id ? GetNewsQuizCheck(id) : { data: null };

  useEffect(() => {
    if (!id) {
      setErrorMessage("올바른 뉴스 id가 제공되지 않았습니다.");
      return;
    }
    // 뉴스 퀴즈 데이터 요청
    GetNewsQuiz(id)
      .then((quizData) => {
        if (quizData) {
          setNewsQuizData(quizData);
        }
      })
      .catch((error) => {
        console.log('퀴즈 불러오기 실패:', error);
      });
  }, [id]);

  if (errorMessage) return <div>Error: {errorMessage}</div>;
  if (!newsQuizData) return <div>Loading...</div>;

  // 퀴즈 모달 열기 핸들러
  const handleQuizCheck = () => {
    if (id) {
      setIsModalOpen(true);
    } else {
      console.error("ID is missing!");
    }
  };

  // 뉴스 요약 버튼 클릭 시 API 호출 후 분기 처리
  const handleNewsSummaryClick = async () => {
    if (!id) {
      console.error("ID is missing!");
      return;
    }

    try {
      const response = await GetNewsSummary(id);
      console.log('요약 여부:',response)
      // 응답이 성공적이며 summary 데이터가 존재할 때 -> NewsSummaryResult 페이지로 이동
      if (response && response.success && response.data) {
        navigate(`/newssummaryresult/${id}`, { state: { summaryData: response.data, summary } });
      } else {
        // 데이터가 없을 경우 기존 뉴스 요약 페이지로 이동
        navigate(`/newssummary/${id}`, { state: { summary } });
      }
    } catch (error) {
      console.error("뉴스 요약 데이터 불러오기 실패:", error);
      // 에러 발생 시에도 기존 페이지로 이동
      navigate(`/newssummary/${id}`, { state: { summary } });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-10 gap-responsive m-5">
        {/* 뉴스 요약 */}
        <div
          className="bg-[#F8D460] w-35 min-w-25 h-35 min-h-25 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)] cursor-pointer"
          onClick={handleNewsSummaryClick}
        >
          <img
            src={`${imgUrl}assets/ai_news_summary.svg`}
            alt="ai_news_summary_icon"
            className="h-[80px]"
          />
          <p className="text-white font-semibold text-center text-2xl text-responsive">
            뉴스 요약
          </p>
        </div>

        {/* 퀴즈 도전 */}
        <div
          className="bg-[#FF5C5C] w-35 h-35 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)] cursor-pointer"
          onClick={handleQuizCheck}
        >
          <img
            src={`${imgUrl}assets/quiz.svg`}
            alt="quiz_icon"
            className="h-[90px]"
          />
          <p className="text-white font-semibold text-center text-2xl text-responsive">
            퀴즈 도전
          </p>
        </div>

        {/* 퀴즈 모달 */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="modal my-info-modal"
          overlayClassName="modal-overlay"
          shouldCloseOnOverlayClick={true}
        >
          <QuizModal 
            closeModal={() => setIsModalOpen(false)} 
            id={id} 
            quizData={newsQuizData}
            isSolved={data?.data ?? false} 
          />
        </Modal>
      </div>
    </div>
  );
};

