/* tslint:disable */
import Note from 'data/schema/note';
import Organization from 'data/schema/organization';
import Rep from 'data/schema/rep';
import Tag from 'data/schema/tag';
/* tslint:enable */

export default `
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
  addClient(
    firstName: String!,
    lastName: String!,
    status: String,
    email: String,
    phone: String,
    repId: ID!,
  ): Client

  updateClient(
    id: ID!
    firstName: String,
    lastName: String,
    status: String,
    email: String,
    phone: String,
  ): Client

  deleteClient(
    id: ID!
  ): DeletedClient
}
`;
