import { Table, Input, Button, Icon } from 'antd';
import { Query } from 'react-apollo';
import Highlighter from 'react-highlight-words';
import {
  getDataSource, dateSorter, estimateSorter,
} from './utilities/summaryTable.helper';
import GET_COLUMNS from './queries/getColumns';
import ErrorPage from './utilities/ErrorPage';
import LoadingPage from './utilities/LoadingPage';

class SummaryTable extends React.Component {
  state = {
    searchText: '',
    clearFilterFn: () => console.log('nothing to clear'),
    sortedInfo: null,
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
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, clearFilters)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, clearFilters)}
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

  handleSearch = (selectedKeys, confirm, clearFilters) => {
    confirm();
    this.setState({ searchText: selectedKeys[0],  clearFilterFn: clearFilters });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  render() {
    const { clearFilterFn } = this.state;
    // let { sortedInfo } = this.state;
    // sortedInfo = sortedInfo || {};

    const columns = [
      {
        title: 'Remedy Ticket',
        dataIndex: 'remedy_short_id',
        width: 180,
        sorter: (a, b) => a.remedy_short_id - b.remedy_short_id,
        sortDirections: ['descend', 'ascend'],
        // sortOrder: sortedInfo.columnKey === 'remedy_short_id' && sortedInfo.order,
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

          if (loading) {
            return <LoadingPage />
          }
          if (error) {
            return <ErrorPage />;
          }
          return (
            <div className="summary-table-container">
              <Button
                className="clear-btn"
                onClick={() => this.handleReset(clearFilterFn)}
              >
                <Icon type="delete" />
                Clear Filter
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
