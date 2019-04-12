import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Brand from './Brand';

const { Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderNav extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { handleMenuSelection } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          breakpoint='md'
          onBreakpoint={(broken) => { console.log(broken); }}
          >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Brand collapsed={collapsed} />
            <Menu.Item key="1" onClick={handleMenuSelection}>
              <Icon type="table" />
              <span>Summary</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={handleMenuSelection}>
              <Icon type="pie-chart" />
              <span>Dates</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="desktop" />
              <span>Resource Tracker</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="4">Tom</Menu.Item>
              <Menu.Item key="5">Bill</Menu.Item>
              <Menu.Item key="6">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="7">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ margin: '0 1rem' }}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

export default SiderNav;
