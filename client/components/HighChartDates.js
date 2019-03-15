import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Bar } from 'react-chartjs-2';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
const ReactHighcharts = require('react-highcharts');

const { Content } = Layout;

const GET_TICKETS = gql`
  query {
    tickets {
      baanalysis_end_date
      dev_end_date
      dev_planned_date
      production_planned_date
      production_target_date
    }
  }
`;

const HighChartDates = props => {
  const testData = {
    labels: [
      '10/04/2018',
      '10/05/2018',
      '10/06/2018',
      '10/07/2018',
      '10/08/2018',
      '10/09/2018',
      '10/10/2018',
      '10/11/2018',
      '10/12/2018',
      '10/13/2018',
      '10/14/2018',
      '10/15/2018'
    ],
    datasets: [
      {
        label: 'dev',
        data: [22, 19, 27, 23, 22, 24, 17, 25, 23, 24, 20, 19],
        fill: false, // Don't fill area under the line
        borderColor: 'green' // Line color
      },
      {
        label: 'ba',
        data: [31, 11, 23, 21, 40, 43, 32, 11, 43, 54, 34, 23],
        fill: false, // Don't fill area under the line
        borderColor: 'red' // Line color
      }
    ]
  };

  const config = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Average Rainfall'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      },
      {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
      },
      {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
      }
    ]
  };

  return (
    <Query query={GET_TICKETS}>
      {({ loading, error, data }) => {
        if (loading) return <div>loading...</div>;
        if (error) return <div>error...</div>;
        console.log(data);
        return (
          <Content>
            <ReactHighcharts config={config} />
          </Content>
        );
      }}
    </Query>
  );
};

export default HighChartDates;
