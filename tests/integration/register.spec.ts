import { generateRandomUserData } from '../../src/factories/user.factory';
import { RegisterUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { RegisterPage } from '../../src/pages/register.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test.describe('Verify register page', () => {
  let registerPage: RegisterPage;
  let registerUserData: RegisterUserModel;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    registerUserData = generateRandomUserData();
    await registerPage.goto();
  });
  test('User can register with mandatory fields and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    //Arrange
    const expectedAlertText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';
    const loginPage = new LoginPage(page);
    const welcomePage = new WelcomePage(page);

    //Act
    await registerPage.registerUser(registerUserData);

    //Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertText);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.getTitle();
    expect.soft(titleLogin).toContain(expectedLoginTitle);

    //Assert test login
    await loginPage.loginUser({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const titleWelcome = await welcomePage.getTitle();
    expect.soft(titleWelcome).toContain(expectedWelcomeTitle);
  });

  test('User can not register with incorrect data @GAD-R03-04', async () => {
    //Arrange
    registerUserData.userEmail = '@$#';
    const expectedErrorText = 'Please provide a valid email address';

    //Act
    await registerPage.registerUser(registerUserData);

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
