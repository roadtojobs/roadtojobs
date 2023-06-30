FROM node:18.16-bullseye-slim

RUN apt update && apt install -y nginx supervisor curl bash nano;

# Install surrealDB
RUN curl -sSf https://install.surrealdb.com | sh

RUN mkdir -p /var/log/supervisor/

WORKDIR /home/app

COPY . .

# Init all monorepos
RUN bash ./bin/bootstrap.sh

# Build Web
WORKDIR /home/app/web
RUN npm run build && rm -rf node_modules

# Final configs
COPY ./.docker/supervisord/roadtojobs-workers.conf /etc/supervisor/conf.d/
COPY ./.docker/nginx/roadtojobs-vhost.conf /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/sites-enabled/default

WORKDIR /home/app

RUN chmod -R 777 /home/app/server/start.sh

EXPOSE 80 8000 3553

# Start ALL services
CMD ["/usr/bin/supervisord", "-n"]
