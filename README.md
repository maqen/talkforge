# Talkforge

A simple chat app for real and AI friends.

## Setup

Requirements:

```bash
- Node.js 20
- Docker & Docker Compose
- pnpm
```

Install dependencies:

```bash
pnpm install
```

Start postgres database:

```bash
docker compose up -d
```

Create environment file (`.env.local`)
```bash
mv env.local.example .env.local
````
set the `DATABASE_URL` variable if you need to.

Bootstrap the database:

```bash
pnpm db:bootstrap
```

If you get an error about bcrypt not found, try run:

```bash
pnpm approve-builds bcrypt
```

Run the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000] you can login with `mrtest1:testtest` and `testguy2:testtest` for testing.

## Realtime

To make this super real-time, we could implement graphql subscriptions.

Start by dockerizing the code below.

```typescript
import { db } from "./db";
import { buildSchema } from 'drizzle-graphql';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const { schema } = buildSchema(db);

const server = new ApolloServer({ schema });
const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
```
