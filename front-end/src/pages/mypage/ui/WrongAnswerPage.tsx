import { useState } from "react";
import { LuChevronLeft } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import "@shared/styles/CustomScroll.css"
import Modal from "react-modal"
import { WrongAnswerModal } from "@/widgets/mypage";
import '@pages/mypage/styles/MyPage.css'

Modal.setAppElement("#root")

export const WrongAnswerPage = () => {
    const [isSelected, setIsSelected] = useState<string>("전체");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const categories: string[] = ["전체", "경제", "정치", "사회", "스포츠/연예", "세계", "문화"];
    const questions: string[] = [
        "재형이는 장염에 걸렸다.",
        "태연이는 예비군에 간다.",
        "승아는 조퇴했다."
    ]

    const selectCategory = (category: string) => {
        setIsSelected(category);
    }

    return (
        <div className="w-full h-full flex flex-col mt-5">
            <div className="flex flex-row justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">오답노트</p>
            </div>
            <div className="flex flex-col items-center w-full my-5">
                <div className="flex flex-row items-center justify-start overflow-x-auto w-[90%] gap-4 whitespace-nowrap scroll">
                    {categories.map((category) => (
                        <div className={`py-1 px-4 flex justify-center items-center rounded-lg border-1 shrink-0 cursor-pointer ${isSelected === category ? 'border-[#7CBA36] bg-[#7CBA36] text-white' : 'border-[#d4d4d4] text-[#757575]'}`} onClick={()=>selectCategory(category)}>
                            <p>{category}</p>
                        </div>
                    ))}
                </div>
            </div> 
            <div className="flex flex-col w-full items-center my-5 gap-5">
                {questions.map((question) => (
                    <div className="flex flex-col items-start w-[90%]">
                        <p className="font-semibold cursor-pointer" onClick={()=>{setIsModalOpen(true)}}>{question}</p>
                        <hr className ="border-1 border-gray-100 w-full mt-2"/>
                    </div>
                ))}
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal wrong-answer-modal" overlayClassName="modal-overlay" shouldCloseOnOverlayClick={true}>
                <WrongAnswerModal closeModal={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    )
}