import { Table, Input, Button, Icon, } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Highlighter from 'react-highlight-words';
import { getDataSource } from './utilities/summaryTable.helper';

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

class SummaryTable extends React.Component {
  state = {
    searchText: '',
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (!!record[dataIndex]) {
        return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
      }
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#1890FF', color: 'white', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={(text || '').toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const columns = [
      {
        title: 'Remedy Ticket',
        dataIndex: 'remedy_short_id',
        sorter: (a, b) => a.remedy_short_id - b.remedy_short_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('remedy_short_id'),
      },
      {
        title: 'PM',
        dataIndex: 'product_manager',
        width: 500,
        ...this.getColumnSearchProps('product_manager'),
      },
      {
        title: 'BA',
        dataIndex: 'business_analyst_lead',
        width: 50,
        ...this.getColumnSearchProps('business_analyst_lead'),
      },
      {
        title: 'Dev',
        dataIndex: 'development_lead',
        width: 50,
        ...this.getColumnSearchProps('development_lead'),
      },
      {
        title: 'QA',
        dataIndex: 'qa_lead',
        ...this.getColumnSearchProps('qa_lead'),
      },
      {
        title: 'Status',
        dataIndex: 'phase',
        ...this.getColumnSearchProps('phase'),
      },
      {
        title: 'BRD Due Date',
        dataIndex: 'brd_planned_date',
        ...this.getColumnSearchProps('brd_planned_date'),
      },
      {
        title: 'FRD Due Date',
        dataIndex: 'frd_planned_date',
        ...this.getColumnSearchProps('frd_planned_date'),
      },
      {
        title: 'Dev Due Date',
        dataIndex: 'dev_planned_date',
        ...this.getColumnSearchProps('dev_planned_date'),
      },
      {
        title: 'BAT Due Date',
        dataIndex: 'ba_unit_testing_planned_date',
        ...this.getColumnSearchProps('ba_unit_testing_planned_date'),
      },
      {
        title: 'QAT Due Date',
        dataIndex: 'qa_test_completion_planned_date',
        ...this.getColumnSearchProps('qa_test_completion_planned_date'),
      },
      {
        title: 'Issue',
        dataIndex: 'summary',
        ...this.getColumnSearchProps('summary'),
      },
      {
        title: 'Dev Estimate',
        dataIndex: 'dev_estimate',
        ...this.getColumnSearchProps('dev_estimate'),
      },
      {
        title: 'BA Estimate',
        dataIndex: 'ba_estimate',
        ...this.getColumnSearchProps('ba_estimate'),
      },
      {
        title: 'QA Estimate',
        dataIndex: 'qa_estimate',
        ...this.getColumnSearchProps('qa_estimate'),
      },
      {
        title: 'Release ID',
        dataIndex: 'delivery_release_id',
        ...this.getColumnSearchProps('delivery_release_id'),
      },
      {
        title: 'Subcategory',
        dataIndex: 'product_type',
        ...this.getColumnSearchProps('product_type'),
      },
      {
        title: 'Product',
        dataIndex: 'parent_product',
        ...this.getColumnSearchProps('parent_product'),
      }
    ];

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
            <div style={{ paddingTop: 20 }}>
              <Button icon="delete" className="clear-btn" disabled>
                Clear Search
              </Button>
              <Table columns={columns} dataSource={dataSource} size="middle" />,
            </div>
          );
        }}
      </Query>
    );
  }



}

export default SummaryTable;
