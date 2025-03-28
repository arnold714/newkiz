import { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import { LuChevronLeft } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import '@shared/styles/CustomScroll.css'

export const ModifyInfoPage = () => {
    const navigate = useNavigate();
    const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

    const [selectedInterests, setSelectedInterests] = useState<string[]>([])

    const interests = ["경제", "정치", "사회", "스포츠/연예", "세계", "문화"]

    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest))
        } else {
            setSelectedInterests([...selectedInterests, interest])
        }
    }

    return (
        <div className="w-full h-full flex flex-col mt-5">
            <div className="flex flex-row justify-start items-center gap-3">
                <LuChevronLeft className="text-[25px] cursor-pointer" onClick={() => navigate(-1)} />
                <p className="font-bold text-xl">내 정보</p>
            </div>
            <div className="flex flex-col items-center w-full gap-3">
                <div className="flex flex-row justify-center my-5">
                    <img src={`${imgUrl}dinos/nico.png`} alt="user character image" className="h-20" />
                </div>
                <div className="flex flex-col items-start w-full px-3 gap-2">
                    <p className="font-semibold">닉네임</p>
                    <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" placeholder="zi승아zon" />
                </div>
                <div className="flex flex-col items-start w-full px-3 gap-2">
                    <p className="font-semibold">생년월일</p>
                    <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" placeholder="01/04/04" />
                </div>
                <div className="flex flex-col items-start w-full px-3 gap-2">
                    <p className="font-semibold">닉네임</p>
                    <input type="text" className="border-1 border-gray-200 w-full h-10 rounded-lg px-3" placeholder="화정남초등학교" />
                </div>
                <div className="flex flex-col items-start w-full px-3 gap-2">
                    <p className="font-semibold">성별</p>
                    <select className="border border-gray-200 w-full h-10 rounded-lg px-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#7CBA36] focus:border-transparent">
                        <option value="" disabled selected>
                            성별을 선택하세요
                        </option>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                    </select>
                </div>
            </div>
            <hr className="border-2 border-gray-100 w-full my-5" />
            <div className="flex flex-col items-start w-full px-3 gap-2">
                <p className="font-semibold">관심사</p>
                <div className="grid grid-cols-2 gap-3 w-full">
                    {interests.map((interest) => (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`w-full h-10 rounded-lg border flex justify-between items-center px-3 ${selectedInterests.includes(interest) ? "border-3 border-[#7CBA36] text-black bg-white" : "border-3 border-gray-200 text-black bg-white"
                                }`}
                        >
                            {interest}
                            {selectedInterests.includes(interest) ? <FaCheckCircle className="text-[#7CBA36]" /> : <FaCheckCircle className="text-gray-400" />}
                        </button>
                    ))}
                </div>
            </div>
            <hr className="border-2 border-gray-100 w-full my-5" />
            <div className="flex flex-row justify-center items-center">
                <button className="flex justify-center items-center bg-[#7CBA36] py-3 rounded-lg w-full text-white font-semibold text-lg">저장하기</button>
            </div>
        </div>
    )
}