# This .sh file need to be run in the root folder

ROOT_DIR=$(pwd)

echo "Bootstrapping the project...";

cd $ROOT_DIR/shared && npm ci && npm run build
cd $ROOT_DIR/server && npm ci && cp .env.example .env
cd $ROOT_DIR/web && npm ci  && cp .env.example .env

echo "Ready to use! Enjoy!!";
