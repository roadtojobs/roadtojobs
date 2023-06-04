import { Surreal } from 'surrealdb.js';

type SurrealProps = {
  endpoint: string;
  namespace: string;
  database: string;
};

export function getSurrealClient(props: SurrealProps): Surreal {
  return new Surreal(props.endpoint, {
    async prepare(connection) {
      await connection.use(props.namespace, props.database);
    },
  });
}
