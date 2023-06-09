/**
 * Development Seeder
 *
 * Seeder is really helpful to generate a bunch of data for development purposes.
 */

import { initSurrealDbRootConnection, db } from '@db';
import seedCompanies from './seeders/seedCompanies';
import seedJourneys from './seeders/seedJourneys';
import env from '@appEnv';
import seedJourneyItems from './seeders/seedJourneyItems';
import { Surreal } from 'surrealdb.js';

export const rootDbClient = db;
export const userAdminDbClient = new Surreal(env.surrealDbEndpoint);

seed();

async function seed() {
  if (env.appEnv === 'production') {
    console.warn(`Seeder can only be used in local environment. Aborted!`);
    return;
  }

  await Promise.all([
    initSurrealDbRootConnection(),
    userAdminDbClient.signin({
      NS: env.surrealDbNamespace,
      DB: env.surrealDbName,
      user: 'admin',
      pass: 'admin',
      SC: 'roadtojobsusers',
    }),
  ]);

  // seeding...
  await seedCompanies();
  await seedJourneys();
  await seedJourneyItems();

  console.log('Closing DB connection...');
  await Promise.all([rootDbClient.close(), userAdminDbClient.close()]);
  console.log('DB connection closed.');

  console.log('Seeder finished.');
}
