import { makeExecutableSchema } from 'graphql-tools';
import * as _ from 'lodash';

import Contact, { contactResolver } from 'schema/contacts';
import Note, { noteResolver } from 'schema/notes';
import Organization, { organizationResolver } from 'schema/organizations';
import Rep, { repResolver } from 'schema/reps';
import Tag, { tagResolver } from 'schema/tags';

const RootQuery = `
  type Query {
    contacts: [Contact]
    contact(id: ID!): Contact

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
    doThing(id: ID!): Contact
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
    contactResolver(),
    noteResolver(),
    organizationResolver(),
    repResolver(),
    tagResolver(),
  ),

  typeDefs: [
    SchemaDefinition,
    RootMutation,
    Contact,
    Note,
    Organization,
    Rep,
    Tag,
    RootQuery,
  ],
});

export default schema;
