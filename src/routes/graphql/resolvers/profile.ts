import { PrismaClient } from '@prisma/client';

export const getProfiles = async (prisma: PrismaClient) => {
  return prisma.profile.findMany();
};

export const getProfileById = async (id: string, prisma: PrismaClient) => {
  return prisma.profile.findUnique({
    where: {
      id,
    },
  });
};

export const getProfileByUserId = async (userId: string, prisma: PrismaClient) => {
  return prisma.profile.findUnique({
    where: {
      userId,
    },
  });
};
