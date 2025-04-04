import { useState, useEffect } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "@pages/mypage/styles/MyPage.css"
import { ScrappedWordModal } from "@/widgets/mypage"
import { fetchScrappedNews, fetchScrappedWords } from "@/pages/mypage";
import { NewsItem } from "@/features/mypage/model/types";

Modal.setAppElement("#root")

export const ScrapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scrappedNews, setScrappedNews] = useState<NewsItem[]>([]);
  const [scrappedWords, setScrappedWords] = useState<any[]>([]);

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    (async () => {
      const news = await fetchScrappedNews();
      setScrappedNews(news);
      const words = await fetchScrappedWords();
      setScrappedWords(words);
    })();
  }, []);

  return (
    <div className="w-full flex flex-col overflow-auto px-4 mt-4 scroll">
      {location.pathname === "/mypage/scrap" ? (
        <>
          <div className="flex flex-row justify-start items-center gap-3 my-3">
            <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
            <p className="font-bold text-xl">스크랩</p>
          </div>
          <div className="flex flex-col w-full items-start my-5">
            <p className="text-[#9E9E9E] font-semibold">스크랩한 기사</p>
            <div className="flex flex-col w-full items-center my-3">
              {scrappedNews.length > 0 ? (
                <>
                  {scrappedNews.slice(0, 3).map((news) => (
                    <div key={news.id} className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3">
                      <p className="font-semibold text-[16px]">{news.title}</p>
                      <p className="text-sm text-[#9E9E9E] mt-1">{news.published}</p>
                    </div>
                  ))}
                  {scrappedNews.length > 3 && ( // 기사 수 3개 이상이면 더보기 버튼 생성
                    <Link className="flex justify-center items-center text-[#9E9E9E] font-semibold py-2" to="news">더보기 &gt;</Link>
                  )}
                </>
              ) : (
                <div className="w-full flex justify-center">
                  <p className="text-sm text-[#9E9E9E]">스크랩한 기사가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full items-start my-5">
            <p className="text-[#9E9E9E] font-semibold">스크랩한 단어</p>
            <div className="flex flex-col w-full items-center my-3">
              {scrappedWords.length > 0 ? (
                <>
                  {scrappedWords.slice(0, 3).map((word) => (
                    <div key={word.wordId} className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3">
                      <p className="font-semibold text-[16px]">{word.word}</p>
                    </div>
                  ))}
                  {scrappedWords.length > 3 && (
                    <Link className="flex justify-center items-center text-[#9E9E9E] font-semibold py-2" to="words">더보기 &gt;</Link>
                  )}
                </>
              ) : (
                <div className="w-full flex justify-center mt-5">
                  <p className="text-sm text-[#9E9E9E]">스크랩한 단어가 없습니다.</p>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => {
                setIsModalOpen(true)
              }}
            >
              스크랩 단어 모달 테스트 버튼
            </button> */}
          </div>
          <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal wrong-answer-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
            <ScrappedWordModal closeModal={() => setIsModalOpen(false)} />
          </Modal>
        </>
      ) : (
        <div className="w-full h-full flex flex-row justify-center pb-20">
          <Outlet />
        </div>
      )}

    </div>
  )
}
