/* tslint:disable */
import Client from 'data/schema/client';
import Note from 'data/schema/note';
import Rep from 'data/schema/rep';
import Tag from 'data/schema/tag';
/* tslint:enable */

export default `
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
  addOrganization(
    name: String
    email: String
    phone: String
    repId: ID!,
  ): Organization

  updateOrganization(
    id: ID!
    name: String
    email: String
    phone: String
  ): Organization

  deleteOrganization(
    id: ID!
  ): DeletedOrganization
}
`;
