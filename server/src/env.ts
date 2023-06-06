import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const environmentVariables = z.object({
  appName: z.string(),
  appEnv: z.string(),
  appPort: z.string(),
  surrealDbEndpoint: z.string(),
  surrealDbNamespace: z.string(),
  surrealDbName: z.string(),
  surrealDbUser: z.string(),
  surrealDbPass: z.string(),
});

type EnvironmentVariables = z.infer<typeof environmentVariables>;

function readEnvFile(envFileName: string): dotenv.DotenvParseOutput {
  const envPath = path.resolve(process.cwd(), envFileName);
  const envVars = fs.readFileSync(envPath);
  return dotenv.parse(envVars);
}

function getEnvironmentVariables(): EnvironmentVariables {
  const envVars = readEnvFile('.env');

  return environmentVariables.parse({
    appName: envVars.APP_NAME,
    appEnv: envVars.APP_ENV,
    appPort: envVars.APP_PORT,
    surrealDbEndpoint: envVars.SURREAL_DB_ENDPOINT,
    surrealDbNamespace: envVars.SURREAL_DB_NAMESPACE,
    surrealDbName: envVars.SURREAL_DB_NAME,
    surrealDbUser: envVars.SURREAL_DB_USER,
    surrealDbPass: envVars.SURREAL_DB_PASS,
  });
}

export default getEnvironmentVariables();
