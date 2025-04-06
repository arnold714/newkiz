import { LuChevronLeft } from "react-icons/lu";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6"; 
import { useEffect, useState, useCallback } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { NewsDetailContet, ParticipationOptions, NewsRecommendationList, PostNewsScrap, DeleteNewsScrap, GetNewsScrapStatus } from "@/widgets/detail";
import "@shared/styles/CustomScroll.css"
import "../styles/Detail.css"

Modal.setAppElement('#root');

export default function DetailPage() {

  const navigate = useNavigate();
  const { id } = useParams<{id:string}>();
  const [activeButton, setActiveButton] = useState('상'); 
  const [isNewsScrapped, setIsNewsScrapped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleBack = () => {
    navigate(-1);
  };

  const fetchNewsScrapStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const status = await GetNewsScrapStatus(id!); // 스크랩 상태 불러오기
      setIsNewsScrapped(status);
    } catch (error) {
      console.error('상태 불러오기 실패:', error);
    } finally {
      setIsLoading(false); 
    }
  }, [id]); // id가 변경될 때마다 함수가 새로 정의되지 않도록 useCallback으로 메모이제이션 처리

  const toggleNewsScrapStatus = async () => {
    try {
      if (isNewsScrapped) {
        await DeleteNewsScrap(id!); // 스크랩 취소
        setIsNewsScrapped(false);
      } else {
        await PostNewsScrap(id!); // 스크랩
        setIsNewsScrapped(true);
      }
    } catch (error) {
      console.error('뉴스 스크랩 상태를 변경하는 데 실패했습니다.', error);
    }
  };

  // id와 fetchNewsScrapStatus가 변경될 때마다 상태를 불러옴
  useEffect(() => {
    fetchNewsScrapStatus();
  }, [id, fetchNewsScrapStatus]); 

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중 메시지 또는 스켈레톤 UI 표시
  }

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-100px)] bg-[#BFD46F]">
      <div className="bg-white p-5 mx-3 mt-5 rounded-xl pb-18">
        <div className="flex justify-between items-center">
          {/* 뒤로 가기  */}
          <LuChevronLeft 
            size={25} 
            onClick={handleBack}
          />

          {/* 난이도 버튼 그룹 */}
          <div className="flex items-center gap-2">
            <div className='bg-[#F5F6FA] rounded-md px-3 py-1'>
              {['상', '중', '하'].map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveButton(label)}
                  className={`w-10 h-7 text-center rounded-md text-ms ${
                    activeButton === label ? 'bg-[#7CBA36] text-white' : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* 스크랩 */}
            {isNewsScrapped ? (
              <FaBookmark
                size={25}
                onClick={toggleNewsScrapStatus}
                className="cursor-pointer text-black"
              />
            ) : (
              <FaRegBookmark
                size={25}
                onClick={toggleNewsScrapStatus}
                className="cursor-pointer text-black"
              />
            )}
          </div>
        </div>

        {/* content */}
        <div className='mt-5'>
          <NewsDetailContet id={id} />
        </div>

        <div className="h-1.5 w-full bg-[#F5F6FA]"></div>

        {/* 참여 컨텐츠 */}
        <div>
          <p className='m-5 text-2xl font-bold'>함께 참여해 볼까요?</p>
          <ParticipationOptions id={id} />
        </div>

        <div className="h-1.5 w-full bg-[#F5F6FA]"></div>
        <div>
          <p className='m-5 text-2xl font-semibold'>이런 기사도 있어요!</p>
          <NewsRecommendationList /> 
        </div>
      </div>
    </div>
  );
}
