import { test, expect } from '@playwright/test';

test('Can visit companies list', async ({ page }) => {
  await page.goto('/companies');

  await expect(page).toHaveTitle(/Companies/);
  await expect(page.getByText('Create new Company')).toBeDefined();
  await expect(page.getByText('Adobe')).toBeDefined();
});
