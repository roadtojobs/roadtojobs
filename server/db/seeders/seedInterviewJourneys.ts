import { db } from '@db';
import { fakerEN_US as faker } from '@faker-js/faker';

export default async function seedInterviewJourneys() {
  const total = 5;
  const userId = 'user:admin';
  const promises = [];

  console.log(`Creating ${total} interview journey...`);
  for (let i = 1; i <= total; i++) {
    promises.push(
      db.create('interview_journey', {
        user: userId,
        name: `This is my interview journey ${faker.internet.emoji()}`,
        description: 'Find new job for the Senior Software Engineer',
        note: 'Goal: big earning, best benefits,...',
        started_at: new Date(`2023-01-0${i}`),
      })
    );
  }

  await Promise.all(promises);
  console.log(`Created ${total} interview journey.`);
}
