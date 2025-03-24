import Layout from '../../../shared/ui/Layout';
import ProgressGraph from './ProgressGraph';

export default function MainPage() {
  return (
    <Layout>
      <div>
        <div className='my-5 flex justify-end '>
          <ProgressGraph />
        </div>
      </div>
    </Layout>
  )
}
