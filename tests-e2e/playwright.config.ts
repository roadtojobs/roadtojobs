import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

console.log(`Using this baseURL: ${process.env.WEB_APP_URL}`);

export default defineConfig({
  testDir: './tests',
  testMatch: '*spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.WEB_APP_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
