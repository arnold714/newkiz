import { LuChevronLeft, LuBookmark, LuChevronDown, LuChevronUp, LuBookmarkCheck } from "react-icons/lu";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsDetail } from "@/features/detail/model/types";
import Modal from 'react-modal';
import "../styles/Detail.css"
import { QuizModal } from "@/widgets/detail";
import { Popover } from 'react-tiny-popover';


Modal.setAppElement('#root');

export default function DetailPage() {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState('상'); 
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  // popover로 표시할 경우 tooltipData를 사용하여 어떤 단어에 대해 popover를 열지 제어합니다.
  const [popoverData, setPopoverData] = useState<{ word: string, definition: string } | null>(null);

  const handleNewsSummary = () => {
    navigate('/newssummary');
  };

  const newsDetailData: NewsDetail = {
    "id": "67e8ed47964fa9feac885922",
    "title": "[단독] JY, 이건희 ‘디자인 혁명’ 잇는다...삼성, 디자인 인력 수술대에",
    "link": "https://n.news.naver.com/mnews/article/014/0005328348",
    "published": "2025-03-30T09:00:00",
    "category": "경제",
    "article": "DX 내 사업부 UX, 제품 디자인 등 디자인 인력 타 직군에 재배치 인력 효율화하고, 삼성 제품 정체성 확립 위한 디자인 조직 강화 이재용 회장 '수시 인사' 기조 언급한 만큼, 필요할 때 인력 보강도 서울 서초구 삼성전자 본사 전경. 뉴스1 [파이낸셜뉴스]삼성전자가 디자인 조직 일부 인력 전환배치를 단행한다. 모바일(MX), 영상디스플레이(VD), 생활가전(DA) 등 디바이스경험(DX) 사업 부문 전반의 디자인 인력 효율화를 통해 혁신을 이어간다는 계획이다. 전반적인 디자인 전략 재정비와, 조직 운영 방식까지 손보는 구조적 개편에 나설 것으로 관측된다. 이재용 삼성전자 회장이 이건희 선대회장의 '디자인 혁명'을 계승·발전해 전사적인 변화를 시도하고 있는 것으로 분석된다. 30일 업계에 따르면 삼성전자는 최근 사용자경험(UX), 제품 디자인 등을 포함한 디자인 직군 인력 중 약 10%가량을 타 부서로 전환 배치한 것으로 확인됐다. 특히 우면동 연구개발(R&D)센터 등에서 근무하던 기존 구성원들은 디자인과는 거리가 먼 영업 조직, 전략마케팅실 등으로 이동한 것으로 파악된다. 업계 관계자는 \"전환 배치를 통해 전반적인 디자인 직군의 인력 수는 줄어드는 것으로 안다\"며 \"디자인 쪽은 인력을 줄이고, 인력이 부족한 부서에는 보강하는 조치\"라고 전했다. 이번 전환은 단순한 순환 배치를 넘어, 조직 구조 재정비를 위한 조치로 해석된다. 삼성전자는 지난해부터 반도체(DS) 부문을 중심으로 조직 전반에 대한 경영 진단을 진행하며, '아픈 손가락'을 살펴보고 있다. 디자인 조직 역시 이 같은 기조에 따라 내부적으로 진단을 진행, 인력 구조와 기능을 재정비하는 과정에 들어간 것으로 분석된다. 실제 MZ세대(1980년~2009년 출생)에게 보다 소구력이 필요한 스마트폰, 스마트워치뿐 아니라 생활가전·TV 등 여타 사업부에서도 제품 간 디자인 정체성이 부족하다는 평가가 이어지는 가운데, DX 사업부의 전반적인 디자인 경쟁력 강화가 필요하단 지적이 나오고 있다. 이 같은 움직임은 이 회장이 강조한 '수시 인사' 기조와도 맞닿아 있다는 분석이 나온다. 이 회장은 최근 임원 교육에서 \"국적과 성별을 불문하고 경영진보다 더 뛰어난 인재를 영입하고, 필요하다면 인사는 수시로 이뤄져야 한다\"고 강조한 바 있다. 실제 삼성전자는 디자인 경쟁력 강화를 위해 세계적인 디자이너인 마우로 포르치니를 DX부문 최고디자인책임자(CDO)로 영입하는 방안도 유력하게 검토하며, 외부 인력 수혈에도 적극적으로 나설 것으로 전망된다. 업계에서는 디자인 조직의 전환 배치가 일회성 조치에 그치지 않고 브랜드 전략, 제품 기획, UX 등 관련 기능의 통합 및 재조정으로 이어질 가능성이 높다고 보고 있다. 중장기적 관점에서 디자인 체질 개선과 글로벌 경쟁력 제고를 동시에 노린 조치로 해석된다. 업계 관계자는 \"전환 배치 이후에도 DX 각 사업부 내 디자인 조직의 역할 조정이나 기능 분화가 이어질 것으로 보인다\"며 \"디자인이 중요한 DX 부문에서 승부수를 띄우려는 작업은 계속될 것\"이라고 말했다. #삼성전자 #스마트폰 #갤럭시 #워치 #디자인 #이건희 #비스포크",
    "img": "https://imgnews.pstatic.net/image/014/2025/03/30/0005328348_001_20250330145311046.jpg?type=w860",
    'textList': [
      {
        "id": 1,
        'text': '이재용',
        "content": "삼성 회장"
      },
      {
        "id": 2,
        'text': '디자인',
        "content": "디자인 설명"
      },
      {
        "id": 3,
        'text': '조직',
        "content": "조직에 대한 설명입니다."
      },
    ],
    "views": 1
  };

  const publishedDate = new Date(newsDetailData.published);
  const updateDay = `${publishedDate.getFullYear()}.${
    String(publishedDate.getMonth() + 1).padStart(2, '0')
  }.${
    String(publishedDate.getDate()).padStart(2, '0')
  }`;

  const beforReadingTips = '뉴스를 보기 전 알면 좋을 꿀팁!';

  const handleWordClick = (word: string) => {
    const found = newsDetailData.textList.find(item => item.text === word);
    if (found) {
      setPopoverData({
        word: found.text,
        definition: found.content,
      });
    }
  };

  return (
    <div className="bg-white w-[calc(100%-70px)] mx-auto my-5 p-5 rounded-xl overflow-y-auto pb-18 max-h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center">
        {/* 뒤로 가기 아이콘 */}
        <LuChevronLeft size={25} />

        {/* 버튼 그룹 */}
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
        <div className='font-extrabold text-xl sm:text-3xl'>{newsDetailData.title}</div>
        <div className='mt-2 text-[#757575]'>
          업데이트: {updateDay} | 
          <a href={newsDetailData.link} target="_blank" rel="noopener noreferrer"> 기사 원문</a>
        </div>
        <div className="flex items-center mx-4 mt-4">
          <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-20 m-1' />
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
        <div className='m-5'>
          <img src={newsDetailData.img} alt="" className='w-full rounded-lg' />
        </div>
        {/* 뉴스 내용 */}
        <div className="text-xl m-3">
          {(() => {
            // 본문을 해시태그 기준으로 분리
            const parts = newsDetailData.article.split('#');
            const firstPart = parts[0]; // 일반 텍스트
            const hashtags = parts.slice(1); // 해시태그들

            return (
              <>
                {/* 일반 텍스트 */}
                <div>
                  {firstPart.split(' ').map((word, index) => {
                    const matchingItem = newsDetailData.textList.find(item => item.text === word);
                    const isMatch = Boolean(matchingItem);
                    return (
                      <Popover
                        key={index}
                        isOpen={popoverData?.word === word}
                        positions={['top', 'bottom', 'left', 'right']}  // 원하는 위치 지정
                        content={
                          <div className="bg-white border border-gray-300 p-2.5 rounded max-w-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative">
                            <button
                              onClick={() => setPopoverData(null)}
                              className="absolute top-1 right-1 bg-transparent border-0 text-[16px] cursor-pointer"
                            >
                              &times;
                            </button>
                            <h4 className="m-0 mb-1">{popoverData?.word}</h4>
                            <p className="m-0">{popoverData?.definition}</p>
                          </div>
                        }
                      >
                        <span
                          onClick={() => isMatch && handleWordClick(word)}
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
                            isOpen={popoverData?.word === hashtagText}
                            positions={['top']}
                            content={
                              <div className="bg-white border border-gray-300 p-2.5 rounded max-w-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] relative">
                                <button
                                  onClick={() => setPopoverData(null)}
                                  className="absolute top-1 right-1 bg-transparent border-0 text-[16px] cursor-pointer"
                                >
                                  &times;
                                </button>
                                <h4 className="m-0 mb-1">{popoverData?.word}</h4>
                                <p className="m-0">{popoverData?.definition}</p>
                              </div>
                            }
                          >
                            <span
                              onClick={() => handleWordClick(hashtagText)}
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

      <div className="h-1.5 w-full bg-[#F5F6FA]"></div>

      {/* 참여 컨텐츠 */}
      <div>
        <p className='m-5 text-2xl font-bold'>함께 참여해 볼까요?</p>
        <div className='flex justify-center items-center gap-10 m-5'>
          {/* 뉴스 요약 */}
          <div className='bg-[#F8D460] p-5 w-35 h-35 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'>
            <img
              src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/ai_news_summary.png"
              alt="ai_news_summary_icon"
              className='h-[80px]'
              onClick={handleNewsSummary}
            />
            <p className='text-white font-semibold text-2xl'>뉴스 요약</p>
          </div>

          {/* 퀴즈 도전 */}
          <div
            className='bg-[#FF5C5C] p-5 w-35 h-35 rounded-[20px] flex flex-col justify-center items-center shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
            onClick={() => { setIsModalOpen(true) }}
          >
            <img
              src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/quiz.png"
              alt="quiz_icon"
              className='h-[90px]'
            />
            <p className='text-white font-semibold text-2xl'>퀴즈 도전</p>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="modal my-info-modal"
            overlayClassName="modal-overlay"
            shouldCloseOnOverlayClick={true}
          >
            <QuizModal closeModal={() => setIsModalOpen(false)} />
          </Modal>
        </div>
      </div>

      <div className="h-1.5 w-full bg-[#F5F6FA]"></div>
      <div>
        <p className='m-5 text-2xl font-semibold'>이런 기사도 있어요!</p>
      </div>
    </div>
  );
}
