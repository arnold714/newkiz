import { useState,ChangeEvent } from 'react';
import { LuX } from "react-icons/lu";
import { NewsSummaryResult } from '@/widgets/newssummary';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PostNewsSummary } from '@/widgets/newssummary';
import { PostNewsSummaryRequest } from '@/features/newssummary';
import { GetNewsSummaryResponse } from '@/features/detail/model/types';
import { useUserProfile } from "@/shared";
import Swal from 'sweetalert2';

interface LocationState {
  summaryData?: GetNewsSummaryResponse["data"];
  summary: string;
};

const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL

export default function NewsSummaryPage() {

    const userProfile = useUserProfile();
    const { id } = useParams<{id: string}>()
    const location = useLocation();
    const navigate = useNavigate();
    const [ thought, setThought ] = useState<string>('');
    const [showResult, setShowResult ] = useState<boolean>(false);
    //엔터
    const [enterCount, setEnterCount] = useState<number>(0); 
    // 요약 결과
    const [summaryResult, setSummaryResult] = useState<PostNewsSummaryRequest| null>(null); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const userName = userProfile ? userProfile.nickname : "사용자";
    const userCharacter = userProfile ? userProfile.characterId : "olaf";

    const { summaryData, summary } = (location.state as LocationState) || { summary: '' };
    console.log('summaryData, summary:',summaryData, summary)
    if (summaryData) {
      return <NewsSummaryResult summary={summary} summaryData={summaryData} />;
    };
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      
      if (newText.length > 500) {
        // 글자 수가 500자를 초과하면 경고 메시지 표시
        Swal.fire({
          title: '글자 수 초과!',
          text: '최대 500자까지만 입력 가능합니다.',
          icon: 'warning',
          confirmButtonText: '확인',
        });
      } else {
        setThought(newText); // 500자 이하일 때만 상태 업데이트
      }
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        if (enterCount >= 10) {
          e.preventDefault();
          Swal.fire({
            title: '경고!',
            text: '연속으로 엔터를 너무 많이 눌렀습니다. 더 이상 입력할 수 없습니다.',
            icon: 'warning',
            confirmButtonText: '확인',
          });
        } else {
          setEnterCount(enterCount + 1); 
        }
      }
    };

    // 뒤로가기 버튼
    const handleBackButtonClick = () => {
      navigate(-1);
    };

    // 요약 결과 버튼
    const handleResultButtonClick = async() => {
      if(thought === '') {
        Swal.fire({
          title: '경고!',
          text: ' 요약을 보려면 내용을 입력해야 합니다.',
          icon: 'warning',
          confirmButtonText: '확인',
        });
      } else if (!id) {
        setErrorMessage("잘못된 요청입니다");
      } else {
      const result = await PostNewsSummary(id, thought);
      if (result) {
        setSummaryResult(result); 
        setShowResult(true); 
        setErrorMessage(null); 

      }
    }
    };

    if (showResult && summaryResult ) {
      return <NewsSummaryResult thought={thought} summary={summary} userCharacter={userCharacter}/>;
    };


    return (
      <div className='overflow-y-auto max-h-[calc(100vh-100px)] bg-[#BFD46F]'>
        <div className='bg-white w-[calc(100%-30px)] mx-auto h-[calc(100%-20px)] my-3 p-5 rounded-xl'>
          <div className='flex justify-end'>
            <LuX size={30} 
              onClick={handleBackButtonClick}
            />
          </div>

          <div className='flex items-center'>
            
            <img src={`${imgUrl}dinos/${userCharacter}.svg`} alt="character_nico" className='w-20 m-5 '/>
            <p className='text-2xl font-bold m-3'>{userName}님의 <br /> 생각을 적어주세요!</p>
          </div>

          <div>
            <textarea 
              value={thought}
              onChange={handleChange}
              onKeyDown={handleKeyPress} //엔터 제한
              maxLength={500}  //글자수 제한
              placeholder='여기에 생각을 적어주세요'
              className='w-full bg-[#FAFAFA] border-2 border-[#E6E6E6] rounded-[10px] p-3 h-100'
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 mt-2">{errorMessage}</div>
          )}

          <div className='flex justify-end mt-3'>
            <button className='bg-[#F8D460] w-[100px] h-[40px] rounded-[10px] text-white font-semibold text-lg shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
              onClick={handleResultButtonClick}
            >
              Ai 요약
            </button>
          </div>
          
        </div>
      </div>
    );
  };