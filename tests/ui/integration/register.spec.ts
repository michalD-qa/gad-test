import { generateRandomUserData } from '@_src/factories/user.factory';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/models/user.model';

test.describe('Verify register page', () => {
  let registerUserData: RegisterUserModel;

  test.beforeEach(async () => {
    registerUserData = generateRandomUserData();
  });
  test('User can register with mandatory fields and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    registerPage,
  }) => {
    //Arrange
    const expectedAlertText = 'User created';
    const expectedLoginTitle = 'Login';
    const expectedWelcomeTitle = 'Welcome';

    //Act
    const loginPage = await registerPage.registerUser(registerUserData);

    //Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertText);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.getTitle();
    expect.soft(titleLogin).toContain(expectedLoginTitle);

    //Assert test login
    const welcomePage = await loginPage.loginUser({
      userEmail: registerUserData.userEmail,
      userPassword: registerUserData.userPassword,
    });
    const titleWelcome = await welcomePage.getTitle();
    expect.soft(titleWelcome).toContain(expectedWelcomeTitle);
  });

  test('User can not register with incorrect data @GAD-R03-04', async ({
    registerPage,
  }) => {
    //Arrange
    registerUserData.userEmail = '@$#';
    const expectedErrorText = 'Please provide a valid email address';

    //Act
    await registerPage.registerUser(registerUserData);

    //Assert
    await expect(registerPage.emailErrorText).toHaveText(expectedErrorText);
  });
});
