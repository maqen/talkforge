# Talkforge

A simple chat app for real and AI friends.

## Setup

Requirements:

```bash
- Node.js 20
- Docker & Docker Compose
- pnpm
```

Create environment file (`.env.local`)

```bash
mv env.local.example .env.local
```

(Set the `DATABASE_URL` variable if you need to)

Start postgres database:

```bash
docker compose up -d
```

Install dependencies

```bash
pnpm install
```

Start graphql server:

```bash
pnpm graphql
```

Run the development server:

```bash
pnpm dev
```

Visit [http://localhost:3000] you can login with `mrtest1:testtest` and `testguy2:testtest` for testing.
