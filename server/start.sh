#!/bin/bash
cd /home/app/server

PATH="/root/.nvm/versions/node/v18.16.0/bin:$PATH"

npm run prod
