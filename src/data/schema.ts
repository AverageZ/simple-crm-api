import {
  // addMockFunctionsToSchema,
  makeExecutableSchema,
} from 'graphql-tools';

// import mocks from './mocks';
import resolvers from './resolvers';

const typeDefs = `
type Rep {
  id: ID!
  firstName: String
  lastName: String
  email: String
  permissions: String
}
type Note {
  id: ID!
  title: String
  updated: String
  content: String
  authors: [Rep]
  tags: [Tag]
}
type Tag {
  id: ID!
  title: String
  updated: String
}
type Organization {
  id: ID!
  name: String
  email: String
  phone: String
  reps: [Rep]
  notes: [Note]
  tags: [Tag]
  clients: [Client]
}
type Client {
  id: ID!
  firstName: String
  lastName: String
  updated: String
  status: String
  email: String
  phone: String
  reps: [Rep]
  notes: [Note]
  tags: [Tag]
  organizations: [Organization]
}

type Query {
  clients: [Client]
  client(id: ID!): Client

  organizations: [Organization]
  organization(id: ID!): Organization
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
