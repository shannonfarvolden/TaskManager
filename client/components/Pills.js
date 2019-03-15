import { Button, Row, Col } from 'antd';

export default function Pills(props) {
  return (
    <Row gutter={16}>
      <Summary onViewSummary={props.viewSummary} />
      <Dates onViewDates={props.viewDates} />
    </Row>
  );
}

function Dates(props) {
  return (
    <Col className="gutter-row" span={2}>
      <Button shape="round" onClick={props.onViewDates} value="dates">
        Dates
      </Button>
    </Col>
  );
}

const Summary = props => (
  <Col className="gutter-row" span={2}>
    <Button shape="round" onClick={props.onViewSummary} value="summary">
      Summary
    </Button>
  </Col>
);
