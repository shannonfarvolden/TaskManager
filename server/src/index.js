const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const MetisAPI = require("./datasources/metis");
const { connectDB } = require("./utils/db");
const cors = require("cors");

import typeDefs from "./schema";
import resolvers from "./resolvers";

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  const db = await connectDB();

  app.use(cors());

  const dataSources = () => ({
    metisAPI: new MetisAPI({ db })
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });

  server.applyMiddleware({ app, path: "/" });
  app.listen(3000, function() {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
