import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

import { createLoaders } from './dataLoader.js';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';

const MAX_DEPTH_LIMIT = 5;

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const errors = validate(gqlSchema, parse(query), [depthLimit(MAX_DEPTH_LIMIT)]);
      if (errors.length > 0) {
        return { errors };
      }

      const loaders = createLoaders(prisma);

      return graphql({
        schema: gqlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, loaders },
      });
    },
  });
};

export default plugin;
