// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    tickets: async (_, __, { dataSources }) => dataSources.metisAPI.tickets()
  }
};

export default resolvers;
