import { SubscribersOnAuthors, User } from '@prisma/client';
import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { Context } from './common.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

interface UserExtended extends User {
  subscribedToUser?: SubscribersOnAuthors[];
  userSubscribedTo?: SubscribersOnAuthors[];
}

export const UserType: GraphQLObjectType = new GraphQLObjectType<UserExtended, Context>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(PostType)),
      resolve: async ({ id }, _args, { loaders }) => loaders.postsByAuthorId.load(id),
    },
    profile: {
      type: ProfileType,
      resolve: async ({ id }, _args, { loaders }) => loaders.profilesByUserId.load(id),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id, userSubscribedTo }, _args, { loaders }) => {
        if (userSubscribedTo) {
          return loaders.users.loadMany(
            userSubscribedTo.map((record) => record.authorId),
          );
        }
        return loaders.userSubscribedTo.load(id);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id, subscribedToUser }, _args, { loaders }) => {
        if (subscribedToUser) {
          return loaders.users.loadMany(
            subscribedToUser.map((record) => record.subscriberId),
          );
        }
        return loaders.subscribedToUser.load(id);
      },
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
