import { initSurrealDbRootConnection } from '@db';

async function main(): Promise<void> {
  console.info('Connecting to DB...');
  await initSurrealDbRootConnection();
  console.info('DB connected.');
}

main();
