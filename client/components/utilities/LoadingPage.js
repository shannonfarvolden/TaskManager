import { Spin } from 'antd';

const LoadingPage = () => (
  <div className='loading-summary-table'>
    <h2>Loading...</h2>
    <Spin size="large" style={{ margin: 50 }}/>
  </div>
);

export default LoadingPage;
