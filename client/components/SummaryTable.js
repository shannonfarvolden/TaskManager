import { Table } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_COLUMNS = gql`
  query {
    tickets {
      remedy_short_id
      product_manager
      business_analyst_lead
      development_lead
      qa_lead
      phase
      brd_planned_date
      frd_planned_date
      dev_planned_date
      ba_unit_testing_planned_date
      qa_test_completion_planned_date
      summary
      dev_estimate
      ba_estimate
      qa_estimate
      delivery_release_id
      product_type
      parent_product
    }
  }
`;

const columns = [
  {
    title: 'Remedy Ticket',
    dataIndex: 'remedy_short_id',
    sorter: (a, b) => a.remedy_short_id - b.remedy_short_id,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'PM',
    dataIndex: 'product_manager',
    width: 500
  },
  {
    title: 'BA',
    dataIndex: 'business_analyst_lead',
    width: 50
  },
  {
    title: 'Dev',
    dataIndex: 'development_lead',
    width: 50
  },
  {
    title: 'QA',
    dataIndex: 'qa_lead'
  },
  {
    title: 'Status',
    dataIndex: 'phase'
  },
  {
    title: 'BRD Due Date',
    dataIndex: 'brd_planned_date'
  },
  {
    title: 'FRD Due Date',
    dataIndex: 'frd_planned_date'
  },
  {
    title: 'Dev Due Date',
    dataIndex: 'dev_planned_date'
  },
  {
    title: 'BAT Due Date',
    dataIndex: 'ba_unit_testing_planned_date'
  },
  {
    title: 'QAT Due Date',
    dataIndex: 'qa_test_completion_planned_date'
  },
  {
    title: 'Issue',
    dataIndex: 'summary'
  },
  {
    title: 'Dev Estimate',
    dataIndex: 'dev_estimate'
  },
  {
    title: 'BA Estimate',
    dataIndex: 'ba_estimate'
  },
  {
    title: 'QA Estimate',
    dataIndex: 'qa_estimate'
  },
  {
    title: 'Release ID',
    dataIndex: 'delivery_release_id'
  },
  {
    title: 'Subcategory',
    dataIndex: 'product_type'
  },
  {
    title: 'Product',
    dataIndex: 'parent_product'
  }
];

function removeEmailDomain(emails) {
  if (!emails) return;
  const emailArr = emails.split(',');
  let nameOnlyArr = [];
  emailArr.forEach(email => {
    email.lastIndexOf('@') >= 0
      ? nameOnlyArr.push(email.substring(0, email.lastIndexOf('@')))
      : nameOnlyArr.push(email);
  });

  return nameOnlyArr.join();
}

function formatDate(dateObj) {
  if (dateObj) {
    let date = new Date(dateObj);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  return null;
}

function getDataSource(tickets) {
  let dataSource = [];
  tickets.forEach((ticket, index) => {
    ticket.product_manager = removeEmailDomain(ticket.product_manager);
    ticket.business_analyst_lead = removeEmailDomain(ticket.business_analyst_lead);
    ticket.development_lead = removeEmailDomain(ticket.development_lead);
    ticket.qa_lead = removeEmailDomain(ticket.qa_lead);
    ticket.brd_planned_date = formatDate(ticket.brd_planned_date);
    ticket.frd_planned_date = formatDate(ticket.frd_planned_date);
    ticket.dev_planned_date = formatDate(ticket.dev_planned_date);
    ticket.ba_unit_testing_planned_date = formatDate(ticket.ba_unit_testing_planned_date);
    ticket.qa_test_completion_planned_date = formatDate(ticket.qa_test_completion_planned_date);
    let tableRow = { key: index };
    tableRow = { ...tableRow, ...ticket };
    dataSource.push(tableRow);
  });
  return dataSource;
}
const SummaryTable = () => {
  return (
    <Query query={GET_COLUMNS}>
      {({ loading, error, data }) => {
        let dataSource = [{}];
        if (data) {
          dataSource = getDataSource(data.tickets);
        }

        if (loading) return <div>loading...</div>;
        if (error) return <div>error...</div>;
        return (
          <div>
            <Table columns={columns} dataSource={dataSource} size="middle" />,
          </div>
        );
      }}
    </Query>
  );
};

export default SummaryTable;
