import { PrismaClient } from '@prisma/client';
import { ChangePostDTO, CreatePostDTO, DeletePostDTO } from '../types/common.js';

export const getPosts = async (prisma: PrismaClient) => {
  return prisma.post.findMany();
};

export const getPostById = async (id: string, prisma: PrismaClient) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const getPostsByAuthorId = async (authorId: string, prisma: PrismaClient) => {
  return prisma.post.findMany({
    where: {
      authorId,
    },
  });
};

export const createPost = async (post: CreatePostDTO['dto'], prisma: PrismaClient) => {
  return prisma.post.create({
    data: post,
  });
};

export const changePost = async (
  id: ChangePostDTO['id'],
  post: ChangePostDTO['dto'],
  prisma: PrismaClient,
) => {
  return prisma.post.update({
    where: { id },
    data: post,
  });
};

export const deletePost = async (id: DeletePostDTO['id'], prisma: PrismaClient) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
  return true;
};
