import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  const userName = 'Moses.Armstrong@Feest.ca';
  const password = 'test1';
  await loginPage.goto();

  //Act
  await loginPage.loginUser(userName, password);
  const title = await welcomePage.title();

  //Assert
  expect(title).toContain('Welcome');
  //await page.getByTestId('hello').click();

  expect(true).toBe(true);
});
