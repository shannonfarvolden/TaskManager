import 'antd/dist/antd.css';
import { Icon, Layout } from 'antd';

const { Content } = Layout;
const MainHeader = props => (
  <Content className="main-header">
    <h1>
      <span className="header-title">
        {props.title}
      </span>
      <Icon type="right-circle" className="circle-right" spin/>
      <span className="header-current-view">
        {props.currentView}
      </span>
    </h1>
  </Content>
);

export default MainHeader;
