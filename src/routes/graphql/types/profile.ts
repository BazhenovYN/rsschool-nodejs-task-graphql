import { Profile } from '@prisma/client';
import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

import { getMemberTypeById } from '../resolvers/memberType.js';
import { Context } from './common.js';
import { MemberType, MemberTypeEnumType } from './memberType.js';
import { UUIDType } from './uuid.js';

export const ProfileType = new GraphQLObjectType<Profile, Context>({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeEnumType) },
    memberType: {
      type: MemberType,
      resolve: ({ memberTypeId }, _args, { prisma }) =>
        getMemberTypeById(memberTypeId, prisma),
    },
  },
});

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeEnumType) },
  },
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: {
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeEnumType },
  },
});
