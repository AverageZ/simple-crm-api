/* tslint:disable */
import Note from 'schema/notes';
import Organization from 'schema/organizations';
import Rep from 'schema/reps';
import Tag from 'schema/tags';
/* tslint:enable */

import { createClient } from 'schema/clients/resolvers/create';
import { deleteClient } from 'schema/clients/resolvers/delete';
import { client, clients } from 'schema/clients/resolvers/get';
import { updateClient } from 'schema/clients/resolvers/update';

const schema = `
  type DeletedClient {
    id: ID!
    firstName: String
    lastName: String
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

  extend type Mutation {
    createClient(
      firstName: String!,
      lastName: String!,
      status: String,
      email: String,
      phone: String,
      repId: ID!,
      organizations: [ID],
      notes: [ID],
      tags: [ID],
    ): Client

    updateClient(
      id: ID!,
      firstName: String,
      lastName: String,
      status: String,
      email: String,
      phone: String,
      organizations: [ID],
      notes: [ID],
      tags: [ID],
    ): Client

    deleteClient(
      id: ID!
    ): DeletedClient
  }
`;

function clientResolver() {
  return {
    Query: {
      client,
      clients,
    },

    Mutation: {
      createClient,
      deleteClient,
      updateClient,
    },
  };
}

export {
  schema as default,
  clientResolver,
};
