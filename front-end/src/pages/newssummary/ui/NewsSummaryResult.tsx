
import { LuX, LuChevronsDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface NewsSummaryResultProps {
    thought: string;
}

export default function NewsSummaryResult({thought}: NewsSummaryResultProps) {
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate('/detail')
    }
    return (
        <div className='bg-white  w-[calc(100%-70px)] mx-auto max-h-[calc(100vh-100px)] overflow-y-auto pb-22 my-5 p-5 rounded-xl '>
            <div className='flex justify-end'>
            <LuX size={30} 
                onClick={handleBackButtonClick}
                />
            </div>

            <div className='flex items-center'>
                <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-20 m-5 '/>
                <p className='text-2xl font-semibold m-5'> 정말 잘하셨어요! <br /> AI가 요약한 글과 비교해 볼까요?</p>
            </div>
            
            <div className='w-full bg-[#FAFAFA] border-2 border-[#E6E6E6] rounded-[10px] p-3 overflow-y-auto h-[200px]'>
                <p>{thought}</p>
            </div>
            <div className="flex justify-center my-4">
                <LuChevronsDown 
                    size={30} 
                />
            </div>
            <div className='w-full bg-[#FAFAFA] border-2 border-[#E6E6E6] rounded-[10px] p-3 overflow-y-auto h-[200px]'>
                ai 뉴스 요약 결과 나오는 칸
            </div>

            <div className="flex justify-end gap-3 mt-5">
                <button className='bg-[#7CBA36] w-[100px] h-[40px] rounded-[10px] text-white font-semibold text-lg shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
                >
                저장하기
                </button>
            </div>
        </div>
    );
  };