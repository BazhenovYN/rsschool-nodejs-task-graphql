import { PrismaClient } from '@prisma/client';
import { ChangeUserDTO, Context, CreateUserDTO } from '../types/common.js';

export const getUsers = async ({ prisma }: Context) => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string, { prisma }: Context) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const userSubscribedTo = async (userId: string, prisma: PrismaClient) => {
  return prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: userId,
        },
      },
    },
  });
};

export const subscribedToUser = async (userId: string, prisma: PrismaClient) => {
  return prisma.user.findMany({
    where: {
      userSubscribedTo: {
        some: {
          authorId: userId,
        },
      },
    },
  });
};

export const createUser = async (user: CreateUserDTO['dto'], prisma: PrismaClient) => {
  return prisma.user.create({
    data: user,
  });
};

export const changeUser = async (
  id: ChangeUserDTO['id'],
  user: ChangeUserDTO['dto'],
  prisma: PrismaClient,
) => {
  return prisma.user.update({
    where: { id },
    data: user,
  });
};

export const deleteUser = async (id: string, prisma: PrismaClient) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
  return true;
};

export const subscribeTo = async (
  userId: string,
  authorId: string,
  prisma: PrismaClient,
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userSubscribedTo: {
        create: {
          authorId: authorId,
        },
      },
    },
  });
};

export const unsubscribeFrom = async (
  userId: string,
  authorId: string,
  prisma: PrismaClient,
) => {
  await prisma.subscribersOnAuthors.delete({
    where: {
      subscriberId_authorId: {
        subscriberId: userId,
        authorId: authorId,
      },
    },
  });
  return true;
};
