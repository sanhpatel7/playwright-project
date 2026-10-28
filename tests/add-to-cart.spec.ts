import { test, expect } from '@playwright/test';

test('user can add a product to the cart', async ({ page }) => {
  // 1. Open the website
  await page.goto('https://www.saucedemo.com', { waitUntil: 'domcontentloaded' });

  // 2. Log in
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Verify we reached the products page
  await expect(page).toHaveURL(/inventory/);

  // 4. Add the backpack to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // 5. Verify the cart icon shows 1 item
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  // 6. Open the cart
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(/cart/);

  // 7. Verify only the backpack is in the cart
  await expect(page.locator('[data-test="cart-list"] [data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
});