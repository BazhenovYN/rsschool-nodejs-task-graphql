import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient;
};

export type QueryArguments = {
  id: string;
};
