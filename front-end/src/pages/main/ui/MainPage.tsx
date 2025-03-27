import Layout from '../../../shared/ui/Layout';
import ProgressGraph from './ProgressGraph';
import HotTopicNews from './HotTopicNews';
import RecommendedNews from './RecommendedNews';

export default function MainPage() {
  return (
    <Layout>
      <div className="h-screen">
        <div className='my-5 flex justify-end '>
          <ProgressGraph />
        </div>
        <div className='bg-white h-70 opacity-75 p-2'>
          <HotTopicNews />
        </div>
        <div className='mt-5'>
          <RecommendedNews />
        </div>
      </div>
    </Layout>
  )
}
