import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/contact_us');
  await page.getByRole('button', { name: 'Autoriser' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('nameeee');  
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('mail@mail.fr');
  await page.getByRole('textbox', { name: 'Subject' }).fill('sujet');
  await page.getByRole('textbox', { name: 'Your Message Here' }).fill('bonjour à tous');
  await page.locator('input[name="upload_file"]').click();
  await page.locator('input[name="upload_file"]').setInputFiles('attentesApprenant.pdf');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#contact-page')).toContainText('Success! Your details have been submitted successfully.');
  await expect(page.locator('#contact-page')).toContainText('Success! Your details have been submitted successfully.');
});