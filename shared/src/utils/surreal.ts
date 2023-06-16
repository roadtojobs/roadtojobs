const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Parse relationship if presented
 */
export const parseThing = <Table, Entity>(
  field: string | Record<string, unknown>,
  parser: (thing: Table) => Entity
): undefined | Entity => {
  if (isString(field)) {
    return undefined;
  }

  return parser(field as Table) as Entity;
};

/**
 * Parse nullable relationship object if presented
 */
export const parseNullableThing = <Table, Entity>(
  field: string | Record<string, unknown> | null | undefined,
  parser: (thing: Table) => Entity
): undefined | Entity => {
  if (field === null || field === undefined) {
    return undefined;
  }

  return parseThing(field, parser);
};

/**
 * Get the ID from the relationship object or the record link id
 */
export const parseThingId = (record: string | { id: string }) => {
  return isString(record) ? record : record.id;
};

export const parseNullableThingId = (
  record: undefined | string | { id: string }
) => {
  if (record === undefined) {
    return null;
  }

  return parseThingId(record);
};
