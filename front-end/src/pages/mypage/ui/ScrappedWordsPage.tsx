import { LuChevronLeft } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

export const ScrappedWordsPage = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col mt-5">
            <div className="flex flex-row justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">스크랩한 단어</p>
            </div>
        </div>
    )
}