# This .sh file need to be run in the root folder

ROOT_DIR=$(pwd)

echo "Run Type Checking...";

cd $ROOT_DIR/server && npm run type-check
cd $ROOT_DIR/web && npm run type-check

echo "ALL GOOD!";
