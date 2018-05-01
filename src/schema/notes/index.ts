import { createNote } from 'schema/notes/resolvers/create';
import { deleteNote } from 'schema/notes/resolvers/delete';
import { note, notes } from 'schema/notes/resolvers/get';
import { updateNote } from 'schema/notes/resolvers/update';

import { rep as getRep } from 'schema/reps/resolvers/get';
import { tag as getTag } from 'schema/tags/resolvers/get';

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
    reps: [Rep]
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

    Note: {
      reps: (n: INote) => {
        return n.reps.map((r: string) => getRep(null, { id: r }));
      },

      tags: (n: INote) => {
        return n.tags.map((t: string) => getTag(null, { id: t }));
      },
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
