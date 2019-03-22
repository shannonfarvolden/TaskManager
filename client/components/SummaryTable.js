import { Table, Input, Button, Icon, Spin } from 'antd';
import { Query } from 'react-apollo';
import Highlighter from 'react-highlight-words';
import {
  getDataSource, dateSorter, estimateSorter,
} from './utilities/summaryTable.helper';
import GET_COLUMNS from './queries/getColumns';

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
        width: 180,
        sorter: (a, b) => a.remedy_short_id - b.remedy_short_id,
        sortDirections: ['descend', 'ascend'],
        ...this.getColumnSearchProps('remedy_short_id'),
      },
      {
        title: 'PM',
        dataIndex: 'product_manager',
        width: 200,
        ...this.getColumnSearchProps('product_manager'),
      },
      {
        title: 'BA',
        dataIndex: 'business_analyst_lead',
        width: 200,
        ...this.getColumnSearchProps('business_analyst_lead'),
      },
      {
        title: 'Dev',
        dataIndex: 'development_lead',
        width: 200,
        ...this.getColumnSearchProps('development_lead'),
      },
      {
        title: 'QA',
        dataIndex: 'qa_lead',
        width: 200,
        ...this.getColumnSearchProps('qa_lead'),
      },
      {
        title: 'Status',
        dataIndex: 'phase',
        width: 180,
        ...this.getColumnSearchProps('phase'),
      },
      {
        title: 'Due Date',
        children: [{
          title: 'BRD',
          dataIndex: 'brd_planned_date',
          sorter: dateSorter('brd_planned_date'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('brd_planned_date'),
        }, {
          title: 'FRD',
          dataIndex: 'frd_planned_date',
          sorter: dateSorter('frd_planned_date'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('frd_planned_date'),
        }, {
          title: 'Dev',
          dataIndex: 'dev_planned_date',
          sorter: dateSorter('dev_planned_date'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('dev_planned_date'),
        }, {
          title: 'BAT',
          dataIndex: 'ba_unit_testing_planned_date',
          sorter: dateSorter('ba_unit_testing_planned_date'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('ba_unit_testing_planned_date'),
        }, {
          title: 'QAT',
          dataIndex: 'qa_test_completion_planned_date',
          sorter: dateSorter('qa_test_completion_planned_date'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('qa_test_completion_planned_date'),
        }]
      },
      {
        title: 'Issue',
        dataIndex: 'summary',
        width: 200,
        ...this.getColumnSearchProps('summary'),
      },
      {
        title: 'Estimate',
        children: [{
          title: 'Dev',
          dataIndex: 'dev_estimate',
          sorter: estimateSorter('dev_estimate'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('dev_estimate'),
        }, {
          title: 'BA',
          dataIndex: 'ba_estimate',
          sorter: estimateSorter('ba_estimate'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('ba_estimate'),
        }, {
          title: 'QA',
          dataIndex: 'qa_estimate',
          sorter: estimateSorter('qa_estimate'),
          sortDirections: ['descend', 'ascend'],
          ...this.getColumnSearchProps('qa_estimate'),
        }]
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

          if (loading) return (
            <div className='loading-summary-table'>
              <h2>Loading...</h2>
              <Spin size="large" style={{ margin: 50 }}/>
            </div>
          );
          if (error) return (
            <div className='loading-error'>
              <Icon
                type="exclamation-circle"
                style={{ marginRight: 20, fontSize: 50, color: 'maroon' }}/>
              <h2>Error</h2>
            </div>
          );
          return (
            <div className="summary-table-container">
              <Button className="clear-btn" disabled>
                <Icon type="delete" />
                Clear Search
              </Button>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ position: 'both' }}
                size='medium'
                />,
            </div>
          );
        }}
      </Query>
    );
  }



}

export default SummaryTable;
