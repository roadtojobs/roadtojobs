import { test, expect } from '@playwright/test';
import { sleep } from './utils/sleep';

test('Can visit interview journeys list', async ({ page }) => {
  await page.goto('/interview-journeys');

  await expect(page).toHaveTitle(/Interview Journeys/);
  await expect(page.getByText('Create new Journey')).toBeDefined();
  await expect(page.getByText('This is my interview journey')).toBeDefined();
});

test('Can create a new journey', async ({ page }) => {
  await page.goto('/interview-journeys');

  const openModalBtn = page.getByText('Create new Journey');
  await openModalBtn.waitFor();
  await openModalBtn.click();

  const modalTitle = page.getByText('Create new Interview Journey');
  await modalTitle.waitFor();

  await sleep(3000);

  // validation check...
  const submitButton = page.locator('#create-journey-submit');
  await submitButton.click();
  await expect(page.getByText('Journey Name is required')).toBeVisible();
  await expect(page.getByText('Description is required')).toBeVisible();

  // input then submit
  await page.locator('#journey_name').fill(`Test journey at ${Date.now()}`);
  await page.locator('#journey_date').fill('2023-01-02');
  await page
    .locator('#journey_goal')
    .getByRole('textbox')
    .fill('Increase income', { force: true });
  await page
    .locator('#journey_description')
    .getByRole('textbox')
    .fill(`This is a test journey`, { force: true });

  await sleep(2000);

  await page.getByRole('button', { name: 'Create' }).click({
    force: true,
    clickCount: 2,
  });

  // redirect to new page
  await page.getByText('It begins at').waitFor({
    timeout: 10_000,
  });
  await expect(page).toHaveTitle(/Test journey at/);
});
