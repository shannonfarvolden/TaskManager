import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Divider } from 'antd';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import {
  MainLayout,
  MainHeader,
  DatesChart,
  SummaryPage,
  Pills,
  HighChartDates
} from '../components';
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

  viewSummary = event => {
    //TODO Call Axios
    event.preventDefault();
    console.log(event.currentTarget.value);
    this.setState({
      currentView: 'summary'
    });
  };

  viewDates = event => {
    //TODO Call Axios
    event.preventDefault();
    console.log(event.currentTarget.value);
    this.setState({
      currentView: 'dates'
    });
  };

  render() {
    let { currentView } = this.state;
    return (
      <MainLayout>
        <Content className="main-content">
          <MainHeader title="DRF Header Prop" />
          <Pills viewDates={this.viewDates} viewSummary={this.viewSummary} />
          <Divider />
        </Content>
        {currentView === 'summary' ? <SummaryPage /> : <HighChartDates />}
      </MainLayout>
    );
  }
}

export default Index;
