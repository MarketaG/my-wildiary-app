# MY WILDIARY APP — Explore the Wild

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Set up environment variables

In the project root, create a file: **`.env.local`**
and fill in the required values:

MONGODB_URI="your-mongodb-uri-here"
NEXT_PUBLIC_BASE_URL=http://localhost:3000

**_Note:_**
_You can obtain `MONGODB_URI` from MongoDB Atlas.
You must have an Atlas account, create your own cluster and user,
and then copy the connection string from the Connect → Drivers section._

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 4. Open the application

Visit:

```bash
http://localhost:3000
```
