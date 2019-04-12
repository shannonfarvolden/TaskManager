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
import ALL_COLUMNS from './utilities/summaryTable.constant';
import GET_COLUMNS from './queries/getColumns';
import ErrorPage from './utilities/ErrorPage';
import LoadingPage from './utilities/LoadingPage';
import './styles/index.css';

const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

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

  callback = (key) => {
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
        title: 'PM / BA',
        dataIndex: 'pm_ba',
        width: 200,
        className: this.state.selectedColumns.includes('PM/BA') ? 'hide' : '',
        ...this.getColumnSearchProps('pm_ba'),
        render: text => {
          if (text) {
            return getInitials(text);
          }
        }
      },
      {
        title: 'Dev',
        dataIndex: 'dev',
        width: 200,
        className: this.state.selectedColumns.includes('Dev') ? 'hide' : '',
        ...this.getColumnSearchProps('dev'),
        render: text => {
          if (text) {
            return getInitials(text);
          }
        }
      },
      {
        title: 'Status',
        dataIndex: 'phase_progress_level',
        width: 180,
        className: this.state.selectedColumns.includes('Status') ? 'hide' : '',
        ...this.getColumnSearchProps('phase_progress_level')
      },
      {
        title: 'BRD Due Date',
        dataIndex: 'brd_planned_date',
        sorter: dateSorter('brd_planned_date'),
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('BRD') ? 'hide' : '',
        ...this.getColumnSearchProps('brd_planned_date')
      },
      {
        title: 'FRD Due Date',
        dataIndex: 'frd_planned_date',
        sorter: dateSorter('frd_planned_date'),
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('FRD') ? 'hide' : '',
        ...this.getColumnSearchProps('frd_planned_date')
      },
      {
        title: 'Dev Due Date',
        dataIndex: 'dev_planned_date',
        sorter: dateSorter('dev_planned_date'),
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('Dev - DueDate') ? 'hide' : '',
        ...this.getColumnSearchProps('dev_planned_date')
      },
      {
        title: 'BAT Due Date',
        dataIndex: 'ba_unit_testing_planned_date',
        sorter: dateSorter('ba_unit_testing_planned_date'),
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('BAT - DueDate') ? 'hide' : '',
        ...this.getColumnSearchProps('ba_unit_testing_planned_date')
      },
      {
        title: 'Issue',
        dataIndex: 'summary',
        width: 200,
        className: this.state.selectedColumns.includes('Issue') ? 'hide' : '',
        ...this.getColumnSearchProps('summary')
      },
      {
        title: 'Est Dev',
        dataIndex: 'dev_estimate',
        sorter: estimateSorter('dev_estimate'),
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('Dev - Estimate') ? 'hide' : '',
        ...this.getColumnSearchProps('dev_estimate')
      },
      {
        title: 'Est BA',
        dataIndex: 'ba_estimate',
        sorter: estimateSorter('ba_estimate'),
        sortDirections: ['descend', 'ascend'],
        className: this.state.selectedColumns.includes('BA - Estimate') ? 'hide' : '',
        ...this.getColumnSearchProps('ba_estimate')
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

    const children = [];
    ALL_COLUMNS.forEach(col => {
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
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select columns to hide"
                onChange={this.hideColumns}
              >
                {children}
              </Select>

              <Tabs defaultActiveKey="releaseDrf" size="large" tabBarStyle={{ letterSpacing: 1, marginTop: 20 }} onChange={this.callback}>
                <TabPane tab="Release DRFs" key="releaseDrf">
                  <Table
                    columns={this.getColumns()}
                    dataSource={dataSource}
                    pagination={{ position: 'both' }}
                    size="medium"
                    rowClassName={(record) => {
                      return (!highlight ? '' :  highlightRow(record));
                    }}
                  />
                </TabPane>
                <TabPane tab="HotList DRFs" key="hotListDrf">
                  <Table
                      columns={this.getColumns()}
                      dataSource={dataSource}
                      pagination={{ position: 'both' }}
                      size="medium"
                      rowClassName={(record) => {
                        return (!highlight ? '' :  highlightRow(record));
                      }}
                    />
                </TabPane>
              </Tabs>


            </div>
          );
        }}
      </Query>
    );
  }
}

export default SummaryTable;
