import { db } from '@db';
import { fakerEN_US as faker } from '@faker-js/faker';
import { rootDbClient, userAdminDbClient } from '../seeder';

type Result = Record<string, unknown>[][];

export default async function seedInterviewJourneyCompany() {
  const [activeJourney] = await db.select('interview_journey:active_journey');
  if (!activeJourney) {
    console.log(
      'No active journey to insert. Stop the seedInterviewJourneyCompany'
    );

    return;
  }

  const [companyResult, stageResult, userResult] = await Promise.all([
    db.query<Result>(`SELECT * FROM company ORDER BY rand() LIMIT 10`),
    db.query<Result>(`SELECT * FROM stage ORDER BY rand()`),
    db.select('user:admin'),
  ]);

  const user = String(userResult[0].id);

  const companies = companyResult[0].result;
  const stages = stageResult[0].result;

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

    const [journeyItem] = await userAdminDbClient.create(
      'interview_journey_company',
      {
        // reference: index + 1,
        interview_journey: activeJourney.id,
        company: companyId,
        user,
        stage: stage.id,
        description: faker.lorem.paragraphs(
          faker.helpers.rangeToNumber({
            min: 2,
            max: 5,
          })
        ),
        attributes,
      }
    );

    await userAdminDbClient.query(
      `
      RELATE ${activeJourney.id}->items->${journeyItem.id} CONTENT {
        user = $user
      }
    `,
      { user }
    );

    await userAdminDbClient.create('interview_journey_company_activity', {
      interview_journey_company: journeyItem.id,
      type: 'ADDED_ATTRIBUTES',
      user,
      attributes,
    });

    await userAdminDbClient.create('interview_journey_company_activity', {
      interview_journey_company: journeyItem.id,
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

  console.log(`Created 10 interview journey company for user:admin.`);
}
