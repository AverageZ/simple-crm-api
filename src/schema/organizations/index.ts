import { createOrganization } from 'schema/organizations/resolvers/create';
import { deleteOrganization } from 'schema/organizations/resolvers/delete';
import { organization, organizations } from 'schema/organizations/resolvers/get';
import { updateOrganization } from 'schema/organizations/resolvers/update';

import { note as getNote } from 'schema/notes/resolvers/get';
import { rep as getRep } from 'schema/reps/resolvers/get';
import { tag as getTag } from 'schema/tags/resolvers/get';

const schema = `
  type DeletedOrganization {
    id: ID!
    name: String
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

  extend type Mutation {
    createOrganization(
      name: String,
      email: String,
      phone: String,
      repId: ID!,
    ): Organization

    updateOrganization(
      id: ID!,
      name: String,
      email: String,
      phone: String,
      clients: [ID],
      tags: [ID],
      notes: [ID],
      reps: [ID],
    ): Organization

    deleteOrganization(
      id: ID!
    ): DeletedOrganization
  }
`;

function organizationResolver() {
  return {
    Query: {
      organization,
      organizations,
    },

    Organization: {
      reps: (o: IOrganization) => {
        return o.reps.map((r: string) => getRep(null, { id: r }));
      },

      notes: (o: IOrganization) => {
        return o.notes.map((r: string) => getNote(null, { id: r }));
      },

      tags: (o: IOrganization) => {
        return o.tags.map((t: string) => getTag(null, { id: t }));
      },
    },

    Mutation: {
      createOrganization,
      deleteOrganization,
      updateOrganization,
    },
  };
}

export {
  schema as default,
  organizationResolver,
};
