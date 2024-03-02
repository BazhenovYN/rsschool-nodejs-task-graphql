import { PrismaClient } from '@prisma/client';
import { Context, NewPost } from '../types/common.js';

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

export const getPostsByAuthorId = (authorId: string, { prisma }: Context) => {
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

export const changePost = async (id: string, post: NewPost, prisma: PrismaClient) => {
  return prisma.post.update({
    where: { id },
    data: post,
  });
};

export const deletePost = async (id: string, prisma: PrismaClient) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
  return true;
};
