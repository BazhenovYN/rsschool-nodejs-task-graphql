import { PrismaClient } from '@prisma/client';

export const getMemberTypes = async (prisma: PrismaClient) => {
  return prisma.memberType.findMany();
};

export const getMemberTypeById = async (id: string, prisma: PrismaClient) => {
  return prisma.memberType.findUnique({
    where: {
      id,
    },
  });
};
