import { db } from '@db';
import { fakerEN_US as faker } from '@faker-js/faker';

type Result = Record<string, unknown>[][];

export default async function seedInterviewJourneyCompany() {
  const [activeJourney] = await db.select('interview_journey:active_journey');
  if (!activeJourney) {
    console.log(
      'No active journey to insert. Stop the seedInterviewJourneyCompany'
    );

    return;
  }

  const [companyResult, stageResult, user] = await Promise.all([
    db.query<Result>(`SELECT * FROM company ORDER BY rand() LIMIT 10`),
    db.query<Result>(`SELECT * FROM stage ORDER BY rand()`),
    db.select('user:admin'),
  ]);

  const companies = companyResult[0].result;
  const stages = stageResult[0].result;

  const promises = companies?.map(async (company) => {
    const companyId = company.id;

    return await db.create('interview_journey_company', {
      interview_journey: activeJourney.id,
      company: companyId,
      user: user[0].id,
      stage: faker.helpers.arrayElement(stages ?? []).id,
      description: faker.lorem.paragraphs(2),
      attributes: [
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
      ],
    });
  });

  await Promise.all(promises ?? []);

  console.log(`Created 10 interview journey company for user:admin.`);
}
