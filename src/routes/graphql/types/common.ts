import { Static } from '@fastify/type-provider-typebox';
import { PrismaClient } from '@prisma/client';
import {
  changePostByIdSchema,
  createPostSchema,
  postFields,
} from '../../posts/schemas.js';
import {
  changeProfileByIdSchema,
  createProfileSchema,
  profileFields,
} from '../../profiles/schemas.js';
import {
  subscribeToUserSchema,
  unsubscribeFromUserSchema,
} from '../../users/_userId/user-subscribed-to/schemas.js';
import {
  changeUserByIdSchema,
  createUserSchema,
  userFields,
} from '../../users/schemas.js';
import { createLoaders } from '../dataLoader.js';

export type Nullable<T> = T | null;

export type Context = {
  prisma: PrismaClient;
  loaders: ReturnType<typeof createLoaders>;
};

export type QueryArguments = {
  id: string;
};

export type CreateUserDTO = {
  dto: Static<(typeof createUserSchema)['body']>;
};

export type ChangeUserDTO = {
  id: Static<(typeof userFields)['id']>;
  dto: Static<(typeof changeUserByIdSchema)['body']>;
};

export type DeleteUserDTO = {
  id: Static<(typeof userFields)['id']>;
};

export type CreatePostDTO = {
  dto: Static<(typeof createPostSchema)['body']>;
};

export type ChangePostDTO = {
  id: Static<(typeof postFields)['id']>;
  dto: Static<(typeof changePostByIdSchema)['body']>;
};

export type DeletePostDTO = {
  id: Static<(typeof postFields)['id']>;
};

export type CreateProfileDTO = {
  dto: Static<(typeof createProfileSchema)['body']>;
};

export type ChangeProfileDTO = {
  id: Static<(typeof profileFields)['id']>;
  dto: Static<(typeof changeProfileByIdSchema)['body']>;
};

export type DeleteProfileDTO = {
  id: Static<(typeof profileFields)['id']>;
};

export type SubscribeParams = Static<(typeof subscribeToUserSchema)['params']> &
  Static<(typeof subscribeToUserSchema)['body']>;

export type UnsubscribeParams = Static<(typeof unsubscribeFromUserSchema)['params']>;
