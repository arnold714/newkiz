import { myInfoModal, scrapModal } from "@/features/mypage"
import { LuChevronRight } from "react-icons/lu"
import { useDispatch } from "react-redux"

export const UserActivity = () => {
  const dispatch = useDispatch()

  const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL

  return (
    <div className="w-full h-full flex flex-col items">
      <p className="font-semibold">나의 활동</p>
      <div className="w-full flex flex-row items-center justify-center mt-3">
        <div className="w-[90%] flex flex-col justify-center items-center font-semibold">
          <div className="w-full py-3 flex flex-row justify-between items-center cursor-pointer">
            <div className="flex flex-row items-center gap-5">
              <img src={`${imgUrl}assets/summary.png`} alt="AI summary" className="h-10 " />
              <p>AI 요약</p>
            </div>
            <LuChevronRight className="text-[25px] text-gray-500" />
          </div>
          <div className="w-full py-3 flex flex-row justify-between items-center cursor-pointer">
            <div className="flex flex-row items-center gap-5">
              <img src={`${imgUrl}assets/wrong_answer.png`} alt="wrong answer summary" className="h-10" />
              <p>오답노트</p>
            </div>
            <LuChevronRight className="text-[25px] text-gray-500" />
          </div>
          <div className="w-full py-3 flex flex-row justify-between items-center cursor-pointer" onClick={() => dispatch(scrapModal())}>
            <div className="flex flex-row items-center gap-5">
              <img src={`${imgUrl}assets/bookmark.png`} alt="scrap" className="h-10" />
              <p>스크랩</p>
            </div>
            <LuChevronRight className="text-[25px] text-gray-500" />
          </div>
          <div className="w-full py-3 flex flex-row justify-between items-center cursor-pointer" onClick={() => dispatch(myInfoModal())}>
            <div className="flex flex-row items-center gap-5">
              <img src={`${imgUrl}assets/myinfo.png`} alt="my information" className="h-10" />
              <p>내 정보</p>
            </div>
            <LuChevronRight className="text-[25px] text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  )
}
