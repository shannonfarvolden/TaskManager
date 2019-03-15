const mssql = require("mssql");

module.exports.connectDB = async () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE
  };
  try {
    await mssql.connect(config);

    console.log("db connected");
  } catch (err) {
    console.log(err);
  }

  return mssql;
};
