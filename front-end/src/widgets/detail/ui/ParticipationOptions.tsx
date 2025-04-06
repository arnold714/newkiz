import { QuizModal } from "@/widgets/detail";
import Modal from 'react-modal';
import { useState } from "react";
import { Link } from "react-router-dom";
import "@/pages/detail/styles/Detail.css";

Modal.setAppElement('#root');

interface NewsDetailContentProps {
  id?: string;
};

const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

export const ParticipationOptions:React.FC<NewsDetailContentProps> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  
  return (
    <div>
          <div className='flex justify-center items-center gap-10 gap-responsive m-5'>
            {/* 뉴스 요약 */}
            <div className='bg-[#F8D460] w-35 min-w-25 h-35 min-h-25 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'>
              <Link
                to={`/newssummary/${id}`}
              >
                <img
                  src={`${imgUrl}assets/ai_news_summary.svg`}
                  alt="ai_news_summary_icon"
                  className='h-[80px]'
                />
                <p className='text-white font-semibold  text-center text-2xl text-responsive'>뉴스 요약</p>
              </Link>
            </div>

            {/* 퀴즈 도전 */}
            <div
              className='bg-[#FF5C5C] w-35 h-35 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
              onClick={() => { setIsModalOpen(true) }}
            >
              <img
                src={`${imgUrl}assets/quiz.svg`}
                alt="quiz_icon"
                className='h-[90px]'
              />
              <p className='text-white font-semibold text-center text-2xl text-responsive'>퀴즈 도전</p>
            </div>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="modal my-info-modal"
              overlayClassName="modal-overlay"
              shouldCloseOnOverlayClick={true}
            >
              <QuizModal closeModal={() => setIsModalOpen(false)} id={id}/>
            </Modal>
          </div>
    </div>
  );
};
