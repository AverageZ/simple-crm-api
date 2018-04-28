/* tslint:disable */
import Client from 'schema/clients';
import Note from 'schema/notes';
import Rep from 'schema/reps';
import Tag from 'schema/tag';
/* tslint:enable */

import { createOrganization } from 'schema/organizations/resolvers/create';
import { deleteOrganization } from 'schema/organizations/resolvers/delete';
import { organization, organizations } from 'schema/organizations/resolvers/get';
import { updateOrganization } from 'schema/organizations/resolvers/update';

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
