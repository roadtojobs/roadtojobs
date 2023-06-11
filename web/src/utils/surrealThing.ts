/**
 * Extract id from full schema:id
 */
export const pickThingId = (fullId: string) => {
  return fullId.split(':')[1];
};

/**
 * Generate full schema:id
 */
export const generateId = (table: string, id: string) => {
  return `${table}:${id}`;
};
