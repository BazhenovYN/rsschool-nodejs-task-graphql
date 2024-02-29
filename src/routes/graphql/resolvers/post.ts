import { PrismaClient } from '@prisma/client';

export const getPosts = (prisma: PrismaClient) => {
  return prisma.post.findMany();
};

export const getPostById = (id: string, prisma: PrismaClient) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const getPostsByAuthorId = (authorId: string, prisma: PrismaClient) => {
  return prisma.post.findMany({
    where: {
      authorId,
    },
  });
};
