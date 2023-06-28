import { test, expect } from '@playwright/test';

test('Can visit companies list', async ({ page }) => {
  await page.goto('/companies');

  await expect(page).toHaveTitle(/Companies/);
  await expect(page.getByText('Create new Company')).toBeDefined();
  await expect(page.getByText('Adobe')).toBeDefined();
});

test('Can create a new company', async ({ page }) => {
  await page.goto('/companies');

  const openModalBtn = page.getByText('Create new Company');
  await openModalBtn.waitFor();
  await openModalBtn.click();

  const slideTitle = page.getByText('Add new Company');
  await slideTitle.waitFor();

  // validation check...
  const submitButton = page.locator('#create-company-submit');
  await submitButton.click();

  await expect(page.getByText('Company name is required')).toBeVisible();
  await expect(page.getByText('Please use ALPHA-2 Country Code')).toBeVisible();

  // input then submit
  const companyName = `${Math.random()} RoadToJobs`;
  const companyHomePage = `https://this-iz-homepage.com/?x=${Math.random()}`;
  await page.locator('#company_name').fill(companyName);
  await page.locator('#company_country_code').fill(`SG`);
  await page.locator('#company_homepage').fill(companyHomePage);

  await submitButton.click();

  // slideover will be closed
  await expect(slideTitle).toBeHidden();
  await expect(page.getByText(companyName)).toBeVisible();
  await expect(page.getByText(companyHomePage)).toBeVisible();
});
