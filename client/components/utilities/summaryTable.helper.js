import moment from 'moment';
import { Tooltip } from 'antd';
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
    return moment(dateObj).format('MM/DD/YY');
  }

  return null;
}

function getInitials(fullNames) {
  let fullName = [];
  let initials = [];
  fullNames.split(',').forEach(name => {
    fullName = name.split('.');
    initials.push(fullName[0][0] + fullName[1][0]);
  });
  return (
    <Tooltip placement="topLeft" title={fullNames}>
      <p>{initials.join(',')}</p>
    </Tooltip>
  );
}

function highlightRow(row) {
  if (!row.brd_planned_date) {
    return 'highlightMissingBRDDueDate';
  } else if (!row.dev_planned_date) {
    return 'highlightMissingDEVDueDate';
  } else if (!row.ba_unit_testing_planned_date) {
    return 'highlightMissingBADueDate';
  } else if (!row.qa_test_completion_planned_date) {
    return 'highlightMissingQADueDate';
  } else if (!row.business_analyst_lead) {
    return 'highlightMissingBAResource';
  } else if (!row.development_lead) {
    return 'highlightMissingDEVResource';
  } else if (!row.qa_lead) {
    return 'highlightMissingQAResource';
  }
}

function getDataSource(tickets) {
  let dataSource = [];
  tickets.forEach((ticket, index) => {
    if (ticket.phase === 'In Progress' || ticket.phase === 'Planning') {
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
    }
  });

  return dataSource;
}

function dateSorter(dataIndex) {
  return (a, b) => {
    if (a[dataIndex] !== null || b[dataIndex] !== null) {
      return new Date(a[dataIndex]) - new Date(b[dataIndex]);
    }
  };
}

function estimateSorter(dataIndex) {
  return (a, b) => {
    if (a[dataIndex] !== null || b[dataIndex] !== null) {
      return a[dataIndex] - b[dataIndex];
    }
  };
}

export { getDataSource, dateSorter, estimateSorter, getInitials, highlightRow };
