import { readdir as readDirectory, readFileSync } from 'fs';
import * as path from 'path';
import { initSurrealDbRootConnection, db } from '@db';
import { md5 } from 'shared/utils/md5';
import env from '../src/env';

const migrationFolderPath = './db/migrations/';

type MigrationFile = {
  filename: string;
  fullPath: string;
};

const args = process.argv.slice(2);

readDirectory(migrationFolderPath, async (err, files) => {
  console.log('Running migration...');

  if (err) {
    console.error('Error reading migration folder:', err);
    return;
  }

  await initSurrealDbRootConnection();
  await createMigrationTable();

  // Filter out non-SQL files and sort them by filename
  const sqlFiles = files
    .filter((file) => path.extname(file) === '.sql')
    .sort()
    .map<MigrationFile>((file) => ({
      filename: file,
      fullPath: path.join(migrationFolderPath, file),
    }));

  let total = 0;
  for (const sqlFile of sqlFiles) {
    const isMigrated = await isAlreadyMigrated(sqlFile);
    if (isMigrated) {
      continue;
    }

    console.log('Migrating ' + sqlFile.filename);
    await migrate(sqlFile);
    console.log('Migrated ' + sqlFile.filename);

    total++;
  }

  if (total > 0) {
    console.log('Migration is done. Closing the db connection...');
  } else {
    console.log('Nothing to migrate. Closing the db connection...');
  }

  await db.close();

  console.log('DB closed.');
  console.log('Migration finished.');
});

async function createMigrationTable() {
  let additionalSql = '';
  if (args.includes('--fresh')) {
    additionalSql += `REMOVE DATABASE ${env.surrealDbName};`;
    console.log('Freshly clear the database and run the migration...');
  }

  await db.query(`
    ${additionalSql}

    DEFINE TABLE migration SCHEMAFULL;
    DEFINE FIELD file ON TABLE migration TYPE string;
    DEFINE FIELD created_at ON TABLE migration TYPE datetime VALUE time::now();
    DEFINE INDEX unq_file ON migration COLUMNS file UNIQUE;
  `);
}

async function isAlreadyMigrated(file: MigrationFile): Promise<boolean> {
  const result = await db.select(`migration:${md5(file.filename)}`);

  return result[0] !== undefined;
}

async function migrate(file: MigrationFile) {
  const sqlContent = readFileSync(file.fullPath).toString();

  await db.query(sqlContent);
  await db.create(`migration:${md5(file.filename)}`, {
    file: file.filename,
  });
}
