import { buildSchema } from "drizzle-graphql";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { db } from "./db/db";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";
import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

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
    _: unknown,
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

const schema = new GraphQLSchema({
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
      login: loginMutation,
    },
  }),
  types: [...Object.values(entities.types), ...Object.values(entities.inputs)],
});

// Create Yoga server with extended schema
const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
