import 'antd/dist/antd.css';
import { Button, Layout, Divider } from 'antd';

const { Header, Content, Footer } = Layout;
const Index = ({ data: { tickets } }) => {
  debugger;
  return (
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
};

// export default graphql(gql`
//   type Query {
//     tickets: [Ticket]
//   }

//   type Ticket {
//     id: ID!
//     summary: String
//   }
// `)(Index);
export default Index;
