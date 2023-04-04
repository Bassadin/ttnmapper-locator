# ttnmapper-reader

Part of my [Master's Thesis in summer semester 2023](https://github.com/Bassadin/Master-Thesis-INM)

A simple "microservice" that reads data from TTNMapper and stores it in a PostgreSQL database.

## 🍔 Stack Specs

- Node.js
- Express
- TypeScript
- Prisma
- MySQL

## 🧬 Development

- Clone the repository

```
git clone https://github.com/mcnaveen/node-express-prisma-boilerplate nepb
```

- Cd into the project directory

```
cd nepb
```

- Install dependencies

```
pnpm install
```

- Create a Database in MySQL (or) You can use GUI to create a database

```
mysql> CREATE DATABASE express;
```

- Copy the `.env.sample` file as `.env`

```
cp .env.sample .env
```

- Edit the MySQL Details in the `.env` file

```
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DBNAME?schema=public"
```

- Push the Prisma Schema into Database

```
npx prisma migrate dev
```

- Run the development server

```
pnpm dev
```

## 🚀 Production Build

- Run the production build

```
pnpm build
```

- Start the production server

```
pnpm start
```

> Your production build is available on `dist` folder

## 🧭 Endpoints

- `POST` - For Creating New User
- `GET` - For Getting All Users
- `GET` - For Getting User By ID
- `PATCH` - For Updating User By ID
- `DELETE` - For Deleting User By ID
