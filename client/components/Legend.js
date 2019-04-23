import { Collapse } from 'antd';
const Panel = Collapse.Panel;

class Legend extends React.Component {

  callback = (key) => {
    console.log(key);
  }

  render() {
    return (
      <Collapse onChange={this.callback} className="legend-container">
        <Panel header="Legend: Missing Highlights" key="legend">
          <p><span class="highlightMissingDEVDueDate"></span>
            Missing DEV Due Date</p>
          <p><span class="highlightMissingBADueDate"></span>
            Missing BA Due Date</p>
          <p><span class="highlightMissingQADueDate"></span>
            Missing QA Due Date</p>
          <p><span class="highlightMissingBAResource"></span>
            Missing BA Resource</p>
          <p><span class="highlightMissingDEVResource"></span>
            Missing DEV Resource</p>
          <p><span class="highlightMissingQAResource"></span>
            Missing QA Resource</p>
        </Panel>
      </Collapse>
    );
  }
}


export default Legend;
