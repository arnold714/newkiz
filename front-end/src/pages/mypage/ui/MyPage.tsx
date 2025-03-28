import { UserProfile, UserStatistic, RankingSelect, UserActivity } from "@/widgets/mypage"
import Modal from "react-modal"
import "../styles/MyPage.css"
import { Outlet, useLocation } from "react-router-dom"
import '@shared/styles/CustomScroll.css'

Modal.setAppElement("#root")

export default function MyPage() {
  const location = useLocation()

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-auto scroll">
      {
        location.pathname === "/mypage" ? (
          <>
            <div className="w-[90%] h-16 flex flex-row justify-start items-center mx-auto my-5">
              {/* <LuChevronLeft className="text-[25px]" /> */}
              <p className="text-2xl font-bold">마이페이지</p>
            </div>
            <div className="h-40 w-[90%] flex flex-row justify-center items-center my-5">
              <UserProfile />
            </div>
            <hr className="w-full h-[5px] border-3 border-gray-100"></hr>
            <div className="w-[90%] flex flex-row justify-center my-5">
              <UserStatistic />
            </div>
            <hr className="w-full h-[5px] border-3 border-gray-100"></hr>
            <div className="w-[90%] flex flex-row justify-center my-5">
              <RankingSelect />
            </div>
            <hr className="w-full h-[5px] border-3 border-gray-100"></hr>
            <div className="w-[90%] flex flex-row justify-center my-5">
              <UserActivity />
            </div>
            <div className="w-[90%] flex flex-row justify-center mb-23">
              <p className="text-sm text-gray-400">개인정보처리방침 · 이용약관</p>
            </div>
          </>
        ) : (
          <div className="w-[90%] flex flex-row justify-center mb-23">
            <Outlet />
          </div>
        )
      }
    </div>
  )
}
