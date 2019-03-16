import { Layout } from 'antd';
const { Content } = Layout;
import SearchArea from './SearchArea';
import SummaryTable from './SummaryTable';

const SummaryPage = () => (
  <Content>
    <SearchArea />
    <SummaryTable />
  </Content>
);

export default SummaryPage;
