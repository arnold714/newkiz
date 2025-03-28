import ProgressGraph from './ProgressGraph';
import HotTopicNews from './HotTopicNews';
import RecommendedNews from './RecommendedNews';

export default function MainPage() {
  return (
      <div className="h-screen">
        <div className='my-5 flex justify-center gap-18 items-center'>
          <div>
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/dinos/nico.png" alt="character_nico" className='w-40 m-3 '/>
          </div>
          <div className='flex justify-end'>
          <ProgressGraph />
          </div>
        </div>
        <div className='bg-white h-70 opacity-75 p-2'>
          <HotTopicNews />
        </div>
        <div className='mt-5'>
          <RecommendedNews />
        </div>
      </div>
  );
};
