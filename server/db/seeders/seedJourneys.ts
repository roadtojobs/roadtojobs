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

  await Promise.all(promises);
  console.log(`Created ${total} interview journey.`);
}
