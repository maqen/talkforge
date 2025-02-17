import { db } from "@/db/db";
import { users } from "@/db/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import bcrypt from "bcrypt";
import { buildSchema } from "drizzle-graphql";
import { eq } from "drizzle-orm";
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { NextRequest } from "next/server";

const { entities } = buildSchema(db);

const loginMutation = {
  type: new GraphQLObjectType({
    name: "LoginResponse",
    fields: {
      id: { type: GraphQLString },
    },
  }),
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (
    _: any,
    { username, password }: { username: string; password: string }
  ) => {
    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid username or password");
    }

    return {
      id: user.id,
    };
  },
};

const extendedSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...entities.queries,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      ...entities.mutations,
      loginMutation,
    },
  }),
  types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});

const server = new ApolloServer({ schema: extendedSchema });

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler as GET, handler as POST };
