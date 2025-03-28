import { LuChevronLeft } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import Modal from "react-modal"
import '@pages/mypage/styles/MyPage.css'
import { useState } from "react"
import { ScrappedWordModal } from "@/widgets/mypage" 

Modal.setAppElement("#root")

export const ScrapPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const navigate = useNavigate()

  const scrappedNews = [
    {
      id: 0,
      title: "'대충격' 20분 뛴 이토, 김민재...",
      date: "2025/03/14",
    },
    {
      id: 1,
      title: "'대충격' 한국 요르단에 비겨...",
      date: "2025/03/15",
    },
    {
      id: 3,
      title: "'대충격' 그냥 충격...",
      date: "2025/03/25",
    },
  ]
  const scrappedWords: any[] = []

  return (
    <div className="w-[90%] flex flex-col overflow-auto px-4 mt-5 scroll">
      <div className="flex flex-row justify-start items-center gap-3 my-3">
        <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
        <p className="font-bold text-xl">스크랩</p>
      </div>
      <div className="flex flex-col w-full items-start my-5">
        <p className="text-[#9E9E9E] font-semibold">스크랩한 기사</p>
        <div className="flex flex-col w-full items-start my-3">
          {scrappedNews.map((news) => (
            <div key={news.id} className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3">
              <p className="font-semibold text-[16px]">{news.title}</p>
              <p className="text-sm text-[#9E9E9E] mt-1">{news.date}</p>
            </div>
          ))}
        </div>
        {scrappedNews.length > 0 && <button className="flex justify-center items-center w-full text-[#9E9E9E] font-semibold py-2">더보기 &gt;</button>}
      </div>
      <div className="flex flex-col w-full items-start my-5">
        <p className="text-[#9E9E9E] font-semibold">스크랩한 단어</p>
        <div className="flex flex-col w-full items-start my-3">
          {scrappedWords.length > 0 ? (
            scrappedWords.map((word) => (
              <div key={word.id} className="flex flex-col w-full border-b border-gray-200 pb-3 mb-3">
                <p className="font-semibold text-[16px]">{word.title}</p>
                <p className="text-sm text-[#9E9E9E] mt-1">{word.date}</p>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <p className="text-sm text-[#9E9E9E]">스크랩한 단어가 없습니다.</p>
            </div>
          )}
        </div>
        <button onClick={()=>{setIsModalOpen(true)}}>스크랩 단어 모달 테스트 버튼</button>
        {scrappedWords.length > 0 && <button className="flex justify-center items-center w-full text-[#9E9E9E] font-semibold py-2">더보기 &gt;</button>}
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal wrong-answer-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
        <ScrappedWordModal closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  )
}