import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { getMemberTypeById } from '../resolvers/memberType.js';
import { Context } from './common.js';
import { MemberType, MemberTypeEnumType } from './memberType.js';
import { UUIDType } from './uuid.js';

interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

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
