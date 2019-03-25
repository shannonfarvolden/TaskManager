import { Icon } from 'antd';

const ErrorPage = () => (
  <div className='loading-error'>
    <Icon
      type="exclamation-circle"
      style={{ marginRight: 20, fontSize: 50, color: 'maroon' }}/>
    <h2>Error</h2>
  </div>
);

export default ErrorPage;
