import { Layout } from 'antd';
const { Content } = Layout;
import SearchAreaTwo from './SearchAreaTwo';

const SummaryPage = () => (
  <Content>
    <SearchAreaTwo />
    <h1>Search Result</h1>
  </Content>
);

export default SummaryPage;
