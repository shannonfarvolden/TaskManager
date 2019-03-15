const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const MetisAPI = require("./datasources/metis");
const { connectDB } = require("./utils/db");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  const db = await connectDB();

  app.use(cors());

  const typeDefs = gql`
    type Query {
      tickets: [Ticket]
    }

    type Ticket {
      id: ID!
      summary: String
    }
  `;
  const dataSources = () => ({
    metisAPI: new MetisAPI({ db })
  });

  // A map of functions which return data for the schema.
  const resolvers = {
    Query: {
      tickets: async (_, __, { dataSources }) => dataSources.metisAPI.tickets()
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });

  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(3000, function() {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
