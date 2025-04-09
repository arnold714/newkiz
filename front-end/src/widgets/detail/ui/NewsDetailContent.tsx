import { Popover } from 'react-tiny-popover';
import { useState } from 'react';
import { LuBookmark, LuBookmarkCheck, LuX } from "react-icons/lu";

interface NewsDetailContentProps {
  id?: string;
  context?: { 
    type: string;
    data: string;
  }[]; 
  wordList: {
    word: string;
    mean: string;
  }[];
  img: string;
  published: string;
  link: string;
  title: string;
  article?: string;
}

export const NewsDetailContet: React.FC<NewsDetailContentProps> = ({
  context,
  wordList,
  img,
  published,
  link,
  title,
  article,
}) => {
  const [popoverData, setPopoverData] = useState<{
    word: string;
    definition: string;
    index: number;
  } | null>(null);
  const [isWordScrapped, setIsWordScrapped] = useState<boolean>(false);

  // 날짜 계산
  const publishedDate = new Date(published);
  const updateDay = `${publishedDate.getFullYear()}.${
    String(publishedDate.getMonth() + 1).padStart(2, '0')
  }.${
    String(publishedDate.getDate()).padStart(2, '0')
  }`;

  // 단어 클릭 시 Popover 동작 함수
  const handleWordClick = (text: string, index: number) => {
    const found = wordList.find((item) => item.word === text);
    if (found) {
      setPopoverData({
        word: found.word,
        definition: found.mean,
        index,
      });
    } else {
      setPopoverData(null);
    }
  };

  return (
    <div>
      <div className="font-extrabold text-xl sm:text-3xl">{title}</div>
      <div className="mt-2 text-[#757575]">
        업데이트: {updateDay} |{' '}
        <a href={link} target="_blank" rel="noopener noreferrer">
          기사 원문
        </a>
      </div>

      {/* 뉴스 이미지 */}
      <div className="m-5">
        <img src={img} alt="" className="w-full rounded-lg" />
      </div>

      {/* 뉴스 내용 */}
      <div className="text-xl m-3">
        {context ? (
          context.map((ctx, index) => (
            <div key={index}>
              {ctx.type === 'text' ? (
                ctx.data.split(' ').map((text: string, idx: number) => {
                  const matchingItem = wordList.find((item) => item.word === text);
                  const isMatch = Boolean(matchingItem);
                  return (
                    <Popover
                      key={idx}
                      isOpen={popoverData?.word === text && popoverData?.index === idx}
                      positions={['top', 'bottom', 'left', 'right']}
                      onClickOutside={() => setPopoverData(null)}
                      content={
                        <div className="bg-white border border-gray-300 p-2.5 rounded min-w-[200px]shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative max-w-[300px]">
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
                        onClick={() => isMatch && handleWordClick(text, idx)}
                        className={isMatch ? 'text-blue-500 underline cursor-pointer' : ''}
                      >
                        {text}{' '}
                      </span>
                    </Popover>
                  );
                })
              ) : (
                ctx.data
              )}
            </div>
          ))
        ) : article ? (
          (() => {
            // 본문을 해시태그와 분리
            const parts = article.split('#');
            const firstPart = parts[0]; // 일반 텍스트
            const hashtags = parts.slice(1); // 해시태그들

            return (
              <>
                {/* 본문(해시태그 제외) */}
                <div>
                  {firstPart.split(' ').map((text: string, index: number) => {
                    const matchingItem = wordList.find((item) => item.word === text);
                    const isMatch = Boolean(matchingItem);
                    return (
                      <Popover
                        key={index}
                        isOpen={popoverData?.word === text && popoverData?.index === index}
                        positions={['top', 'bottom', 'left', 'right']}
                        onClickOutside={() => setPopoverData(null)} 
                        content={
                          <div className="bg-white border border-gray-300 p-2.5 rounded min-w-[200px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative max-w-[300px]">
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
                          onClick={() => isMatch && handleWordClick(text, index)}
                          className={isMatch ? 'text-blue-500 underline cursor-pointer' : ''}
                        >
                          {text}{' '}
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
                      {hashtags.map((hashtag: string, index: number) => {
                        const hashtagText = hashtag.split(' ')[0];
                        return (
                          <Popover
                            key={index}
                            isOpen={
                              popoverData?.word === hashtagText && popoverData?.index === index
                            }
                            positions={['top', 'bottom', 'left', 'right']}
                            onClickOutside={() => setPopoverData(null)} 
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
                              onClick={() => handleWordClick(hashtagText, index)}
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
          })()
        ) : null}
      </div>
    </div>
  );
};
