import { test, expect } from '@playwright/test';

test('standard user can log in successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');
});

test('locked out user sees an error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('[data-test="error"]')).toContainText('locked out');
});