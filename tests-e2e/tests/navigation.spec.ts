import { test, expect } from '@playwright/test';

test('Can navigate to other pages', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('interview-journey').click();

  const createInterviewButton = await page.getByText('Create new Journey');
  await createInterviewButton.waitFor();

  await page.getByTestId('companies').click();

  const createCompanyButton = await page.getByText('Create new Company');
  await createCompanyButton.waitFor();
});
