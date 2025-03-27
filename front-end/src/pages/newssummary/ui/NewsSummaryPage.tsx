import Layout from '@/shared/ui/Layout';
import { useState,ChangeEvent } from 'react';
import { LuX } from "react-icons/lu";
import NewsSummaryResult from './NewsSummaryResult';
import { useNavigate } from 'react-router-dom';

export default function NewsSummaryPage() {

    const name = '뿡뿡이';
    const navigate = useNavigate();
    const [ thought, setThought ] = useState<string>('');
    const [showResult, setShowResult ] = useState<boolean>(false);

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
      setThought(e.target.value);
    };

    // 뒤로가기 버튼
    const handleBackButtonClick = () => {
      navigate('/detail')
    };
    
    const handleResultButtonClick = () => {
      setShowResult(true);
    };

    if(showResult) {
      return <NewsSummaryResult thought={thought}/>;
    }

    return (
      <Layout>
        <div className='bg-white  w-[calc(100%-70px)] mx-auto h-[calc(100%-20px)] my-5 p-5 rounded-xl'>
          <div className='flex justify-end'>
            <LuX size={30} 
              onClick={handleBackButtonClick}
            />
          </div>

          <div className='flex items-center'>
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-20 m-5 '/>
            <p className='text-3xl font-bold m-5'>{name}님의 <br /> 생각을 적어주세요!</p>
          </div>

          <div>
            <textarea 
              value={thought}
              onChange={handleChange}
              placeholder='여기에 생각을 적어주세요'
              className='w-full border-2 border-[#E6E6E6] rounded-[10px] p-3 h-100'
            />
          </div>

          <div className='flex justify-end mt-3'>
            <button className='bg-[#F8D460] w-[100px] h-[40px] rounded-[10px] text-white font-semibold text-lg shadow-[4px_4px_3px_rgba(0,0,0,0.13)]'
              onClick={handleResultButtonClick}
            >
              Ai 요약
            </button>
          </div>
          
        </div>
      </Layout>
    );
  };