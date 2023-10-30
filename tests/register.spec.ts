import { LoginPage } from '../src/pages/login.page';
import { RegisterPage } from '../src/pages/register.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Verify register page', () => {
  test('User can register with mandatory fields and login @GAD-R03-01 @GAD-R03-02 @GAD-R03-03', async ({
    page,
  }) => {
    //Arrange
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const userFirstName = faker.person.firstName();
    const userSecondName = faker.person.lastName();
    const userEmail = faker.internet.email({
      firstName: userFirstName,
      lastName: userSecondName,
    });
    const userPassword = faker.internet.password();
    await registerPage.goto();

    //Act
    await registerPage.registerUser(
      userFirstName,
      userSecondName,
      userEmail,
      userPassword,
    );
    const expectedAlertText = 'User created';

    //Assert
    await expect(registerPage.alertPopUp).toHaveText(expectedAlertText);
    await loginPage.waitForPageToLoadUrl();
    const titleLogin = await loginPage.title();
    expect.soft(titleLogin).toContain('Login');

    //Assert
    await loginPage.loginUser(userEmail, userPassword);

    const welcomePage = new WelcomePage(page);
    const titleWelcome = await welcomePage.title();
    expect.soft(titleWelcome).toContain('Welcome');
  });
});
