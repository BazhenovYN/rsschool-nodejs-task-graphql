import { PrismaClient } from '@prisma/client';
import { NewPost } from '../types/common.js';

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

export const createPost = async (post: NewPost, prisma: PrismaClient) => {
  return prisma.post.create({
    data: post,
  });
};
