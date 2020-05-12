# Project server

This is my codaisseur portfolio project.

## SETUP How to test this project locally

1. Clone this app

```
The project also has a front-end, so I recommend putting both repositories in 1 folder.
```

2. install dependencies

```
npm install
```

3. Install and/or run docker

```
https://docs.docker.com/get-docker/
```

4. Install PostgreSQL on Docker

```
https://docs.docker.com/engine/examples/postgresql_service/
```

5. Create database, run migrations & seed data

```bash
npm run initdev
```

To reset the db:

```bash
npm run resetDB
```

6. start server with `nodemon` or `node`

Nodemon:

```
npm run dev
```

Node:

```
npm start
```

7. start client
