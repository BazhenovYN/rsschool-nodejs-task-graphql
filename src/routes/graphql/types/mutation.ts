import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { changePost, createPost, deletePost } from '../resolvers/post.js';
import { changeProfile, createProfile, deleteProfile } from '../resolvers/profile.js';
import {
  changeUser,
  createUser,
  deleteUser,
  subscribeTo,
  unsubscribeFrom,
} from '../resolvers/user.js';
import {
  ChangeUserDTO,
  Context,
  CreateUserDTO,
  MutationArguments,
  NewPost,
  NewProfile,
  subscribeParams,
  unsubscribeParams,
} from './common.js';
import { ChangePostInputType, CreatePostInputType, PostType } from './post.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileType,
} from './profile.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from './user.js';
import { UUIDType } from './uuid.js';

export const rootMutation = new GraphQLObjectType<unknown, Context>({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInputType),
        },
      },
      resolve: async (_source, { dto }: CreateUserDTO, { prisma }) =>
        createUser(dto, prisma),
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangeUserInputType),
        },
      },
      resolve: async (_source, { id, dto }: ChangeUserDTO, { prisma }) =>
        changeUser(id, dto, prisma),
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
          type: new GraphQLNonNull(CreatePostInputType),
        },
      },
      resolve: async (_source, { dto }: MutationArguments<NewPost>, { prisma }) =>
        createPost(dto, prisma),
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangePostInputType),
        },
      },
      resolve: async (_source, { id, dto }: MutationArguments<NewPost>, { prisma }) =>
        changePost(id, dto, prisma),
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
          type: new GraphQLNonNull(CreateProfileInputType),
        },
      },
      resolve: async (_source, { dto }: MutationArguments<NewProfile>, { prisma }) =>
        createProfile(dto, prisma),
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInputType),
        },
      },
      resolve: async (_source, { id, dto }: MutationArguments<NewProfile>, { prisma }) =>
        changeProfile(id, dto, prisma),
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: MutationArguments<never>, { prisma }) =>
        deleteProfile(id, prisma),
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { userId, authorId }: subscribeParams, { prisma }) =>
        subscribeTo(userId, authorId, prisma),
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { userId, authorId }: unsubscribeParams, { prisma }) =>
        unsubscribeFrom(userId, authorId, prisma),
    },
  },
});
