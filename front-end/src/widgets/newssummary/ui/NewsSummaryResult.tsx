import {  LuChevronsDown } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { GetNewsSummaryResponse } from "@/features/detail/model/types";

interface NewsSummaryResultProps {
    id?: string;
    thought?: string;
    summary: string; 
    summaryData?: GetNewsSummaryResponse["data"]
    userCharacter?: string;
};

const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

export const NewsSummaryResult: React.FC<NewsSummaryResultProps> = ({ thought, summary, summaryData, userCharacter }) => {
    
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>()
    const handleBackButtonClick = () => {
        navigate(`/detail/${id}?refresh=${Date.now()}`);
    }
    console.log('summary:', summary)

    return (
        <div className='overflow-y-auto max-h-[calc(100vh-100px)] bg-[#BFD46F]'>
            <div className='bg-white w-[calc(100%-30px)] mx-auto h-[calc(100%-20px)] overflow-y-auto pb-22 my-3 p-5 rounded-xl '>
                <div className='flex items-center'>
                    <img src={`${imgUrl}dinos/${userCharacter}.svg`} alt="character_nico" className='w-20 m-5 ' />
                    <p className='text-2xl font-semibold m-5'> 정말 잘하셨어요! <br /> AI가 요약한 글과 비교해 볼까요?</p>
                </div>

                <div className='w-full bg-[#FAFAFA] border-2 border-[#E6E6E6] rounded-[10px] p-3 overflow-y-auto h-[200px]'>
                <p>{ thought ? thought : summaryData?.summary }</p>
                </div>
                <div className="flex justify-center my-4">
                    <LuChevronsDown size={30} />
                </div>
                <div className='w-full bg-[#FAFAFA] border-2 border-[#E6E6E6] rounded-[10px] p-3 overflow-y-auto h-[200px]'>
                    <p>{summary}</p>
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <button className='bg-[#7CBA36] w-[150px] h-[40px] rounded-[10px] text-white font-semibold text-lg shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
                    onClick={handleBackButtonClick}
                    >
                        뉴스로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};
