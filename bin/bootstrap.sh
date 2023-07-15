#!/bin/bash
set -e

# This .sh file need to be run in the root folder

ROOT_DIR=$(pwd)

echo "Bootstrapping the RoadToJobs OSS project...";

cd $ROOT_DIR/shared && npm ci
cd $ROOT_DIR/server && npm ci && cp .env.example .env
cd $ROOT_DIR/web && npm ci  && cp .env.example .env
cd $ROOT_DIR/tests-e2e && npm ci  && cp .env.example .env

echo "Bootstrapped the RoadToJobs OSS project.";
echo "Please check out each folder and update the .env file";
echo "Enjoy! - RoadToJobs";
