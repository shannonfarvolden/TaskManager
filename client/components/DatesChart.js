import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { Bar } from 'react-chartjs-2';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const { Content } = Layout;
const moment = require('moment');

const GET_TICKETS = gql`
  query {
    tickets {
      dev_planned_date
      ba_unit_testing_planned_date
      baanalysis_end_date
      dev_end_date
    }
  }
`;
function getDataSource(tickets, month) {
  //Todo: need to loop throug
  const dataSource = {
    labels: [...Array(moment(month, 'YYYY-MM').daysInMonth() + 1).keys()].slice(1),
    datasets: [
      {
        label: 'Specs Due',
        data: [22, 19, 27, 23, 22, 24, 17, 25, 23, 24, 20, 19],
        fill: false, // Don't fill area under the line
        borderColor: 'green' // Line color
      },
      {
        label: 'test2',
        data: [31, 11, 23, 21, 40, 43, 32, 11, 43, 54, 34, 23],
        fill: false, // Don't fill area under the line
        borderColor: 'red' // Line color
      }
    ]
  };
  return dataSource;
}

const DatesChart = props => {
  return (
    <Query query={GET_TICKETS}>
      {({ loading, error, data }) => {
        if (loading) return <div>loading...</div>;
        if (error) return <div>error...</div>;
        let month = '2019-03';
        let dataSource = {};
        if (data) {
          dataSource = getDataSource(data.tickets, month);
        }
        return (
          <Content>
            <Bar data={dataSource} />
          </Content>
        );
      }}
    </Query>
  );
};

export default DatesChart;
