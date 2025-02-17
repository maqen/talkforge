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

Rename `env.local.example` to `env.local` and set the `DATABASE_URL` variable if you need to.

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
