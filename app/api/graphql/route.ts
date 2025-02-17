import { buildSchema } from "drizzle-graphql";
import { NextRequest } from "next/server";
import { db } from "@/db/db";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import bcrypt from "bcrypt";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Get the base schema from drizzle-graphql
const { schema: drizzleSchema } = buildSchema(db);

// Define custom types and mutations
const typeDefs = `
  type LoginResponse {
    id: String!
  }

  type Mutation {
    login(username: String!, password: String!): LoginResponse
  }
`;

const resolvers = {
  Mutation: {
    login: async (
      _: any,
      { username, password }: { username: string; password: string }
    ) => {
      // Find user by username
      const user = await db.query.users.findFirst({
        where: eq(users.username, username),
      });

      if (!user) {
        throw new Error("Invalid username or password");
      }

      // Verify password
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("Invalid username or password");
      }

      return {
        id: user.id,
      };
    },
  },
};

// Merge schemas
const schema = makeExecutableSchema({
  typeDefs: [drizzleSchema, typeDefs],
  resolvers: [resolvers],
});

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
