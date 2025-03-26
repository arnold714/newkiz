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

          {/* title */}
          <div className='font-extrabold text-xl sm:text-3xl'> {title} </div>
          <div className='mt-2 text-[#757575]'> {updateDay} | {reporterName} </div>
          <div className='flex items-center'>
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-20 m-3'/>
            <div>
              <button
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="border-2 border-[#D9D9D9] p-2 rounded-xl bg-[#F4F4F8] text-[#757575] w-full flex flex-col items-start"
              >
                <div className="flex justify-between w-full text-xl p-2">
                  <span>기사를 보기 전에 보면 좋을 거 같아요!</span>
                  <span>{isAccordionOpen ? <LuChevronUp size={25}/> : <LuChevronDown size={25}/>}</span>
                </div>
                {isAccordionOpen && (
                  <div className="bg-white text-[#202020] mt-2 p-3 w-full text-left rounded-xl text-xl">
                    {beforReadingTips}
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
