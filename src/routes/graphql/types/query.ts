import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { getMemberTypeById, getMemberTypes } from '../resolvers/memberType.js';
import { getPostById, getPosts, getPostsByAuthorId } from '../resolvers/post.js';
import { getProfileById, getProfileByUserId, getProfiles } from '../resolvers/profile.js';
import { getUserById, getUsers } from '../resolvers/user.js';
import { Context, QueryArguments } from './common.js';
import { MemberType, MemberTypeEnumType } from './memberType.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UserType } from './user.js';
import { UUIDType } from './uuid.js';

export const rootQuery = new GraphQLObjectType<unknown, Context>({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (_source, _args, context, info) => getUsers(context, info),
    },
    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: QueryArguments, context) =>
        getUserById(id, context),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (_source, _args, { prisma }) => getPosts(prisma),
    },
    postsByUserId: {
      type: new GraphQLList(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: QueryArguments, context) =>
        getPostsByAuthorId(id, context),
    },
    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: QueryArguments, { prisma }) =>
        getPostById(id, prisma),
    },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (_source, _args, { prisma }) => getProfiles(prisma),
    },
    profileByUserId: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: QueryArguments, { prisma }) =>
        getProfileByUserId(id, prisma),
    },
    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_source, { id }: QueryArguments, { prisma }) =>
        getProfileById(id, prisma),
    },
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_source, _args, { prisma }) => getMemberTypes(prisma),
    },
    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeEnumType) },
      },
      resolve: async (_source, { id }: QueryArguments, { prisma }) =>
        getMemberTypeById(id, prisma),
    },
  },
});
