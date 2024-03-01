import { Post, PrismaClient, Profile, User } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export type QueryArguments = {
  id: string;
};

export type NewUser = Omit<User, 'id'>;

export type NewPost = Omit<Post, 'id'>;

export type NewProfile = Omit<Profile, 'id'>;

export type MutationArguments<T> = {
  dto: T;
};
