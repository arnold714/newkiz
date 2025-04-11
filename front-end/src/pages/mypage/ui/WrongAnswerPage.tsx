import { useEffect, useState } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "@shared/styles/CustomScroll.css";
import Modal from "react-modal";
import { WrongAnswerModal, GetWrongAnswer } from "@/widgets/mypage";
import '@pages/mypage/styles/MyPage.css';
import { WrongAnswerItem } from "@/features/mypage";

Modal.setAppElement("#root");

export const WrongAnswerPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<WrongAnswerItem | undefined>(undefined);
    const [wrongdata, setWrongdata] = useState<WrongAnswerItem[] | undefined>();

    useEffect(() => {
        const fetchWrongAnswerData = async () => {
            const data = await GetWrongAnswer();
            setWrongdata(data);
        };

        fetchWrongAnswerData();
    }, []);

    const handleQuizDeletion = (quizId: string) => {
        if (wrongdata) {
            const updatedData = wrongdata.filter(item => item.id !== quizId);
            setWrongdata(updatedData);
            setSelectedItem(undefined);
        }
    };

    return (
        <div className="w-full h-full flex flex-col mt-5">
            <div className="flex flex-row justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">오답노트</p>
            </div>
            <div className="flex flex-col w-full items-center my-5 gap-5">
                {wrongdata?.map((data) => (
                    <div className="flex flex-col items-start w-[90%]" key={data.id}>
                        <p className="font-semibold cursor-pointer" onClick={() => {setSelectedItem(data); setIsModalOpen(true)}}>
                            {data.quiz.multipleChoiceQuiz.question}
                        </p>
                        <hr className="border-1 border-gray-100 w-full mt-2" />
                    </div>
                ))}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="modal wrong-answer-modal"
                overlayClassName="modal-overlay"
                shouldCloseOnOverlayClick={true}
            >
                <WrongAnswerModal
                    closeModal={() => setIsModalOpen(false)}
                    wrongdata={selectedItem} 
                    onQuizDeleted={handleQuizDeletion} 
                />
            </Modal>
        </div>
    );
};
