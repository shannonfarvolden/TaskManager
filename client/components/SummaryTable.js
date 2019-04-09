import { Table, Input, Button, Icon, Select, Tabs } from 'antd';
import { Query } from 'react-apollo';
import Highlighter from 'react-highlight-words';
import {
  getDataSource,
  dateSorter,
  estimateSorter,
  getInitials,
  highlightRow
} from './utilities/summaryTable.helper';
import GET_COLUMNS from './queries/getColumns';
import ErrorPage from './utilities/ErrorPage';
import LoadingPage from './utilities/LoadingPage';
import './styles/index.css';

const ButtonGroup = Button.Group;
const Option = Select.Option;
class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      clearFilterFn: () => console.log('nothing to clear'),
      sortedInfo: null,
      selectedColumns: [],
      highlight: true,
      viewHotListDRF: true
    };
    this.getColumns = this.getColumns.bind(this);
    this.hideColumns = this.hideColumns.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
    this.toggleTableView = this.toggleTableView.bind(this);
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
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
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (!!record[dataIndex]) {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#1890FF', color: 'white', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={(text || '').toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm, clearFilters) => {
    confirm();
    this.setState({ searchText: selectedKeys[0], clearFilterFn: clearFilters });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({
      searchText: ''
    });
  };

  hideColumns(value) {
    this.setState({
      selectedColumns: value
    });
  }

  toggleHighlight(event) {
    this.setState((state, props) => ({
      highlight: !state.highlight
    }));
  }

  toggleTableView(event) {
    this.setState((state, props) => ({
      viewHotListDRF: !state.viewHotListDRF
    }));
  }

  getColumns = () => {
    return [
      {
        title: 'Remedy Ticket',
        dataIndex: 'remedy_short_id',
        width: 180,
        sorter: (a, b) => a.remedy_short_id - b.remedy_short_id,
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('Remedy Ticket') ? 'hide' : '',
        ...this.getColumnSearchProps('remedy_short_id')
      },
      {
        title: 'PM',
        dataIndex: 'product_manager',
        width: 200,
        className: this.state.selectedColumns.includes('PM') ? 'hide' : '',
        ...this.getColumnSearchProps('product_manager'),
        render: text => {
          if (text) {
            return getInitials(text);
          }
        }
      },
      {
        title: 'BA',
        dataIndex: 'business_analyst_lead',
        width: 200,
        className: this.state.selectedColumns.includes('BA') ? 'hide' : '',
        ...this.getColumnSearchProps('business_analyst_lead'),
        render: text => {
          if (text) {
            return getInitials(text);
          }
        }
      },
      {
        title: 'Dev',
        dataIndex: 'development_lead',
        width: 200,
        className: this.state.selectedColumns.includes('Dev') ? 'hide' : '',
        ...this.getColumnSearchProps('development_lead'),
        render: text => {
          if (text) {
            return getInitials(text);
          }
        }
      },
      {
        title: 'QA',
        dataIndex: 'qa_lead',
        width: 200,
        className: this.state.selectedColumns.includes('QA') ? 'hide' : '',
        ...this.getColumnSearchProps('qa_lead'),
        render: text => {
          if (text) {
            return getInitials(text);
          }
        }
      },
      {
        title: 'Status',
        dataIndex: 'phase',
        width: 180,
        className: this.state.selectedColumns.includes('Status') ? 'hide' : '',
        ...this.getColumnSearchProps('phase')
      },
      {
        title: 'Due Date',
        children: [
          {
            title: 'BRD',
            dataIndex: 'brd_planned_date',
            sorter: dateSorter('brd_planned_date'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('BRD') ? 'hide' : '',
            ...this.getColumnSearchProps('brd_planned_date')
          },
          {
            title: 'FRD',
            dataIndex: 'frd_planned_date',
            sorter: dateSorter('frd_planned_date'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('FRD') ? 'hide' : '',
            ...this.getColumnSearchProps('frd_planned_date')
          },
          {
            title: 'Dev',
            dataIndex: 'dev_planned_date',
            sorter: dateSorter('dev_planned_date'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('Dev - DueDate') ? 'hide' : '',
            ...this.getColumnSearchProps('dev_planned_date')
          },
          {
            title: 'BAT',
            dataIndex: 'ba_unit_testing_planned_date',
            sorter: dateSorter('ba_unit_testing_planned_date'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('BAT - DueDate') ? 'hide' : '',
            ...this.getColumnSearchProps('ba_unit_testing_planned_date')
          },
          {
            title: 'QAT',
            dataIndex: 'qa_test_completion_planned_date',
            sorter: dateSorter('qa_test_completion_planned_date'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('QAT - DueDate') ? 'hide' : '',
            ...this.getColumnSearchProps('qa_test_completion_planned_date')
          }
        ]
      },
      {
        title: 'Issue',
        dataIndex: 'summary',
        width: 200,
        className: this.state.selectedColumns.includes('Issue') ? 'hide' : '',
        ...this.getColumnSearchProps('summary')
      },
      {
        title: 'Estimate',
        className: 'autoWidth',
        children: [
          {
            title: 'Dev',
            dataIndex: 'dev_estimate',
            sorter: estimateSorter('dev_estimate'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('Dev - Estimate') ? 'hide' : '',
            ...this.getColumnSearchProps('dev_estimate')
          },
          {
            title: 'BA',
            dataIndex: 'ba_estimate',
            sorter: estimateSorter('ba_estimate'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('BA - Estimate') ? 'hide' : '',
            ...this.getColumnSearchProps('ba_estimate')
          },
          {
            title: 'QA',
            dataIndex: 'qa_estimate',
            sorter: estimateSorter('qa_estimate'),
            sortDirections: ['descend', 'ascend'],
            className: this.state.selectedColumns.includes('QA - Estimate') ? 'hide' : '',
            ...this.getColumnSearchProps('qa_estimate')
          }
        ]
      },
      {
        title: 'Release ID',
        dataIndex: 'delivery_release_id',
        className: this.state.selectedColumns.includes('Release ID') ? 'hide' : '',
        ...this.getColumnSearchProps('delivery_release_id')
      },
      {
        title: 'Subcategory',
        dataIndex: 'product_type',
        className: this.state.selectedColumns.includes('Subcategory') ? 'hide' : '',
        ...this.getColumnSearchProps('product_type')
      },
      {
        title: 'Product',
        dataIndex: 'parent_product',
        className: this.state.selectedColumns.includes('Product') ? 'hide' : '',
        ...this.getColumnSearchProps('parent_product')
      }
    ];
  };

  render() {
    const { clearFilterFn, highlight, viewHotListDRF } = this.state;

    const allColumns = [
      'Remedy Ticket',
      'PM',
      'BA',
      'Dev',
      'QA',
      'Status',
      'BRD',
      'FRD',
      'Dev - DueDate',
      'BAT - DueDate',
      'QAT - DueDate',
      'Issue',
      'Dev - Estimate',
      'BA - Estimate',
      'QA - Estimate',
      'Release ID',
      'Subcategory',
      'Product'
    ];

    const children = [];
    allColumns.forEach(col => {
      children.push(<Option key={col}>{col}</Option>);
    });

    return (
      <Query query={GET_COLUMNS}>
        {({ loading, error, data }) => {
          let dataSource = [{}];

          if (data) {
            dataSource = getDataSource(data.tickets, viewHotListDRF);
          }

          if (loading) {
            return <LoadingPage />;
          }
          if (error) {
            return <ErrorPage />;
          }
          return (
            <div className="summary-table-container">
              <Button className="clear-btn" onClick={() => this.handleReset(clearFilterFn)}>
                <Icon type="delete" />
                Clear Filter
              </Button>
              <ButtonGroup>
                <Button onClick={this.toggleHighlight}>Highlight</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={this.toggleTableView}>
                  {viewHotListDRF ? 'View Release DRF' : 'View HotList DRF'}
                </Button>
              </ButtonGroup>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select columns to hide"
                onChange={this.hideColumns}
              >
                {children}
              </Select>
              <h1>{viewHotListDRF ? 'HotList DRfs' : 'Release DRFs'}</h1>
              <Table
                columns={this.getColumns()}
                dataSource={dataSource}
                pagination={{ position: 'both' }}
                size="medium"
                rowClassName={(record, index) => {
                  console.log('hightlight in render', highlight);
                  if (!highlight) {
                    return '';
                  }
                  return highlightRow(record);
                }}
              />
              ,
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SummaryTable;
