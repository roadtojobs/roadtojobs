import { initSurrealDbConnection } from '@db';

async function main(): Promise<void> {
  console.info('Connecting to DB...');
  await initSurrealDbConnection();
  console.info('DB connected.');
}

main();
