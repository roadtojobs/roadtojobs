import { test, expect } from '@playwright/test';

test('Can visit dashboard', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Dashboard/);
  await expect(page.getByText('journey holds significance')).toBeDefined();
  await expect(page.getByTestId('dashboard')).toHaveClass(/bg-gray-50/);
});
