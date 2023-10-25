import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test('test @login', async ({ page }) => {
  //Arrange
  const loginPage = new LoginPage(page);
  const welcomePage = new WelcomePage(page);

  const userName = testUser1.userEmail;
  const password = testUser1.userPassword;
  await loginPage.goto();

  //Act
  await loginPage.loginUser(userName, password);
  const title = await welcomePage.title();

  //Assert
  expect(title).toContain('Welcome');

  expect(true).toBe(true);
});
