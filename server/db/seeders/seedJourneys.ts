import { fakerEN_US as faker } from '@faker-js/faker';
import { userAdminDbClient } from '../seeder';
import { TABLES } from 'shared/constants/tables';

export default async function seedJourneys() {
  const total = 5;
  const userId = 'user:admin';
  const promises = [];

  console.log(`Creating ${total} interview journey...`);
  for (let i = 1; i <= total; i++) {
    const customId = i === total ? ':active_journey' : '';

    promises.push(
      userAdminDbClient.create(`${TABLES.JOURNEY}${customId}`, {
        user: userId,
        name: `This is my interview journey ${faker.internet.emoji()}`,
        description: faker.lorem.paragraphs(
          faker.helpers.rangeToNumber({
            min: 2,
            max: 5,
          })
        ),
        note: faker.lorem.paragraphs(
          faker.helpers.rangeToNumber({
            min: 2,
            max: 5,
          })
        ),
        started_at: new Date(`2023-01-0${i}`),
        ended_at: i === total ? null : new Date(`2023-02-0${i}`),
      })
    );
  }

  // previous year journey
  promises.push(
    userAdminDbClient.create(`${TABLES.JOURNEY}:last_year`, {
      user: userId,
      name: `The 2022 of awesome job`,
      description: faker.lorem.paragraphs(
        faker.helpers.rangeToNumber({
          min: 2,
          max: 5,
        })
      ),
      note: faker.lorem.paragraphs(
        faker.helpers.rangeToNumber({
          min: 2,
          max: 5,
        })
      ),
      started_at: new Date(`2022-05-05`),
      ended_at: new Date(`2022-07-07`),
    })
  );

  // archived journey
  promises.push(
    userAdminDbClient.create(`${TABLES.JOURNEY}:archived_journey`, {
      user: userId,
      name: `The archived journey`,
      description: faker.lorem.paragraphs(
        faker.helpers.rangeToNumber({
          min: 2,
          max: 5,
        })
      ),
      note: faker.lorem.paragraphs(
        faker.helpers.rangeToNumber({
          min: 2,
          max: 5,
        })
      ),
      started_at: new Date(`2022-05-06`),
      archived_at: new Date(`2022-05-06`),
      archived_reason: `Rethinking again, also set up an **1:1** call with EM to see if he can fulfil my requests.`,
    })
  );

  await Promise.all(promises);
  console.log(`Created ${total} interview journey.`);
}
