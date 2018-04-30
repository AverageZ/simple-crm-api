/* tslint:disable */
import Client from 'schema/clients';
import Organization from 'schema/organizations';
import Note from 'schema/notes';
import Tag from 'schema/tags';
/* tslint:enable */

import { createRep } from 'schema/reps/resolvers/create';
import { deleteRep } from 'schema/reps/resolvers/delete';
import { rep, reps } from 'schema/reps/resolvers/get';
import { updateRep } from 'schema/reps/resolvers/update';

const schema = `
  type DeletedRep {
    id: ID!
    email: String
  }

  type Rep {
    id: ID!
    firstName: String
    lastName: String
    email: String
    permissions: String
    tags: [Tag]
  }

  extend type Mutation {
    createRep(
      firstName: String,
      lastName: String,
      email: String,
      permissions: String,
      tags: [ID],
    ): Rep

    updateRep(
      id: ID!,
      firstName: String,
      lastName: String,
      email: String,
      permissions: String,
      tags: [ID],
    ): Rep

    deleteRep(
      id: ID!
    ): DeletedRep
  }
`;

/**
 * NOTE:
 * https://en.wikipedia.org/wiki/File_system_permissions
 */

function repResolver() {
  return {
    Query: {
      rep,
      reps,
    },

    Mutation: {
      createRep,
      deleteRep,
      updateRep,
    },
  };
}

export {
  schema as default,
  repResolver,
};
