import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { testUser1 } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login page', () => {
  test('User can login with proper email and password @login @GAD-R02-01', async ({
    page,
  }) => {
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
  });
  test("User can't login with invalid email and password @login @GAD-R02-01", async ({
    page,
  }) => {
    //Arrange
    const loginPage = new LoginPage(page);

    const userName = '3434';
    const password = testUser1.userPassword;
    await loginPage.goto();

    //Act
    await loginPage.loginUser(userName, password);
    // const title = await loginPage.title();

    //Assert
    await expect(loginPage.loginErrorText).toHaveText(
      'Invalid username or password',
    );
  });
});
