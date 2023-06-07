# This .sh file need to be run in the root folder

ROOT_DIR=$(pwd)

echo "Run Checking";

cd $ROOT_DIR/server && yarn tsc
cd $ROOT_DIR/web && yarn type-check && yarn tsc && yarn build

