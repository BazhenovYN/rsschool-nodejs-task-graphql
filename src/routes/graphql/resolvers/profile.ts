import { PrismaClient } from '@prisma/client';
import { NewProfile } from '../types/common.js';

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

export const createProfile = async (profile: NewProfile, prisma: PrismaClient) => {
  return prisma.profile.create({
    data: profile,
  });
};

export const changeProfile = async (
  id: string,
  profile: NewProfile,
  prisma: PrismaClient,
) => {
  return prisma.profile.update({
    where: { id },
    data: profile,
  });
};

export const deleteProfile = async (id: string, prisma: PrismaClient) => {
  await prisma.profile.delete({
    where: {
      id,
    },
  });
  return true;
};
