import 'antd/dist/antd.css';
import { Button, Layout, Divider } from 'antd';

const { Header, Content, Footer } = Layout;
const Index = () => (
  <Layout>
    <Header />
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <h3>Dates</h3>
      <Divider />
      <Button type="primary">Search</Button>
    </Content>
    <Footer />
  </Layout>
);

export default Index;
