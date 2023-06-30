# The All-in-one Docker Image of RoadToJobs

You don't have to run multiple images at once. You only run RoadToJobs at once 😉.

## Behind the scene

We are utilizing `supervisord` (process manager) to run & manage the 3 processes: nginx, server (node) and surreal.

## Exposed Ports
- `80`: webapp
- `8000`: surrealDB
- `3553`: server

## Volume

- SurrealDB filesystem: `/home/app/server/db/local.db`

## Getting started

```bash
docker pull ghcr.io/roadtojobs/roadtojobs:latest

docker run \
  -p 80:80 \
  -p 8000:8000 \
  -p 3553:3553 \
  -v ./db:/home/app/server/db/local.db
  roadtojobs:latest
```

## Build your own

Feel free to take the reference from our `Dockerfile`

Note: you need to build in the project's root folder.

```bash
docker build -f .docker/Dockerfile -t roadtojobs:v1.0.0 .
```
