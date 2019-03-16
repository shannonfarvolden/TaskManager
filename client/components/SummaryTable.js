import { Table } from 'antd';

const columns = [
  {
    title: 'Remedy Ticket',
    dataIndex: 'remedy_short_id',
    sorter: (a, b) => a.remedy_short_id - b.remedy_short_id,
    sortDirections: ['descend', 'ascend']
  },
  {
    title: 'PM',
    dataIndex: 'product_manager'
  },
  {
    title: 'BA',
    dataIndex: 'business_analyst_lead'
  },
  {
    title: 'Dev',
    dataIndex: 'development_lead'
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

const data = [{}];
const SummaryTable = () => (
  <div>
    <Table columns={columns} dataSource={data} />,
  </div>
);

export default SummaryTable;
