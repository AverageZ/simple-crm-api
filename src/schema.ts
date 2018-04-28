import { makeExecutableSchema } from 'graphql-tools';
import * as _ from 'lodash';

import Client, { clientResolver } from 'schema/clients';
import Note, { noteResolver } from 'schema/notes';
import Organization, { organizationResolver } from 'schema/organizations';
import Rep, { repResolver } from 'schema/reps';
import Tag, { tagResolver } from 'schema/tags';

const RootQuery = `
  type Query {
    clients: [Client]
    client(id: ID!): Client

    organizations: [Organization]
    organization(id: ID!): Organization

    reps: [Rep]
    rep(id: ID!): Rep

    notes: [Note]
    note(id: ID!): Note

    tags: [Tag]
    tag(id: ID!): Tag
  }
`;

const RootMutation = `
  type Mutation {
    doThing(id: ID!): Client
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  resolvers: _.merge(
    clientResolver(),
    noteResolver(),
    organizationResolver(),
    repResolver(),
    tagResolver(),
  ),

  typeDefs: [
    SchemaDefinition,
    RootMutation,
    Client,
    Note,
    Organization,
    Rep,
    Tag,
    RootQuery,
  ],
});

export default schema;
