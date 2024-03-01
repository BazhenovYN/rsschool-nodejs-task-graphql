import { User } from '@prisma/client';
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { getPostsByAuthorId } from '../resolvers/post.js';
import { getProfileByUserId } from '../resolvers/profile.js';
import { subscribedToUser, userSubscribedTo } from '../resolvers/user.js';
import { Context } from './common.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType<User, Context>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async ({ id }, _args, { prisma }) => getPostsByAuthorId(id, prisma),
    },
    profile: {
      type: ProfileType,
      resolve: async ({ id }, _args, { prisma }) => getProfileByUserId(id, prisma),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }, _args, { prisma }) => userSubscribedTo(id, prisma),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }, _args, { prisma }) => subscribedToUser(id, prisma),
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
