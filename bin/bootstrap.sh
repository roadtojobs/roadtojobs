# This .sh file need to be run in the root folder

ROOT_DIR=$(pwd)

echo "Bootstrapping the project...";

cd $ROOT_DIR/server && npm ci
cd $ROOT_DIR/web && npm ci

echo "Ready to use! Enjoy!!";
