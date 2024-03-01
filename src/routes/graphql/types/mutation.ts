import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { createPost, deletePost } from '../resolvers/post.js';
import { createProfile, deleteProfile } from '../resolvers/profile.js';
import { createUser, deleteUser } from '../resolvers/user.js';
import { Context, MutationArguments, NewPost, NewProfile, NewUser } from './common.js';
import { PostInputType, PostType } from './post.js';
import { ProfileInputType, ProfileType } from './profile.js';
import { UserInputType, UserType } from './user.js';
import { UUIDType } from './uuid.js';

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
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: MutationArguments<never>, { prisma }) =>
        deleteUser(id, prisma),
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
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: MutationArguments<never>, { prisma }) =>
        deletePost(id, prisma),
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
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: MutationArguments<never>, { prisma }) =>
        deleteProfile(id, prisma),
    },
  },
});
