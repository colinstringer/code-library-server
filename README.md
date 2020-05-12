# Server template

This is my codaisseur portfolio project.

## Table of contents:

- **[Setup](#setup-how-to-use-this-template)**
- **[Endpoints](#endpoints)**
- **[Sample requests with axios](#sample-requests-with-axios)**
- **[Sample requests with httpie](#sample-requests-with-httpie)**
- **[History of this project (pullrequests)](#history-of-this-project)**

## SETUP How to test this project locally

1. Clone this app

The project also has a front end, so I recommend putting both repositories in 1 folder.

2. install dependencies

```
npm install
```

3. Install and/or run docker

https://docs.docker.com/get-docker/

4. Install PostgreSQL on Docker

https://docs.docker.com/engine/examples/postgresql_service/

5. Create database, run migrations & seed data

```bash
npm run initdev
```

To reset the db:

```bash
npm run resetDB
```

6. start server with `nodemon` or node

Nodemon:

```
npm run dev
```

Node:

```
npm start
``
