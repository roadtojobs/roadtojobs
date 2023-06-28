import { test, expect } from '@playwright/test';

test('Can visit interview journeys list', async ({ page }) => {
  await page.goto('/interview-journeys');

  await expect(page).toHaveTitle(/Interview Journeys/);
  await expect(page.getByText('Create new Journey')).toBeDefined();
  await expect(page.getByText('This is my interview journey')).toBeDefined();
});
