import { dbClient } from '@/libraries/surreal';
import { TABLES } from 'shared/constants/tables';
import {
  JourneyItemActivity,
  JourneyItemActivityTable,
  journeyItemActivityTableToJourneyItem,
} from 'shared/entities/journeyItemActivity.entity';
import { generateId } from '@/utils/surrealThing';
import { DynamicAttributes } from 'shared';

export type CreateNoteJourneyItemActivity = Omit<
  JourneyItemActivity,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'stage'
  | 'stageId'
  | 'company'
  | 'companyId'
  | 'user'
  | 'attributes'
  | 'journeyItem'
>;

export const journeyItemActivityRepo = {
  async getByJourneyCompany(
    journeyCompanyId: string
  ): Promise<JourneyItemActivity[]> {
    const [result] = await dbClient.query<JourneyItemActivityTable[][]>(
      `
      SELECT *
      FROM ${TABLES.JOURNEY_ITEM_ACTIVITY}
      WHERE journey_item = $id
      ORDER BY created_at ASC
      FETCH stage, user, company, company_note
    `,
      {
        id: journeyCompanyId,
      }
    );

    if (result.status === 'ERR') {
      return [];
    }

    return result.result.map(journeyItemActivityTableToJourneyItem);
  },

  async get(id: string): Promise<JourneyItemActivity | undefined> {
    const thingId = id.includes(':')
      ? id
      : generateId(TABLES.JOURNEY_ITEM_ACTIVITY, id);
    const items = await dbClient.select<JourneyItemActivityTable>(thingId);

    return items[0] && journeyItemActivityTableToJourneyItem(items[0]);
  },

  async createNote(
    values: CreateNoteJourneyItemActivity
  ): Promise<string | undefined> {
    try {
      const [result] = await dbClient.create(TABLES.JOURNEY_ITEM_ACTIVITY, {
        comment: values.comment,
        journey_item: values.journeyItemId,
        type: values.type,
        user: values.userId,
      });

      return result.id;
    } catch (e) {
      return undefined;
    }
  },

  async appendAttributes(props: {
    journeyItemId: string;
    userId: string;
    type: 'ADDED_ATTRIBUTES' | 'REMOVED_ATTRIBUTES';
    attributes: DynamicAttributes;
  }): Promise<string | undefined> {
    try {
      const [result] = await dbClient.create(TABLES.JOURNEY_ITEM_ACTIVITY, {
        journey_item: props.journeyItemId,
        type: props.type,
        user: props.userId,
        attributes: props.attributes,
      });

      return result.id;
    } catch (e) {
      return undefined;
    }
  },
};
