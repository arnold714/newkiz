import ProgressGraph from './ProgressGraph';
import RecommendedNews from './RecommendedNews';
import { HotTopic } from '@/widgets/main';

import "@shared/styles/CustomScroll.css"

export default function MainPage() {
  return (
      <div className="h-screen flex flex-col overflow-auto scroll">
        <div className='my-5 flex justify-center gap-18 items-center '>
          <div>
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-40 m-3 '/>
          </div>
          <div className='flex justify-end'>
          <ProgressGraph />
          </div>
        </div>
        <div className='bg-white/60 h-auto p-2'>
          <HotTopic />
        </div>
        <div className='mt-5'>
          <RecommendedNews />
        </div>
      </div>
  );
};
