FROM node:18.16-alpine

RUN set -uex; \
    apk update; \
    apk add py-pip; \
    pip install supervisor supervisor-stdout; \
    apk add nginx;

# Install surrealDB
RUN curl -sSf https://install.surrealdb.com | sh

WORKDIR /home/app

COPY . .

# Init all monorepos
RUN bash ./bin/bootstrap.sh

# Build Web
WORKDIR /home/app/web
RUN npm run build && rm -rf node_modules

# Final configs
COPY ./.docker/roadtojobs-workers.conf /etc/supervisor/conf.d/
COPY ./.docker/roadtojobs-vhost.conf /etc/nginx/conf.d/default.conf

WORKDIR /home/app

EXPOSE 80 8000 3553

# Start ALL services
CMD ["/usr/local/bin/supervisord", "-n"]
