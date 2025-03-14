import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'username' }).click();
  await page.getByRole('textbox', { name: 'username' }).fill('A');
  await page.getByRole('textbox', { name: 'username' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'password' }).click();
  await page.getByRole('textbox', { name: 'password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('#app')).toContainText('Time at Work');
  await expect(page.locator('#app')).toContainText('(1) Pending Self Review');
  await expect(page.getByText('Quick Launch')).toBeVisible();
  await expect(page.getByText('Buzz Latest Posts')).toBeVisible();

  //add
  await page.getByRole('link', { name: 'Recruitment' }).click();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox', { name: 'First name' }).click();
  await page.getByRole('textbox', { name: 'First name' }).fill('djamel');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('yousfi');
  await page.locator('form i').first().click();
  await page.getByText('Junior Account Assistant').click();
  await page.getByRole('textbox', { name: 'Type here' }).first().click();
  await page.getByRole('textbox', { name: 'Type here' }).first().fill('email@email.com');
  await page.getByRole('textbox', { name: 'Type here' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Type here' }).nth(1).fill('01121212');
  await page.getByText('Browse').click();
  await page.locator('input[type="file"]').setInputFiles('attentesApprenant.pdf');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('label').filter({ hasText: 'Edit' }).locator('span').click();
  //check
  await expect(page.locator('#app')).toContainText('djamel yousfi');
  await expect(page.locator('#app')).toContainText('Junior Account Assistant');

  //logout
  await page.getByRole('listitem').filter({ hasText: 'manda user' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page.getByRole('heading')).toContainText('Login');
});