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

test('Can view a company in slideover', async ({ page }) => {
  await page.goto('/companies');

  await page.getByTestId('view-company-0').click();

  await expect(page.getByText('Viewing Company:')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Edit', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Close', exact: true })
  ).toBeVisible();
});

test('Can edit a company in slideover', async ({ page }) => {
  await page.goto('/companies');

  await page.getByTestId('view-company-0').click();

  await expect(page.getByText('Viewing Company:')).toBeVisible();

  await page.getByRole('button', { name: 'Edit', exact: true }).click();

  await expect(
    page.getByRole('button', { name: 'Submit', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Cancel', exact: true })
  ).toBeVisible();

  // fill and real edit
  await page.locator('#company_name').fill('A new name begin');
  await page.locator('#company_country_code').fill(`VN`);
  await page.locator('#company_homepage').fill('https://new-homepage.com');
  await page
    .locator('#company_description')
    .getByRole('textbox')
    .fill('I think, I believe');

  await page.getByRole('button', { name: 'Submit', exact: true }).click();

  await page.getByTestId('view-company-name').waitFor();

  // assert behaviour
  await expect(
    await page.getByTestId('view-company-name').textContent()
  ).toEqual('A new name begin');
  await expect(
    await page.getByTestId('view-company-country-code').textContent()
  ).toContain('VN');
  await expect(
    await page.getByTestId('view-company-homepage').textContent()
  ).toContain('https://new-homepage.com');
  await expect(
    await page.getByTestId('view-company-description').textContent()
  ).toContain('I think, I believe');

  await expect(
    page.getByRole('button', { name: 'Edit', exact: true })
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Close', exact: true })
  ).toBeVisible();
});
