import { SchoolRanking } from "@/entities/game";
import { LuChevronLeft } from "react-icons/lu";

interface SchoolRankingModalProps {
    closeModal: () => void;
}

export const SchoolRankingModal = ({ closeModal }: SchoolRankingModalProps) => {

    return (
        <div className="w-full h-full flex flex-col items-center py-5">
            <div className="flex flex-row w-full justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => closeModal()} />
                <p className="font-bold text-2xl">학교 랭킹</p>
            </div>
            <SchoolRanking />
        </div>
    )
}