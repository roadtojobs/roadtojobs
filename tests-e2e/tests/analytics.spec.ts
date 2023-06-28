import { test, expect } from '@playwright/test';

test('Can visit analytics', async ({ page }) => {
  await page.goto('/analytics');

  await expect(page).toHaveTitle(/Analytics/);
  await expect(page.getByText(String(new Date().getFullYear()))).toBeDefined();
});
