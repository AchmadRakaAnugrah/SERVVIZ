# SERVVIZ

## **⚠️ WARNING: USAGE RESTRICTIONS ⚠️**

>You are allowed to use the code in this repository for personal projects or non-profit educational purposes. **However, it is strictly prohibited to sell or profit from the code in any form.** By using this code, you agree to these terms and acknowledge that any violation may result in legal consequences.

## What is this?

Basically, it's a CRUD web app. There are still a lot of bugs. Other groups are using Laravel, and some of them don't even know what they do because they rely on _"joki tugas"_, but our group are the edgy one. We were using Vue before, but it was horrible, so we changed it to Svelte just 3 days before the deadline. As a result, it barely finished in time.

## What we use?

- PostgreSQL on top of Docker
- Express
- Svelte (also with Flowbite component)
- Vite
- Typescript

## How to?

Change directory to `server` (backend directory)

```sh
cd server
```

Init the docker compose

```sh
docker compose up -d
```

Make .env file for Prisma

```sh
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydatabase?schema=public"' > .env
```

Install `node_modules`

```sh
npm install
```

Migrate the database

```sh
npx prisma migrate dev
```

Build the back-end code

```sh
npm run build
```

Start the backend

```sh
npm run start
```

Change the directory to `client` (frontend directory)

```sh
cd ../client
```

Install `node_modules`

```sh
npm install
```

Start development server

```sh
npm run dev
```

Check your terminal output. Typically, Vite chooses port **5173** for development.
