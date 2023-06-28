import { test, expect } from '@playwright/test';

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

  // validation check...
  const submitButton = page.locator('#create-journey-submit');
  await submitButton.click();
  await expect(page.getByText('Journey Name is required')).toBeVisible();
  await expect(page.getByText('Description is required')).toBeVisible();

  // input then submit
  await page.locator('#journey_name').fill(`Test journey at ${Date.now()}`);
  await page.locator('#journey_description').fill(`This is a test journey`);
  await page.locator('#journey_date').fill('2023-01-02');
  await page.locator('#journey_goal').fill('Increase income');

  await page.getByRole('button', { name: 'Create' }).click({
    force: true,
  });

  // redirect to new page
  await page.getByText('It begins at').waitFor({
    timeout: 10_000,
  });
  await expect(page).toHaveTitle(/Test journey at/);
});
