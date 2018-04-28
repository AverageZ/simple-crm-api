import { createTag } from 'schema/tags/resolvers/create';
import { deleteTag } from 'schema/tags/resolvers/delete';
import { tag, tags } from 'schema/tags/resolvers/get';
import { updateTag } from 'schema/tags/resolvers/update';

const schema = `
  type DeletedTag {
    id: ID!
    title: String
  }

  type Tag {
    id: ID!
    label: String
    updated: String
  }

  extend type Mutation {
    createTag(
      label: String,
    ): Tag

    updateTag(
      id: ID!,
      label: String,
      repId: ID!,
    ): Tag

    deleteTag(
      id: ID!
    ): DeletedTag
  }
`;

/**
 * NOTE:
 * https://en.wikipedia.org/wiki/File_system_permissions
 */

function tagResolver() {
  return {
    Query: {
      tag,
      tags,
    },

    Mutation: {
      createTag,
      deleteTag,
      updateTag,
    },
  };
}

export {
  schema as default,
  tagResolver,
};
