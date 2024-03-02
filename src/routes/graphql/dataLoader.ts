import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';
import { Nullable } from './types/common.js';

const getGenUsers = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const resultsMap = users.reduce(
    (acc, curr) => acc.set(curr.id, curr),
    new Map<string, User>(),
  );

  return ids.map((id) => resultsMap.get(id) ?? null);
};

const getGenPostsByAuthorId =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [...ids],
        },
      },
    });

    return ids.map((id) => posts.filter((post) => post.authorId === id));
  };

const getGenProfilesByUserId =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: {
          in: [...ids],
        },
      },
    });

    const resultsMap = profiles.reduce(
      (acc, curr) => acc.set(curr.userId, curr),
      new Map<string, Profile>(),
    );

    return ids.map((id) => resultsMap.get(id) ?? null);
  };

const getGenUserSubscribedTo =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: {
        subscribedToUser: {
          some: {
            subscriberId: {
              in: [...ids],
            },
          },
        },
      },
      include: {
        subscribedToUser: true,
      },
    });

    return ids.map((id) =>
      users.filter((user) =>
        user.subscribedToUser.some((user) => user.subscriberId === id),
      ),
    );
  };

const getGenSubscribedToUser =
  (prisma: PrismaClient) => async (ids: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: {
        userSubscribedTo: {
          some: {
            authorId: {
              in: [...ids],
            },
          },
        },
      },
      include: {
        userSubscribedTo: true,
      },
    });

    return ids.map((id) =>
      users.filter((user) => user.userSubscribedTo.some((user) => user.authorId === id)),
    );
  };

const getGenMemberTypeById = (prisma: PrismaClient) => async (ids: readonly string[]) => {
  const memberTypes = await prisma.memberType.findMany({
    where: {
      id: {
        in: [...ids],
      },
    },
  });

  const resultsMap = memberTypes.reduce(
    (acc, curr) => acc.set(curr.id, curr),
    new Map<string, MemberType>(),
  );

  return ids.map((id) => resultsMap.get(id) ?? null);
};

export const createLoaders = (prisma: PrismaClient) => {
  return {
    users: new DataLoader<string, Nullable<User>>(getGenUsers(prisma)),
    postsByAuthorId: new DataLoader<string, Post[]>(getGenPostsByAuthorId(prisma)),
    profilesByUserId: new DataLoader<string, Nullable<Profile>>(
      getGenProfilesByUserId(prisma),
    ),
    userSubscribedTo: new DataLoader<string, User[]>(getGenUserSubscribedTo(prisma)),
    subscribedToUser: new DataLoader<string, User[]>(getGenSubscribedToUser(prisma)),
    memberTypes: new DataLoader<string, Nullable<MemberType>>(
      getGenMemberTypeById(prisma),
    ),
  };
};
