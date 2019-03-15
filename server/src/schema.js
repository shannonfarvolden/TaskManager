const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    tickets: [Ticket]
  }

  type Ticket {
    actuals_per_day: Float
    admin_estimate: Float
    ba_estimate: Float
    ba_unit_testing_actual_date: Date
    ba_unit_testing_baselined_date: Date
    ba_unit_testing_isrequired: String
    ba_unit_testing_planned_date: Date
    ba_unit_testing_reason: String
    baanalysis_end_date: DateTime
    billing_status: String
    billingstatus_id: Int
    brd_actual_date: Date
    brd_approved: String
    brd_baselined_date: Date
    brd_isrequired: String
    brd_planned_date: Date
    brd_reason: String
    business_analyst_lead: String
    business_analyst_team: String
    client: String
    clientid: String
    comp_create_date: DateTime
    comp_details: String
    comp_phase: String
    comp_progress_level: String
    comp_progress_level_id: String
    company_type: String
    component_id: Int
    cost: Float
    cost_percent: String
    created_date: DateTime
    customtags: String
    deferrable: String
    delivery_release_id: String
    details: String
    dev_actual_date: Date
    dev_baselined_date: Date
    dev_end_date: DateTime
    dev_estimate: Float
    dev_iscomplete: String
    dev_isrequired: String
    dev_planned_date: Date
    dev_reason: String
    development_lead: String
    development_manager: String
    development_team: String
    displayorder: Float
    documentation_required: String
    external_ref: String
    frd_actual_date: Date
    frd_baselined_date: Date
    frd_isrequired: String
    frd_planned_date: Date
    frd_reason: String
    high_level_estimate: String
    highest_baanalysis_end_date: DateTime
    highest_dev_end_date: DateTime
    highest_production_target_date: DateTime
    highest_qa_end_date: DateTime
    highest_uat_date: DateTime
    hle_hlr_required: String
    hle_total_estimate: Int
    invoiced_date: DateTime
    parent_product: String
    parent_product_id: String
    phase: String
    priority: String
    product_catalog_id: String
    product_family: String
    product_family_id: String
    product_manager: String
    product_name: String
    product_type: String
    product_type_id: String
    production_actual_date: Date
    production_baselined_date: Date
    production_isrequired: String
    production_planned_date: Date
    production_reason: String
    production_target_date: DateTime
    productsupport_estimate: Float
    progress_level_id: String
    progress_levels: String
    project_category: String
    project_plan_uid: String
    project_start_date: Date
    projectid: String
    projectid_desc: String
    projectid_description: String
    qa_analyst_team: String
    qa_end_date: DateTime
    qa_estimate: Float
    qa_lead: String
    qa_manager: String
    qa_test_completion_actual_date: Date
    qa_test_completion_baselined_date: Date
    qa_test_completion_isrequired: String
    qa_test_completion_planned_date: Date
    qa_test_completion_reason: String
    qa_test_plan_actual_date: Date
    qa_test_plan_baselined_date: Date
    qa_test_plan_isrequired: String
    qa_test_plan_planned_date: Date
    qa_test_plan_reason: String
    remedy_request_id: String
    remedy_short_id: String
    reporting_category: String
    reporting_category_id: Int
    request_category: String
    request_owner: String
    requested_date: DateTime
    revenue_release_id: String
    sdlc_id: Int
    sdlc_type: String
    security_design_review_required: String
    severity: String
    special_alerts_required: String
    special_sla_required: String
    special_thresholds_required: String
    summary: String
    technical_design_actual_date: Date
    technical_design_baselined_date: Date
    technical_design_isrequired: String
    technical_design_planned_date: Date
    technical_design_reason: String
    total_estimate: Int
    uat_actual_date: Date
    uat_baselined_date: Date
    uat_date: DateTime
    uat_isrequired: String
    uat_planned_date: Date
    uat_reason: String
    unique_id: Int
    updated_by: String
    updated_date: DateTime
    workrequest_updatedate: DateTime
    workrequests_total_estimate: Int
  }

  scalar Date
  scalar DateTime
`;

export default typeDefs;
