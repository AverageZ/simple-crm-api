import { createClient } from 'schema/clients/resolvers/create';
import { deleteClient } from 'schema/clients/resolvers/delete';
import { client, clients } from 'schema/clients/resolvers/get';
import { updateClient } from 'schema/clients/resolvers/update';

import { note as getNote } from 'schema/notes/resolvers/get';
import { organization as getOrganization } from 'schema/organizations/resolvers/get';
import { rep as getRep } from 'schema/reps/resolvers/get';
import { tag as getTag } from 'schema/tags/resolvers/get';

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

    Client: {
      organizations: (c: IClient) => {
        return c.organizations.map((o: string) => getOrganization(null, { id: o }));
      },

      notes: (c: IClient) => {
        return c.notes.map((n: string) => getNote(null, { id: n }));
      },

      reps: (c: IClient) => {
        return c.reps.map((r: string) => getRep(null, { id: r }));
      },

      tags: (c: IClient) => {
        return c.tags.map((t: string) => getTag(null, { id: t }));
      },
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
