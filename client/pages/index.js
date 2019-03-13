import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Layout, Divider } from 'antd';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../components/MainLayout.js';
import MainHeader from '../components/MainHeader.js';
import DatesChart from '../components/DatesChart.js';

const { Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'summary'
    };

    this.viewSummary = this.viewSummary.bind(this);
    this.viewDates = this.viewDates.bind(this);
  }

  static getInitialProps = function() {
    return {};
  };

  viewSummary(event) {
    //TODO Call Axios
    event.preventDefault();
    console.log(event.currentTarget.value);
    this.setState({
      currentView: 'summary'
    });
  }

  viewDates(event) {
    //TODO Call Axios
    event.preventDefault();
    console.log(event.currentTarget.value);
    this.setState({
      currentView: 'dates'
    });
  }

  render() {
    let { currentView } = this.state;
    return (
      <MainLayout>
        <Content style={{ padding: '0 50px', marginTop: 32 }}>
          <MainHeader title="DRF Header Prop" />
          <Button shape="round" onClick={this.viewSummary} value="summary">
            Summary
          </Button>
          <Button shape="round" onClick={this.viewDates} value="dates">
            Dates
          </Button>
          <Divider />
        </Content>
        <div>{currentView === 'summary' ? <h1>in summary</h1> : <DatesChart />}</div>
      </MainLayout>
    );
  }
}

export default Index;
