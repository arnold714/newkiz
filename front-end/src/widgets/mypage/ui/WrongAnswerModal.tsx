import { LuChevronLeft } from "react-icons/lu"

interface WrongAnswerModalProps {
    closeModal: () => void;
}

export const WrongAnswerModal = ({ closeModal }: WrongAnswerModalProps) => {

    return (
        <div className="w-full h-[90%] flex flex-col items-center mt-5 overflow-auto scroll">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
                <p className="font-bold text-2xl">해설</p>
            </div>
            <div className="flex flex-col w-[90%] items-start mt-5 gap-5">
                <p className="font-semibold font-[#929292] text-lg">문제</p>
                <p className="font-semibold">주저리 주저리</p>
                <div className="flex flex-row w-full justify-end">
                    <p className="px-5 py-1 bg-[#7CBA36] text-white rounded-lg"> 정답: 띠용</p>
                </div>
            </div>
            <div className="flex flex-col w-[90%] items-start mt-5 gap-5">
                <p className="font-semibold font-[#929292] text-lg">해설</p>
                <p className="font-semibold">이래서 저래서</p>
            </div>
        </div>
    )
}