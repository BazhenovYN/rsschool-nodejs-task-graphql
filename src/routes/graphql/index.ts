import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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
      if (errors) {
        return { errors };
      }

      return graphql({
        schema: gqlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });
    },
  });
};

export default plugin;
