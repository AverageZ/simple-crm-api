/* tslint:disable */
import Client from 'schema/clients';
import Organization from 'schema/organizations';
import Rep from 'schema/reps';
import Tag from 'schema/tag';
/* tslint:enable */

import { createNote } from 'schema/notes/resolvers/create';
import { deleteNote } from 'schema/notes/resolvers/delete';
import { note, notes } from 'schema/notes/resolvers/get';
import { updateNote } from 'schema/notes/resolvers/update';

const schema = `
  type DeletedNote {
    id: ID!
    title: String
  }

  type Note {
    id: ID!
    title: String
    updated: String
    content: String
    authors: [Rep]
    tags: [Tag]
  }

  extend type Mutation {
    createNote(
      title: String,
      updated: String,
      content: String,
      repId: ID!,
      tags: [ID],
    ): Note

    updateNote(
      id: ID!,
      title: String,
      updated: String,
      content: String,
      repId: ID!,
      tags: [ID],
    ): Note

    deleteNote(
      id: ID!
    ): DeletedNote
  }
`;

/**
 * NOTE:
 * https://en.wikipedia.org/wiki/File_system_permissions
 */

function noteResolver() {
  return {
    Query: {
      note,
      notes,
    },

    Mutation: {
      createNote,
      deleteNote,
      updateNote,
    },
  };
}

export {
  schema as default,
  noteResolver,
};
