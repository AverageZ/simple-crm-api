import { createContact } from 'schema/contacts/resolvers/create';
import { deleteContact } from 'schema/contacts/resolvers/delete';
import { contact, contacts } from 'schema/contacts/resolvers/get';
import { updateContact } from 'schema/contacts/resolvers/update';

import { note as getNote } from 'schema/notes/resolvers/get';
import { organization as getOrganization } from 'schema/organizations/resolvers/get';
import { rep as getRep } from 'schema/reps/resolvers/get';
import { tag as getTag } from 'schema/tags/resolvers/get';

const schema = `
  type DeletedContact {
    id: ID!
    firstName: String
    lastName: String
  }

  type Contact {
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
    createContact(
      firstName: String!,
      lastName: String!,
      status: String,
      email: String,
      phone: String,
      repId: ID!,
      organizations: [ID],
      notes: [ID],
      tags: [ID],
    ): Contact

    updateContact(
      id: ID!,
      firstName: String,
      lastName: String,
      status: String,
      email: String,
      phone: String,
      organizations: [ID],
      notes: [ID],
      tags: [ID],
    ): Contact

    deleteContact(
      id: ID!
    ): DeletedContact
  }
`;

function contactResolver() {
  return {
    Query: {
      contact,
      contacts,
    },

    Contact: {
      organizations: (c: IContact) => {
        return c.organizations.map((o: string) => getOrganization(null, { id: o }));
      },

      notes: (c: IContact) => {
        return c.notes.map((n: string) => getNote(null, { id: n }));
      },

      reps: (c: IContact) => {
        return c.reps.map((r: string) => getRep(null, { id: r }));
      },

      tags: (c: IContact) => {
        return c.tags.map((t: string) => getTag(null, { id: t }));
      },
    },

    Mutation: {
      createContact,
      deleteContact,
      updateContact,
    },
  };
}

export {
  schema as default,
  contactResolver,
};
