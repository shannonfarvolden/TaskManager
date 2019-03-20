
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
    let date = new Date(dateObj);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  return null;
}

function getDataSource(tickets) {
  let dataSource = [];
  tickets.forEach((ticket, index) => {
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
  });

  return dataSource;
}

export { getDataSource };
