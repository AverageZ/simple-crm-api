/* tslint:disable */
import Rep from 'data/schema/rep';
import Tag from 'data/schema/tag';
/* tslint:enable */

export default `
type Note {
  id: ID!
  title: String
  updated: String
  content: String
  authors: [Rep]
  tags: [Tag]
}
`;
