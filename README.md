# Death Walk API

## Quick Start

#### `npm i`

#### `npm run dev`

## Description

This is an api created for the game Death-Walk. It utilizes express, typescript, and graphql.

## Dependencies

- @types/express
- @types/node
- @types/pg
- concurrently
- nodemon,
- typescript    
- dotenv,
- express,
- express-graphql,
- graphql
- pg

## Docker Postgres

docker pull postgres:latest
mkdir -p $HOME/docker/volumes/postgres
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
docker ps -a
docker exec -it <Container-ID> bash
psql -U postgres
CREATE DATABASE library;

## DEV NOTES

- SELECT setval('hard_game_id_seq', (SELECT MAX(id) FROM hard_game));