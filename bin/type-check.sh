#!/bin/bash
set -e

# This .sh file need to be run in the root folder

ROOT_DIR=$(pwd)

echo "[Shared] Running Type-Check...";
cd $ROOT_DIR/shared && npm run tsc
echo "[Shared] Type-Check passed!";

echo "[Server] Running Type-Check...";
cd $ROOT_DIR/server && npm run type-check
echo "[Server] Type-Check passed!";

echo "[Web] Running Type-Check & Build...";
cd $ROOT_DIR/web && npm run type-check && npm run tsc && npm run build
echo "[Web] Type-Check & Build passed!";

echo "ALL GOOD!";
