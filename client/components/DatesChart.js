import 'antd/dist/antd.css';
import { Button, Layout, Divider } from 'antd';
import { Bar } from 'react-chartjs-2';

const { Content } = Layout;

const DatesChart = props => {
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
        label: 'test1',
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

  return (
    <Content>
      <Bar data={testData} />
    </Content>
  );
};

export default DatesChart;