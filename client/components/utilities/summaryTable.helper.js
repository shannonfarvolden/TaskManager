import moment from 'moment';
import { Tooltip } from 'antd';

function removeEmailDomain(emails) {
  if (!emails) return;
  const emailArr = emails.split(',').filter(email => email !== '');
  const nameOnlyArr = [];
  emailArr.forEach(email => {
    email = email.lastIndexOf('@') >= 0 ? email.substring(0, email.lastIndexOf('@')) : email;
    if (nameOnlyArr.indexOf(email) === -1) {
      nameOnlyArr.push(email);
    }
  });

  return nameOnlyArr.join(';');
}

function formatDate(dateObj) {
  return dateObj ? moment(new Date(dateObj)).format('MM/DD/YY') : null;
}

function getInitials(fullNames) {
  let fullName = [];
  let initials = [];
  fullNames.split(';').forEach(name => {
    fullName = name.split('.');
    initials.push(fullName[0][0] + fullName[1][0]);
  });
  return (
    <Tooltip placement="topLeft" title={fullNames}>
      <p>{initials.join(';')}</p>
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
  } else if (!row.business_analyst_lead) {
    return 'highlightMissingBAResource';
  } else if (!row.development_lead) {
    return 'highlightMissingDEVResource';
  }
}

function getDataSource(tickets, viewHotListDRF) {
  let dataSource = [];
  for (let idx in tickets) {
    if (
      (viewHotListDRF && tickets[idx].delivery_release_id !== 'Dataphile - Off Cycle') ||
      (!viewHotListDRF && tickets[idx].delivery_release_id === 'Dataphile - Off Cycle')
    ) {
      continue;
    }
    if (tickets[idx].phase === 'In Progress' || tickets[idx].phase === 'Planning') {
      tickets[idx].pm_ba = removeEmailDomain(
        [
          tickets[idx].product_manager,
          tickets[idx].business_analyst_lead,
          tickets[idx].business_analyst_team
        ].join(',')
      );
      tickets[idx].dev = removeEmailDomain(
        [
          tickets[idx].development_manager,
          tickets[idx].development_lead,
          tickets[idx].development_team
        ].join(',')
      );
      tickets[idx].phase_progress_level = `${tickets[idx].phase} - ${tickets[idx].progress_levels}`;
      tickets[idx].brd_planned_date = formatDate(tickets[idx].brd_planned_date);
      tickets[idx].frd_planned_date = formatDate(tickets[idx].frd_planned_date);
      tickets[idx].dev_planned_date = formatDate(tickets[idx].dev_planned_date);
      tickets[idx].ba_unit_testing_planned_date = formatDate(
        tickets[idx].ba_unit_testing_planned_date
      );
      let tableRow = { key: idx };
      tableRow = { ...tableRow, ...tickets[idx] };
      dataSource.push(tableRow);
    }
  }
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
