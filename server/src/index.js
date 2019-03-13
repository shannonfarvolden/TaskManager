const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.get("/", (req, res) => {
  res.send("hit endpoint");
});
app.listen(3000);
