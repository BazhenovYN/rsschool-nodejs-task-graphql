import { PrismaClient } from '@prisma/client';

export const getMemberTypes = (prisma: PrismaClient) => {
  return prisma.memberType.findMany();
};

export const getMemberTypeById = (id: string, prisma: PrismaClient) => {
  return prisma.memberType.findUnique({
    where: {
      id,
    },
  });
};
