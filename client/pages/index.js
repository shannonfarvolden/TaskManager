import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { MainLayout, MainHeader, DatesChart, SummaryTable } from '../components';
import '../components/styles/index.css';

const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'summary'
    };
  }

  static getInitialProps = function() {
    return {};
  };

  handleView = props => {
    const index = parseInt(props.key) - 1;
    const menuList = ['summary', 'dates'];
    this.setState({
      currentView: menuList[index]
    })
  }

  render() {
    let { currentView } = this.state;
    return (
      <MainLayout handleMenuSelection={this.handleView}>
        <MainHeader title="DRF TRACKER" currentView={currentView} />
        {currentView === 'summary' ? <SummaryTable /> : <DatesChart />}
      </MainLayout>
    );
  }
}

export default Index;
