import { useState } from "react";
import Modal from "react-modal"
import { SchoolRankingModal } from "./SchoolRankingModal";
import { PersonalRankingModal } from "./PersonalRankingModal";
import '@pages/mypage/styles/MyPage.css';

Modal.setAppElement("#root")

export const RankingSelect = () => {
    const [isSchoolRankModalOpen, setIsSchoolRankModalOpen] = useState<boolean>(false);
    const [isPersonalRankModalOpen, setIsPersonalRankModalOpen] = useState<boolean>(false);

    const imgUrl = import.meta.env.VITE_AWS_S3_BASE_URL;

    return (
        <div className="w-full h-full flex flex-col items">
            <p className="font-semibold text-xl">게임 랭킹</p>
            <div className="w-full flex flex-row items-center justify-center">
                <div className="w-[80%] flex flex-row items-center justify-evenly">
                    <div className="relative cursor-pointer rounded-xl shadow-lg w-2/5 aspect-square flex justify-center items-center hover:scale-110" onClick={()=>{setIsSchoolRankModalOpen(true)}}>
                        <div className="flex flex-col items-center justify-center absolute">
                            <img src={`${imgUrl}assets/school_rank.png`} alt="school ranking" className="w-[50%] h-[50%]" />
                            <p className="font-semibold">학교 랭킹</p>
                        </div>
                    </div>
                    <div className="relative cursor-pointer rounded-xl shadow-lg w-2/5 aspect-square flex justify-center items-center hover:scale-110" onClick={()=>{setIsPersonalRankModalOpen(true)}}>
                        <div className="flex flex-col items-center justify-center absolute">
                            <img src={`${imgUrl}assets/personal_rank.png`} alt="personal ranking" className="w-[50%] h-[50%]" />
                            <p className="font-semibold">개인 랭킹</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isSchoolRankModalOpen} onRequestClose={() => setIsSchoolRankModalOpen(false)} className="modal ranking-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
                <SchoolRankingModal closeModal={() => setIsSchoolRankModalOpen(false)} />
            </Modal>
            <Modal isOpen={isPersonalRankModalOpen} onRequestClose={() => setIsPersonalRankModalOpen(false)} className="modal ranking-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
                <PersonalRankingModal closeModal={() => setIsPersonalRankModalOpen(false)} />
            </Modal>
        </div>
    )
}