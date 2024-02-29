import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { Context } from './common.js';
import { UUIDType } from './uuid.js';

export const PostType = new GraphQLObjectType<unknown, Context>({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});
