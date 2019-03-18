import {
  Form, Row, Col, Input, Button, Icon, Select, Checkbox
} from 'antd';
const { Option } = Select;

class SearchAreaComponent extends React.Component {

  getTextSearchFields() {
    const { getFieldDecorator } = this.props.form;
    const textSearchFields = ['Release ID', 'DM', 'PM', 'BA', 'DEV'];

    return textSearchFields.map(fieldName => (
      <Col span={4} key={fieldName}>
        <Form.Item label={fieldName}>
          {getFieldDecorator(fieldName, {
            rules: [{
              message: 'Input something!',
            }],
          })(
            <Input placeholder={fieldName} size='large' />
          )}
        </Form.Item>
      </Col>
    ));
  }

  getDropdownFields() {
    const { getFieldDecorator } = this.props.form;
    const fieldName = "Dedicated?";
    const fieldOptions = ['Yes', 'No'].map(option => (
      <Option value={option} key={option}>{option}</Option>
    ));

    return (
      <Col span={4} key={fieldName}>
        <Form.Item label={fieldName}>
          {getFieldDecorator(fieldName, {
            valuePropName: 'value',
          })(
            <Select size="large" placeholder={fieldName} >
              {fieldOptions}
            </Select>
          )}
        </Form.Item>
      </Col>
    );
  }

  getCheckboxFields() {
    const { getFieldDecorator } = this.props.form;
    const checkboxFields = ['Include BA-Test', 'Include QA-Test', 'Include DMRs'];

    return checkboxFields.map(fieldName => (
      <Col span={4} key={fieldName}>
        <Form.Item>
          {getFieldDecorator(fieldName, {
            valuePropName: "checked",
          })(
            <Checkbox size='large'>{fieldName}</Checkbox>
          )}
        </Form.Item>
      </Col>
    ));
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }


  render() {
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
        style={{ marginBottom: 30 }}
      >
        <Row gutter={24}>
          {this.getTextSearchFields()}
        </Row>
        <Row gutter={24}>
          {this.getDropdownFields()}
          {this.getCheckboxFields()}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'left' }}>
            <Button icon="search" type="primary" htmlType="submit" ghost>Search</Button>
            <Button icon="delete" type="danger" style={{ marginLeft: 8 }} onClick={this.handleReset} ghost>
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const SearchArea = Form.create({ name: 'advanced_search' })(SearchAreaComponent);

export default SearchArea;
