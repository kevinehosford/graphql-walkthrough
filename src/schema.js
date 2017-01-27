'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  /** use types to build up schema */
  GraphQLString,
  GraphQLNonNull,
} = require('graphql/type');

/** queries + mutations are all queries, convention is that mutations have side-effects */
const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    /** queries + mutations are expressed as fields on the root `query`, `mutation` objects */
    hello: {
      type: GraphQLString,
      /** object fields support a resolve function */
      resolve: () => 'hello, world!',
    },
    helloCaller: {
      type: GraphQLString,
      /** we can define and access args for query */
      args: {
        caller: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, args) => `Hello, ${args.caller}!`,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: {
      type: GraphQLString,
      resolve: () => 'mutated',
    }
  },
});

/* root of the schema should contain a `query` and `mutation` object */
module.exports = new GraphQLSchema({
  query,
  mutation,
});