import { Layout } from 'antd';
const { Content } = Layout;
import SearchArea from './SearchArea';
import SearchResult from './SearchResult';

const SummaryPage = () => (
  <Content>
    <SearchArea />
    <SearchResult />
  </Content>
);

export default SummaryPage;
