import { buildSchema } from "drizzle-graphql";
import { NextRequest } from "next/server";
import { db } from "@/db/db";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const { schema } = buildSchema(db);

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
