class MetisAPI {
  constructor({ db }) {
    this.db = db;
  }

  async tickets() {
    const result = await this.db
      .query`select * from [WFS].[view_workRequests_Extended] where Product_Family = 'BPS Can Datp' and Product_Type = 'Dataphile Application'`;

    const tickets = result.recordsets[0].reduce(
      (acc, value) =>
        acc.concat({
          id: value.Remedy_Short_ID,
          summary: value.Summary
        }),
      []
    );

    return tickets;
  }
}

module.exports = MetisAPI;
