import { GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { createPost } from '../resolvers/post.js';
import { createProfile } from '../resolvers/profile.js';
import { createUser } from '../resolvers/user.js';
import { Context, MutationArguments, NewPost, NewProfile, NewUser } from './common.js';
import { PostInputType, PostType } from './post.js';
import { ProfileInputType, ProfileType } from './profile.js';
import { UserInputType, UserType } from './user.js';

export const rootMutation = new GraphQLObjectType<unknown, Context>({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: {
          type: new GraphQLNonNull(UserInputType),
        },
      },
      resolve: async (_source, { dto }: MutationArguments<NewUser>, { prisma }) =>
        createUser(dto, prisma),
    },
    createPost: {
      type: PostType,
      args: {
        dto: {
          type: new GraphQLNonNull(PostInputType),
        },
      },
      resolve: async (_source, { dto }: MutationArguments<NewPost>, { prisma }) =>
        createPost(dto, prisma),
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: {
          type: new GraphQLNonNull(ProfileInputType),
        },
      },
      resolve: async (_source, { dto }: MutationArguments<NewProfile>, { prisma }) =>
        createProfile(dto, prisma),
    },
  },
});
