import { db } from '@db';
import { fakerEN_US as faker } from '@faker-js/faker';

export default async function seedCompanies() {
  const total = 50;
  const promises = [];

  console.log(`Creating ${total} companies...`);
  for (let i = 1; i <= total; i++) {
    promises.push(
      db.create('company', {
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        homepage: faker.internet.url({ protocol: 'https' }),
      })
    );
  }

  await Promise.allSettled(promises);
  console.log(`Created ${total} companies.`);
}
