import { initSurrealDbRootConnection } from '@db';
import initServer from './server';
import runMigration from '../db/migrate';

async function main(): Promise<void> {
  console.log(
    '\x1b[36mThe Road To Jobs Application [Self-Hosted / FREE / Open-sourced Software]'
  );
  console.log(
    '\x1b[35mPowered by RoadToJobs x Seth Phat (@roadtojobs @sethsandaru on GitHub)'
  );
  console.log('\x1b[35mHave a great interview ahead and best of lucks.');

  console.info('\x1b[33mConnecting to DB...');
  await initSurrealDbRootConnection();
  console.info('\x1b[32mDB connected.');

  await runMigration(false);

  console.info('\x1b[33mStarting Express Server...');
  await initServer();
}

main();
