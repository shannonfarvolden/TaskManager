import "antd/dist/antd.css";
import { Button, Layout, Divider } from "antd";

import MainLayout from '../components/MainLayout.js'
import MainHeader from "../components/MainHeader.js";

const { Header, Content, Footer } = Layout;
 
const Index = () => (
  <MainLayout>
    <Content style={{ padding: "0 50px", marginTop: 32 }}>
      <MainHeader title="DRF Header Prop"/>
      <Button shape="round">Summary</Button>
      <Button shape="round">Dates</Button>
      <Divider />

      <Button type="primary">Search</Button>
    </Content>
  </MainLayout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}


export default Index;
