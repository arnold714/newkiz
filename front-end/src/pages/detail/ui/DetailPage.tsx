import { LuChevronLeft } from "react-icons/lu";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6"; 
import { useEffect, useState, useCallback } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { NewsDetail, context } from "@/features/detail";
import {
   NewsDetailContet, 
   ParticipationOptions, 
   NewsRecommendationList, 
   PostNewsScrap, 
   DeleteNewsScrap, 
   GetNewsScrapStatus, 
   ActionButton,
   GetNewsDetail } from "@/widgets/detail";
import "@shared/styles/CustomScroll.css"
import "../styles/Detail.css"

Modal.setAppElement('#root');

export default function DetailPage() {

  const navigate = useNavigate();
  const { id } = useParams<{id:string}>();
  const [activeButton, setActiveButton] = useState('상'); 
  const [isNewsScrapped, setIsNewsScrapped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsDetail, setNewsDetail] = useState<NewsDetail|null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  //뉴스 스크랩 여부
  const fetchNewsScrapStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GetNewsScrapStatus(id!); // 스크랩 상태 불러오기
      console.log('뉴스 스크랩 상태:', response); // 응답 확인
      if (response) {
        setIsNewsScrapped(response.isSrcapped); // 응답값의 isScrapped 속성으로 상태 설정
      }
    } catch (error) {
      console.error('상태 불러오기 실패:', error);
    } finally {
      setIsLoading(false); 
    }
  }, [id]);

  //뉴스 스크랩 상태 
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
  //뉴스 상세 정보 불러오기
  const fetchNewsDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await GetNewsDetail(id!);
      console.log('뉴스 상세 데이터 불러오기 성공:', response);
      if (response) {
        setNewsDetail(response); // 뉴스 상세 정보 상태에 저장
      }
    } catch (error) {
      console.error('뉴스 상세 정보 불러오기 실패:', error)
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  
  // id와 fetchNewsScrapStatus가 변경될 때마다 상태를 불러옴
  useEffect(() => {
    fetchNewsScrapStatus();
    fetchNewsDetail();
  }, [id, fetchNewsScrapStatus, fetchNewsDetail ]); 

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 중 메시지 또는 스켈레톤 UI 표시
  }
  if (!newsDetail) {
    return <div>데이터가 없습니다.</div>
  }

  const filteredContext = newsDetail?.contextList?.filter((contextLevel: context) => {
    if (activeButton === '상' && contextLevel.level === 3) {
      return true;
    }
    if (activeButton === '중' && contextLevel.level === 2) {
      return true;
    }
    if (activeButton === '하' && contextLevel.level === 1) {
      return true;
    }
    return false;
  });

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-100px)] bg-[#BFD46F]" >
      <div className="bg-white p-5 mx-3 mt-5 mb-5 rounded-xl pb-18">
        <div className="flex justify-between items-center">
          {/* 뒤로 가기  */}
          <LuChevronLeft 
            size={25} 
            onClick={handleBack}
          />

          {/* 난이도 버튼 그룹 */}
          <div className="flex items-center gap-2">
            <div className='bg-[#F5F6FA] rounded-md px-3 py-1'>
              {['상', '중', '하', '원문'].map((label) => (
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
        <div className="mt-5">
          {activeButton === '원문' ? (
            <NewsDetailContet 
              id={id}
              article={newsDetail.article}  
              wordList={newsDetail.wordList}
              img={newsDetail.img}
              published={newsDetail.published}
              link={newsDetail.link}
              title={newsDetail.title}        
            />
          ) : (
            filteredContext?.map((contextLevel, index) => (
              <div key={index}>
                <NewsDetailContet 
                  id={id} 
                  context={contextLevel.context} 
                  wordList={newsDetail.wordList}
                  img={newsDetail.img}
                  published={newsDetail.published}
                  link={newsDetail.link}
                  title={newsDetail.title}        
                />
              </div>
            ))
          )}
</div>

        <div className="h-1.5 w-full bg-[#F5F6FA]"></div>

        {/* 참여 컨텐츠 */}
        <div>
          <p className='m-5 text-2xl font-bold'>함께 참여해 볼까요?</p>
          <ParticipationOptions id={id}  summary={newsDetail.summary} />
        </div>

        <div className="h-1.5 w-full bg-[#F5F6FA]"></div>
        <div>
          <p className='m-5 text-2xl font-semibold'>이런 기사도 있어요!</p>
          <NewsRecommendationList id={id} /> 
        </div>
      </div>
      <div>
        <ActionButton newsId={id!}/>
      </div>
    </div>
  );
}
