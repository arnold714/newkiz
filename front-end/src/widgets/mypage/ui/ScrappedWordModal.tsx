import { LuChevronLeft } from "react-icons/lu";

interface ScrappedWordModalProps {
    closeModal: () => void;
}

export const ScrappedWordModal = ({ closeModal }: ScrappedWordModalProps) => {

    return (
        <div className="w-full h-[90%] flex flex-col items-center mt-5 overflow-auto scroll relative">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
                <p className="font-bold text-2xl">스크랩한 단어</p>
            </div>
            <div className="flex flex-col w-[90%] items-start mt-5 gap-5">
                <p className="font-semibold font-[#929292] text-lg">확정기변</p>
                <p className="font-semibold">'확정 기기변경'의 줄임말로, 유심기변과 동일하지만 새로 구입한 핸드폰의 소유권을 등록하는 것이다. 핸드폰이 도난될 경우에 타인이 해당 핸드폰을 사용할 수 없게끔 보호하는 역할을 하기도 한다.</p>
                {/* <div className="flex flex-row w-full justify-end">
                    <p className="px-5 py-1 bg-[#7CBA36] text-white rounded-lg"> 정답: 띠용</p>
                </div> */}
            </div>
            <div className="absolute bottom-0">
                <p className="py-2 px-20 bg-[#7CBA36] rounded-lg text-white font-bold cursor-pointer" onClick={() => closeModal()}>닫기</p>
            </div>
        </div>
    )
}