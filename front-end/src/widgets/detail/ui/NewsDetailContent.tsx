import { GetNewsDetail } from '../api/DetailApi';
import { Popover } from 'react-tiny-popover';
import { useEffect, useState } from 'react';
import { LuBookmark, LuChevronDown, LuChevronUp, LuBookmarkCheck, LuX } from "react-icons/lu";
import { NewsDetail } from "@/features/detail";

interface NewsDetailContentProps {
  id?: string;
}

export const NewsDetailContet:React.FC<NewsDetailContentProps> = ({ id }) => {
  //뉴스 데이터
  const [newsDetailData, setNewDetailData] = useState<NewsDetail|null>(null);
  //뉴스 사전 정보
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
  const [popoverData, setPopoverData] = useState<{ word: string; definition: string; index: number; } | null>(null);
  //뉴스 스크랩 상태
  const [isWordScrapped, setIsWordScrapped] = useState<boolean>(false);
  // 에러 상태 추가
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setErrorMessage("올바른 뉴스 id가 제공되지 않았습니다.");
      return;
    }
    GetNewsDetail(id)
    .then((data) => {
      if(data) {
        setNewDetailData(data);
      }
    })
    .catch((error) => {
      console.log('뉴스 상세 불러오기 실패:', error);
    });
  },[id]);

  if (errorMessage) return <div>Error: {errorMessage}</div>;
  if (!newsDetailData) return <div>Loading...</div>;
  
  //날짜 계산
  const publishedDate = new Date(newsDetailData.published);
  const updateDay = `${publishedDate.getFullYear()}.${
    String(publishedDate.getMonth() + 1).padStart(2, '0')
  }.${
    String(publishedDate.getDate()).padStart(2, '0')
  }`;

  const beforReadingTips = '뉴스를 보기 전 알면 좋을 꿀팁!';

  
  //단어 클릭시 popover 동작 함수
  const handleWordClick = (word: string, index: number ) => {
    const found = newsDetailData.textList.find(item => item.text === word);
    if (found) {
      setPopoverData({
        word: found.text,
        definition: found.content,
        index,
      });
    } else {
      setPopoverData(null); 
    }
  };

  return (
    <div>
      <div className='font-extrabold text-xl sm:text-3xl'>{newsDetailData.title}</div>
        <div className='mt-2 text-[#757575]'>
          업데이트: {updateDay} | 
          <a href={newsDetailData.link} target="_blank" rel="noopener noreferrer"> 기사 원문</a>
                  </div>
                  <div className="flex items-center mt-2">
                    <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-20 m-1' />
                    <div className="relative w-full">
                      <button
                        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                        className="border-2 border-[#D9D9D9] p-2 rounded-ms bg-[#F4F4F8] text-[#757575] w-full flex flex-col items-start"
                      >
                        {/* 아코디언 버튼 */}
                        <div className="flex justify-between w-full text-xl p-[0.3px]">
                          <span>기사 보기 전 깨알 상식!</span>
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
                  <div className='m-5'>
                    <img src={newsDetailData.img} alt="" className='w-full rounded-lg' />
                  </div>
                  {/* 뉴스 내용 */}
                  <div className="text-xl m-3">
                    {(() => {
                      // 본문을 해시태그와 분리
                      const parts = newsDetailData.article.split('#');
                      const firstPart = parts[0]; // 일반 텍스트
                      const hashtags = parts.slice(1); // 해시태그들
        
                      return (
                        <>
                          {/* 본문(해시태그 제외) */}
                          <div>
                            {firstPart.split(' ').map((word, index) => {
                              const matchingItem = newsDetailData.textList.find(item => item.text === word);
                              const isMatch = Boolean(matchingItem);
                              return (
                                <Popover
                                  key={index}
                                  isOpen={popoverData?.word === word && popoverData?.index === index} 
                                  positions={['top', 'bottom', 'left', 'right']}  
                                  content={
                                    <div className="bg-white border border-gray-300 p-2.5 rounded min-w-[200px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative">
                                      <div className="flex items-center justify-between relative mb-2">
                                        {isWordScrapped ? (
                                          <LuBookmarkCheck
                                            size={25}
                                            onClick={() => setIsWordScrapped(!isWordScrapped)}
                                            className="cursor-pointer text-black"
                                          />
                                        ) : (
                                          <LuBookmark
                                            size={25}
                                            onClick={() => setIsWordScrapped(!isWordScrapped)}
                                            className="cursor-pointer text-black"
                                          />
                                        )}
                                        <LuX
                                          size={25}
                                          onClick={() => setPopoverData(null)}
                                          className="cursor-pointer"
                                        />
                                      </div>
                                      <h4 className="text-2xl font-semibold m-0 mb-1">{popoverData?.word}</h4>
                                      <p className="text-xl m-0">{popoverData?.definition}</p>
                                    </div>
                                  }
                                >
                                  <span
                                    onClick={() => isMatch && handleWordClick(word, index)}
                                    className={isMatch ? "text-blue-500 underline cursor-pointer" : ""}
                                  >
                                    {word}{" "}
                                  </span>
                                </Popover>
                              );
                            })}
                          </div>
        
                          {/* 해시태그 */}
                          {hashtags.length > 0 && (
                            <>
                              <br />
                              <div className="flex flex-wrap gap-2 mt-2">
                                {hashtags.map((hashtag, index) => {
                                  const hashtagText = hashtag.split(' ')[0];
                                  return (
                                    <Popover
                                      key={index}
                                      isOpen={popoverData?.word === hashtagText && popoverData?.index === index}
                                      positions={['top']}
                                      content={
                                        <div className="bg-white border border-gray-300 p-2.5 rounded max-w-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative">
                                          <LuX
                                            onClick={() => setPopoverData(null)}
                                            className="absolute top-1 right-1 bg-transparent border-0 text-[16px] cursor-pointer"
                                          />
                                          
                                          <h4 className="m-0 mb-1">{popoverData?.word}</h4>
                                          <p className="m-0">{popoverData?.definition}</p>
                                        </div>
                                      }
                                    >
                                      <span
                                        onClick={() => handleWordClick(hashtagText,index)}
                                        className="text-[#0070F3] cursor-pointer"
                                      >
                                        #{hashtagText}
                                      </span>
                                    </Popover>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </div>
    </div>
  );
};