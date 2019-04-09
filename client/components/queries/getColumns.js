import gql from 'graphql-tag';

const GET_COLUMNS = gql`
  query {
    tickets {
      remedy_short_id
      product_manager
      business_analyst_lead
      business_analyst_team
      development_manager
      development_lead
      development_team
      phase
      progress_levels
      brd_planned_date
      frd_planned_date
      dev_planned_date
      ba_unit_testing_planned_date
      summary
      dev_estimate
      ba_estimate
      delivery_release_id
      product_type
      parent_product
    }
  }
`;

export default GET_COLUMNS;
