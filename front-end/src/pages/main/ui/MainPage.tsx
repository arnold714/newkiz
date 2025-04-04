import { HotTopic, ProgressGraph, RecommendedNews } from '@/widgets/main';
import "@shared/styles/CustomScroll.css"

export default function MainPage() {
  return (
      <div className="h-screen flex flex-col overflow-auto scroll pb-20">
        <div className='my-5 flex justify-center min-gap-2 gap-[10vw]  items-center'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[#7CBA36] text-[20px] font-extrabold text-stroke-1 mb-0'>zi재형zon</p>
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-[60%] min-w-25 sm:w-35 mt-0'/>
          </div>
          <div className='flex justify-center'>
          <ProgressGraph />
          </div>
        </div>
        <div className='bg-white/60 h-auto p-2'>
          <div className="text-2xl font-bold text-center m-3">
            Today's TOP 10
          </div>
          <HotTopic />
        </div>
        <div className='mt-5'>
          <div className="text-2xl font-bold text-center m-3">
            zi재형zon 님을 위한 추천 뉴스
          </div>
          <RecommendedNews />
        </div>
      </div>
  );
};
