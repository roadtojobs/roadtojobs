import { db } from '@db';
import { fakerEN_US as faker } from '@faker-js/faker';
import { userAdminDbClient } from '../seeder';
import { TABLES } from 'shared/constants/tables';

type Result = Record<string, unknown>[][];

export default async function seedJourneyItems() {
  const journeys = await db.select(`${TABLES.JOURNEY}`);
  if (!journeys.length) {
    console.log('No journey to insert. Stop the seedJourneyItems');

    return;
  }

  for (const journey of journeys) {
    await seedJourneyItemsForJourney(
      journey,
      journey.id === 'journey:active_journey' ? 20 : 10
    );
  }
}

async function seedJourneyItemsForJourney(
  activeJourney: Record<string, unknown>,
  total: number
) {
  const [companyResult, stageResult, userResult] = await Promise.all([
    db.query<Result>(
      `SELECT * FROM ${TABLES.COMPANY} ORDER BY rand() LIMIT ${total}`
    ),
    db.query<Result>(`SELECT * FROM ${TABLES.STAGE} ORDER BY rand()`),
    db.select(`${TABLES.USER}:admin`),
  ]);

  const user = String(userResult[0].id);

  const companies = companyResult[0].result;
  const stages = stageResult[0].result;

  console.log(
    `Creating ${total} journey items for ${activeJourney.name} journey...`
  );

  const promises = companies?.map(async (company, index) => {
    const companyId = company.id;
    const stage = faker.helpers.arrayElement(stages ?? []);

    const attributes = [
      {
        color: 'blue',
        text: faker.helpers.arrayElement([
          'PHP',
          'Java',
          'JavaScript',
          'TypeScript',
          'NodeJS',
          'Vue',
          'React',
        ]),
      },
      {
        color: 'rose',
        text: faker.helpers.arrayElement([
          '~$60k/annually',
          '~$70k/annually',
          '~$80k/annually',
          '~$90k/annually',
          '~$8k/monthly',
          '~$9k/monthly',
          '~$10k/monthly',
        ]),
      },
    ];

    const [journeyItem] = await userAdminDbClient.create(TABLES.JOURNEY_ITEM, {
      reference: index + 1,
      journey: activeJourney.id,
      company: companyId,
      user,
      stage: stage.id,
      description: faker.lorem.paragraphs(
        faker.helpers.rangeToNumber({
          min: 2,
          max: 5,
        })
      ),
      color: faker.helpers.arrayElement([
        'rose',
        'pink',
        'gray',
        'indigo',
        'yellow',
        'sky',
        'blue',
        'purple',
      ]),
      attributes,
    });

    await userAdminDbClient.create(TABLES.JOURNEY_ITEM_ACTIVITY, {
      journey_item: journeyItem.id,
      type: 'ADDED_ATTRIBUTES',
      user,
      attributes,
    });

    await userAdminDbClient.create(TABLES.JOURNEY_ITEM_ACTIVITY, {
      journey_item: journeyItem.id,
      type: 'ADDED_NOTE',
      user,
      comment: faker.lorem.paragraphs(
        faker.helpers.rangeToNumber({
          min: 1,
          max: 3,
        })
      ),
    });
  });

  await Promise.all(promises ?? []);

  console.log(
    `Created ${total} journey items for ${activeJourney.name} journey...`
  );
}
