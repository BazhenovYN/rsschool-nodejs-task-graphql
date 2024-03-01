import { PrismaClient } from '@prisma/client';
import { NewUser } from '../types/common.js';

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

export const createUser = async (user: NewUser, prisma: PrismaClient) => {
  return prisma.user.create({
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
