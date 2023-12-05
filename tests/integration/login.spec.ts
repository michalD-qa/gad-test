import { LoginUserModel } from '@_src/models/user.model';
import { LoginPage } from '@_src/pages/login.page';
import { testUser1 } from '@_src/test-data/user.data';
import { test as base, expect } from '@playwright/test';

type newFixture = {
  loginPageNew: LoginPage;
};

const test = base.extend<newFixture>({
  loginPageNew: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

test.describe('Verify login page', () => {
  test('User can login with proper email and password @login @GAD-R02-01', async ({
    page,
  }) => {
    //Arrange
    const expectedWelcomeTitle = 'Welcome';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.goto();
    const welcomePage = await loginPage.loginUser(testUser1);
    const title = await welcomePage.getTitle();

    //Assert
    expect(title).toContain(expectedWelcomeTitle);
  });
  test("User can't login with invalid email and password @login @GAD-R02-01", async ({
    page,
  }) => {
    //Arrange
    const expectedLoginErrorText = 'Invalid username or password';
    const loginPage = new LoginPage(page);

    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    //Act
    await loginPage.goto();
    await loginPage.loginUser(loginUserData);

    //Assert
    await expect(loginPage.loginErrorText).toHaveText(expectedLoginErrorText);
  });
});
