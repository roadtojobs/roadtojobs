/**
 * Development Seeder
 *
 * Seeder is really helpful to generate a bunch of data for development purposes.
 */

import { initSurrealDbRootConnection, db } from '@db';
import seedCompanies from './seeders/seedCompanies';
import seedInterviewJourneys from './seeders/seedInterviewJourneys';
import env from '@appEnv';
import seedInterviewJourneyCompany from './seeders/seedInterviewJourneyCompany';

seed();

async function seed() {
  if (env.appEnv === 'production') {
    console.warn(`Seeder can only be used in local environment. Aborted!`);
    return;
  }

  await initSurrealDbRootConnection();

  // create companies
  await seedCompanies();
  await seedInterviewJourneys();
  await seedInterviewJourneyCompany();

  console.log('Closing DB connection...');
  await db.close();
  console.log('DB connection closed.');

  console.log('Seeder finished.');
}
