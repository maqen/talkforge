import type { CodegenConfig } from "@graphql-codegen/cli";
import { buildSchema } from "drizzle-graphql";
import { printSchema } from "graphql";
import { db } from "./db/db";

const { schema } = buildSchema(db);
const schemaString = printSchema(schema);

const config: CodegenConfig = {
  schema: schemaString,
  documents: ["./graphql/**/*.{graphql,js,ts,jsx,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "named-operations-object",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        useConsts: true,
      },
    },
    "./graphql/schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
