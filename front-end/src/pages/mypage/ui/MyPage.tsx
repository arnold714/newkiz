import { LuChevronLeft } from "react-icons/lu"
import { UserProfile, UserStatistic, RankingSelect, UserActivity, ScrapModal } from "@/widgets/mypage"
import Modal from "react-modal"
import { useSelector } from "react-redux"
import { selectMyInfoModalState, selectScrapModalState, selectSummaryModalState, selectWrongAnswerModalState } from "@/features/mypage/model/selector"
import "../styles/MyPage.css"
import { MyInfoModal } from "../../../widgets/mypage/ui/MyInfoModal"
import { useDispatch } from "react-redux"
import { myInfoModal, scrapModal, summaryModal, wrongAnswerModal } from "@/features/mypage"

Modal.setAppElement("#root")

export default function MyPage() {
  const dispatch = useDispatch()

  const summaryModalIsOpen = useSelector(selectSummaryModalState)
  const wrongAnswerModalIsOpen = useSelector(selectWrongAnswerModalState)
  const scrapModalIsOpen = useSelector(selectScrapModalState)
  const myInfoModalIsOpen = useSelector(selectMyInfoModalState)

  const handleCloseSummaryModal = () => {
    dispatch(summaryModal())
  }

  const handleCloseWrongAnswerModal = () => {
    dispatch(wrongAnswerModal())
  }

  const handleCloseScrapModal = () => {
    dispatch(scrapModal())
  }

  const handleCloseMyInfoModal = () => {
    dispatch(myInfoModal())
  }

  return (
    <div className="h-screen w-full flex flex-col items-center overflow-auto">
      <div className="w-[90%] h-16 flex flex-row justify-start items-center mx-auto my-5">
        <LuChevronLeft className="text-[25px]" />
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
      <Modal isOpen={scrapModalIsOpen} onRequestClose={handleCloseScrapModal} className="modal my-info-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
        <ScrapModal />
      </Modal>
      <Modal isOpen={myInfoModalIsOpen} onRequestClose={handleCloseMyInfoModal} className="modal my-info-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
        <MyInfoModal />
      </Modal>
    </div>
  )
}
