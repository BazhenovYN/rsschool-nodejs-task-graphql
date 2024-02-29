import { PrismaClient } from '@prisma/client';

export const getUsers = async (prisma: PrismaClient) => {
  return prisma.user.findMany();
};

export const getUserById = async (id: string, prisma: PrismaClient) => {
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
