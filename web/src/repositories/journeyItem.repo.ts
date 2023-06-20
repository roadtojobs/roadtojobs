import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  JourneyItem,
  JourneyItemTable,
  journeyItemTableToJourneyItem,
} from 'shared/entities/journeyItem.entity';
import { CreateOutcomes } from '@/types/db';

type CreateJourneyItem = Omit<
  JourneyItem,
  | 'id'
  | 'updatedAt'
  | 'createdAt'
  | 'stage'
  | 'company'
  | 'user'
  | 'reference'
  | 'attributes'
>;

type UpdateJourneyItem = Pick<
  JourneyItem,
  'stageId' | 'description' | 'attributes' | 'color'
>;

export const journeyItemRepo = {
  async getByJourney(interviewJourneyId: string): Promise<JourneyItem[]> {
    const [result] = await dbClient.query<JourneyItemTable[][]>(
      `
      SELECT *
      FROM ${TABLES.JOURNEY_ITEM}
      WHERE journey = $id
      FETCH company, stage
    `,
      {
        id: interviewJourneyId,
      }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(journeyItemTableToJourneyItem);
  },

  async getNextPersonalReferenceId(
    userId: string,
    interviewJourneyId: string
  ): Promise<number> {
    const [result] = await dbClient.query<
      {
        max: number;
      }[][]
    >(
      `
      SELECT math::max(reference) as max
      FROM ${TABLES.JOURNEY_ITEM}
      WHERE user = $user AND journey = $journey
      GROUP ALL
    `,
      { user: userId, journey: interviewJourneyId }
    );

    if (result.status === 'ERR') {
      return -1;
    }

    return (result.result[0]?.max || 0) + 1;
  },

  async create(values: CreateJourneyItem): Promise<CreateOutcomes> {
    const reference = await journeyItemRepo.getNextPersonalReferenceId(
      values.userId,
      values.journeyId
    );

    let creationResult;

    try {
      creationResult = await dbClient.create(TABLES.JOURNEY_ITEM, {
        reference,
        journey: values.journeyId,
        user: values.userId,
        company: values.companyId,
        stage: values.stageId,
        description: values.description,
        color: values.color,
      });

      return {
        success: true,
        id: creationResult[0].id,
      };
    } catch (e: unknown) {
      let message = '';
      let formErrors = new Map<string, string>();
      if (e instanceof Error && e.message.includes('unq_company_journey')) {
        message =
          'This company is already in your journey. Please select another company. Thanks';

        formErrors.set('companyId', 'This company is already in your journey.');
      }

      return {
        success: false,
        message,
        formErrors: formErrors.size <= 0 ? undefined : formErrors,
      };
    }
  },

  async update(
    id: string,
    values: Partial<UpdateJourneyItem>
  ): Promise<string | undefined> {
    try {
      const [result] = await dbClient.merge(id, {
        description: values.description,
        color: values.color,
        attributes: values.attributes || [],
        stage: values.stageId,
      });

      return result.id;
    } catch (e) {
      return undefined;
    }
  },
};
