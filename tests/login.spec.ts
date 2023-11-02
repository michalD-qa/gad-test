import { LoginUser } from '../src/models/user.model';
import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { testUser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe('Verify login page', () => {
  test('User can login with proper email and password @login @GAD-R02-01', async ({
    page,
  }) => {
    //Arrange
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    //Act
    await loginPage.goto();
    await loginPage.loginUser(testUser1);
    const title = await welcomePage.title();

    //Assert
    expect(title).toContain('Welcome');
  });
  test("User can't login with invalid email and password @login @GAD-R02-01", async ({
    page,
  }) => {
    //Arrange
    const loginPage = new LoginPage(page);

    const loginUserData: LoginUser = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    await loginPage.goto();

    //Act
    await loginPage.loginUser(loginUserData);
    // const title = await loginPage.title();

    //Assert
    await expect(loginPage.loginErrorText).toHaveText(
      'Invalid username or password',
    );
  });
});
