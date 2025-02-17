import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users, messages, messagesRelations } from "./schema";

config({ path: ".env.local" });

const schema = {
  users,
  messages,
  messagesRelations,
};

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });
