import { makeExecutableSchema } from 'graphql-tools';

import Client from 'data/schema/client';
import Note from 'data/schema/note';
import Organization from 'data/schema/organization';
import Rep from 'data/schema/rep';
import Tag from 'data/schema/tag';

import resolvers from './resolvers';

const RootQuery = `
  type Query {
    clients: [Client]
    client(id: ID!): Client

    organizations: [Organization]
    organization(id: ID!): Organization
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  resolvers,

  typeDefs: [
    SchemaDefinition,
    RootQuery,
    Client,
    Note,
    Organization,
    Rep,
    Tag,
  ],
});

export default schema;
