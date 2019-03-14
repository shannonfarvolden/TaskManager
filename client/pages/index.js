import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Layout, Divider, Row, Col } from 'antd';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../components/MainLayout.js';
import MainHeader from '../components/MainHeader.js';
import DatesChart from '../components/DatesChart.js';
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
  }

  viewDates = event => {
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
        <Content className="main-content">
          <MainHeader title="DRF Header Prop" />
          <Row gutter={16}>
            <Col className="gutter-row" span={2} >
              <Button shape="round" onClick={this.viewSummary} value="summary">
                Summary
              </Button>
            </Col>
            <Col className="gutter-row" span={2} >
              <Button shape="round" onClick={this.viewDates} value="dates">
                Dates
              </Button>
            </Col>
          </Row>
          <Divider />
        </Content>
        <div>{currentView === 'summary' ? <h1>in summary</h1> : <DatesChart />}</div>
      </MainLayout>
    );
  }
}

export default Index;
