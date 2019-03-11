import "antd/dist/antd.css";
import { Button, Layout, Divider } from "antd";


const { Header, Content, Footer } = Layout;
const MainHeader = (props) => (
  <Content>
    <h1>{props.title}</h1>
  </Content>
);

export default MainHeader;
