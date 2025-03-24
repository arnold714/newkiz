import Layout from '../../../shared/ui/Layout';
import ProgressGraph from './ProgressGraph';
import HotTopicNews from './HotTopicNews';

export default function MainPage() {
  return (
    <Layout>
      <div>
        <div className='my-5 flex justify-end '>
          <ProgressGraph />
        </div>
        <div className='bg-white h-70 opacity-70 p-2'>
          <HotTopicNews />
        </div>
        
      </div>
    </Layout>
  )
}
