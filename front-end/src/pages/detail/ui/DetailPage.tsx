import Layout from '@/shared/ui/Layout';
import { LuChevronLeft, LuBookmark, LuChevronDown, LuChevronUp,  LuBookmarkCheck } from "react-icons/lu";
import { useState } from 'react';

export default function DetailPage() {
  
  // 기본 활성 버튼 설정
  const [activeButton, setActiveButton] = useState('상'); 

  // 아코디언 상태 관리
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  // 북마크 상태 관리
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);

  const title = "'대충격' '20분 뛴 이토', 김민재 스피드 압도해 완벽 대체 가능  ";
  const updateDay = '2025.03.13';
  const reporterName = "신승아";
  const beforReadingTips = '이 곳에는 뉴스를 보기 전 알고 있으면 좋은 지식들을 제공 할 예정입니다. 참고 해 보세요';


  return (
    <Layout>
      <div className="bg-white w-[calc(100%-70px)] mx-auto h-[calc(100%-20px)] my-5 p-5 rounded-xl">
        <div className="flex justify-between items-center">
          {/* 뒤로 가기 아이콘 */}
          <LuChevronLeft size={25} />

          {/* 버튼 그룹 */}
          <div className="flex items-center gap-2 ">
            <div className='bg-[#F5F6FA] rounded-md px-3 py-1'>
              {['상', '중', '하'].map((label) => (
                <button
                  key={label}
                  onClick={() => setActiveButton(label)}
                  className={`w-10 h-7 text-center rounded-md text-ms ${
                    activeButton === label
                      ? 'bg-[#7CBA36] text-white'
                      : ''
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

          {/* 북마크 아이콘 */}
          {isBookmarkClicked ? (
              <LuBookmarkCheck
                size={25}
                onClick={() => setIsBookmarkClicked(!isBookmarkClicked)}
                className="cursor-pointer text-black"
              />
            ) : (
              <LuBookmark
                size={25}
                onClick={() => setIsBookmarkClicked(!isBookmarkClicked)}
                className="cursor-pointer text-black"
              />
            )}
          </div>
        </div>

        {/* content */}
        <div className='mt-5'>
          <div className='font-extrabold text-xl sm:text-3xl'> {title} </div>
          <div className='mt-2 text-[#757575]'> {updateDay} | {reporterName} </div>
          <div className="flex items-center mx-4 mt-4">
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-20 m-1 '/>
            <div className="relative w-full">
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="border-2 border-[#D9D9D9] p-2 rounded-ms bg-[#F4F4F8] text-[#757575] w-full flex flex-col items-start"
              >
                {/* 아코디언 버튼 */}
                <div className="flex justify-between w-full text-xl p-2">
                  <span>기사를 보기 전에 보면 좋을 거 같아요!</span>
                  <span>{isAccordionOpen ? <LuChevronUp size={25}/> : <LuChevronDown size={25}/>}</span>
                </div>
                
                {/* 기사 보기 전 내용 */}
                {isAccordionOpen && (
                  <div className="absolute top-[95%] left-0 bg-[#F4F4F8] border-2 border-[#D9D9D9] text-[#202020] p-3 w-full text-left rounded-b-md text-ms z-10 m-0">
                    {beforReadingTips}
                  </div>
                )}
              </button>
            </div>
          </div>
          {/* 뉴스 이미지 */}
          <div className='m-3'>
            <img src="/newsImage3.png" alt="" className='w-full'/>
          </div>
          {/* 뉴스 내용 */}
          <div className='text-xl m-3'>
            안녕하세요. 여기에는 뉴스 내용이 들어 갈겁니다.
            근데 아 이제 살짝 지겨운데 속도를 내보려하는데 이거 이거 사전기능 언제 구현할까요?
            제가 할 수 있을까요...? 이제 버겁네여..^^
          </div>
        </div>

        <div className="h-1.5 w-full bg-[#F5F6FA]"></div>

        {/* 참여 컨텐츠 */}
        <div>
          <p className='m-5 text-2xl font-bold '>함께 참여해 볼까요?</p>
          
        </div>

        <div className="h-1.5 w-full bg-[#F5F6FA]"></div>
        <div>
          <p className='m-5 text-2xl font-semibold'>이런 기사도 있어요!</p>
        </div>
      </div>
    </Layout>
  );
}
