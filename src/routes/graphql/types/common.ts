import { Static } from '@fastify/type-provider-typebox';
import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';
import {
  subscribeToUserSchema,
  unsubscribeFromUserSchema,
} from '../../users/_userId/user-subscribed-to/schemas.js';
import {
  changeUserByIdSchema,
  createUserSchema,
  userFields,
} from '../../users/schemas.js';

export type Context = {
  prisma: PrismaClient;
  loaders: {
    users: DataLoader<string, User | null>;
    postsByAuthorId: DataLoader<string, Post[] | null>;
    profilesByUserId: DataLoader<string, Profile | null>;
    userSubscribedTo: DataLoader<string, User[] | null>;
    subscribedToUser: DataLoader<string, User[] | null>;
    memberTypes: DataLoader<string, MemberType | null>;
  };
};

export type QueryArguments = {
  id: string;
};

export type NewUser = Omit<User, 'id'>;

export type NewPost = Omit<Post, 'id'>;

export type NewProfile = Omit<Profile, 'id'>;

export type MutationArguments<T> = {
  id: string;
  dto: T;
};

export type CreateUserDTO = {
  dto: Static<(typeof createUserSchema)['body']>;
};

export type ChangeUserDTO = {
  id: Static<(typeof userFields)['id']>;
  dto: Static<(typeof changeUserByIdSchema)['body']>;
};

export type subscribeParams = Static<(typeof subscribeToUserSchema)['params']> &
  Static<(typeof subscribeToUserSchema)['body']>;

export type unsubscribeParams = Static<(typeof unsubscribeFromUserSchema)['params']>;
